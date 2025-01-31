import { Task } from "../Entities/Task";
import { ResourceCollection } from "../Collections/ResourceCollection";
import { TaskCollection } from "../Collections/TaskCollection";
import { DependencyCollection } from "../Collections/DependencyCollection";
import { ResourceAssignmentCollection } from "../Collections/ResourceAssignmentCollection";
import { ViewVisualModelItem } from "./ViewVisualModelItem";
import { ViewVisualModelDependencyInfo } from "./ViewVisualModelDependencyInfo";
import { WorkingTimeCalculator } from "../WorkingTime/WorkingTimeCalculator";
import { DateRange } from "../WorkingTime/DateRange";
import { isDefined } from "@dpt-ext-ui/utils/lib/utils/common";
import { DataObject, GanttDataObjectNames } from "../Entities/DataObject";
import { Dependency } from "../Entities/Dependency";
import { Resource } from "../Entities/Resource";
import { ResourceAssignment } from "../Entities/ResourceAssignment";
import { GanttView } from "../../View/GanttView";
import { RenderHelper } from "../../View/Render/RenderHelper";

export class ViewVisualModel {
    owner: GanttView;
    tasks: TaskCollection;
    dependencies: DependencyCollection
    resources: ResourceCollection;
    assignments: ResourceAssignmentCollection;

    root: ViewVisualModelItem;
    rootTaskId: string;

    private _itemList: Array<ViewVisualModelItem>;
    private _viewItemList: Array<ViewVisualModelItem>;
    private _workTimeCalculator: WorkingTimeCalculator;
    private _fLockCount: number = 0;

    lockChangesProcessing: boolean = false;

    constructor(owner: any, tasks: any, dependencies: any, resources: any, assignments: any, dateRange: DateRange, workTimeRules: any) {
        this.owner = owner;
        this.tasks = new TaskCollection();
        this.tasks.importFromObject(tasks);
        this.dependencies = new DependencyCollection();
        this.dependencies.importFromObject(dependencies);
        this.resources = new ResourceCollection();
        this.resources.importFromObject(resources);
        this.assignments = new ResourceAssignmentCollection();
        this.assignments.importFromObject(assignments);
        this._itemList = new Array<ViewVisualModelItem>();
        this._viewItemList = new Array<ViewVisualModelItem>();

        this._workTimeCalculator = new WorkingTimeCalculator(dateRange, workTimeRules);
        this.updateModel(true);
    }

    private get renderHelper(): RenderHelper {
        return this.owner.renderHelper;
    }
    updateModel(isFirstLoad? : boolean): void {
        this._itemList.splice(0, this._itemList.length);
        const tasks = this.tasks.items;
        for(let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            if(task)
                this._itemList.push(new ViewVisualModelItem(task, this.getAssignedResources(task)));
        }
        this.createHierarchy(isFirstLoad);
        this.populateItemsForView();
        if(this.owner && this.owner.currentSelectedTaskID)
            this.changeTaskSelected(this.owner.currentSelectedTaskID, true);
    }
    createHierarchy(isFirstLoad? : boolean): void {
        this.root = new ViewVisualModelItem(null, null);
        const list = this._itemList;
        const inverted = list.reduce((previous, item) => {
            const key = item.task?.internalId;
            if(isDefined(key))
                previous[key] = item;
            return previous;
        }, { });
        const recalculateParentRequired = this.requireFirstLoadParentAutoCalc && isFirstLoad;
        for(let i = 0; i < list.length; i++) {
            const item = list[i];
            const parentId = item.task.parentId;
            const parentItem = inverted[parentId] || this.root;
            item.parent = parentItem;
            parentItem.addChild(item);

            if(recalculateParentRequired)
                this.owner.validationController.recalculateParents(item, (data: any) => {
                    if(!isDefined(data.id)) return;

                    const task = this.tasks.getItemById(data.id);
                    if(isDefined(data.start)) task.start = data.start;
                    if(isDefined(data.end)) task.end = data.end;
                    if(isDefined(data.progress)) task.progress = data.progress;
                });
        }

        if(recalculateParentRequired)
            this.owner.dispatcher.notifyParentDataRecalculated(this.getCurrentTaskData());
    }
    getCurrentTaskData(): any[] { return this.tasks.items.map(t => this.getTaskObjectForDataSource(t)); }

    getTaskObjectForDataSource(task: Task): any {
        const parentTask = task.parentId && this.tasks.getItemById(task.parentId);
        const rootId = this.getRootTaskId();
        const isRootLevelTask = rootId && task.parentId === rootId;
        const parentId = isRootLevelTask ? this.getRootRawValue() : parentTask?.id;
        const taskObject = {
            id: task.id,
            start: task.isValidStart() ? task.start : null,
            end: task.isValidEnd() ? task.end : null,
            duration: task.duration,
            description: task.description,
            parentId: parentId,
            progress: task.progress,
            color: task.color,
            taskType: task.taskType,
            title: task.title,
            customFields: task.customFields,
            expanded: task.expanded
        };
        return taskObject;
    }
    getDependencyObjectForDataSource(key: any): any {
        const dependency = key instanceof Dependency ? key as Dependency : this.getItemByPublicId("dependency", key) as Dependency;
        if(dependency) {
            const predecessorId = this.convertInternalToPublicKey("task", dependency.predecessorId);
            const successorId = this.convertInternalToPublicKey("task", dependency.successorId);
            return {
                id: dependency.id,
                predecessorId: isDefined(predecessorId) ? predecessorId : dependency.predecessorId,
                successorId: isDefined(successorId) ? successorId : dependency.successorId,
                type: dependency.type
            };
        }
        return null;
    }
    getResourceObjectForDataSource(key: any): any {
        const resource = key instanceof Resource ? key as Resource : this.getItemByPublicId("resource", key) as Resource;
        if(resource)
            return {
                id: resource.id,
                text: resource.text,
                color: resource.color
            };

        return null;
    }
    getResourceAssignmentObjectForDataSource(key: any): any {
        const assignment = key instanceof ResourceAssignment ? key as ResourceAssignment : this.getItemByPublicId("assignment", key) as ResourceAssignment;
        if(assignment) {
            const taskId = this.convertInternalToPublicKey("task", assignment.taskId);
            const resourceId = this.convertInternalToPublicKey("resource", assignment.resourceId);
            return {
                id: assignment.id,
                taskId: isDefined(taskId) ? taskId : assignment.taskId,
                resourceId: isDefined(resourceId) ? resourceId : assignment.resourceId
            };
        }
        return null;
    }

    getRootRawValue(): any {
        return this.root.children[0]?.task?.rawParentId ?? null;
    }

    populateItemsForView(): void {
        this._viewItemList.splice(0, this._viewItemList.length);
        this.populateVisibleItems(this.root);
        this.updateVisibleItemDependencies();
    }
    populateVisibleItems(item: ViewVisualModelItem): void {
        const isRoot = item === this.root;
        if(!item || (!item.task && !isRoot)) return;
        if(!isRoot) {
            this._viewItemList.push(item);
            item.visibleIndex = this._viewItemList.length - 1;
        }

        if(item.getExpanded() || item === this.root)
            item.children.forEach(n => this.populateVisibleItems(n));
    }
    updateVisibleItemDependencies(): void {
        const list = this._viewItemList;
        for(let i = 0; i < list.length; i++) {
            const item = list[i];
            const visibleDependencies = this.getTasVisibleDependencies(item.task);
            item.setDependencies(visibleDependencies);
        }
    }
    getAssignedResources(task: Task): ResourceCollection {
        const res = new ResourceCollection();
        const assignments = this.assignments.items.filter(value => value.taskId == task.internalId);
        assignments.forEach(assignment => { res.add(this.resources.getItemById(assignment.resourceId)); });
        return res;
    }
    getTasVisibleDependencies(task: Task): Array<ViewVisualModelDependencyInfo> {
        const res = new Array<ViewVisualModelDependencyInfo>();
        const id = task.internalId;
        const dependencies = this.dependencies.items.filter(value => value.successorId == id);

        for(let i = 0; i < dependencies.length; i++) {
            const dependency = dependencies[i];
            const item = this.findItem(dependency.predecessorId);
            if(item && item.getVisible())
                res.push(new ViewVisualModelDependencyInfo(dependency.internalId, item, dependency.type));
        }
        return res;
    }
    changeTaskExpanded(id: string, expanded: boolean): void {
        const task = this.tasks.getItemById(String(id));
        if(task) {
            task.expanded = expanded;
            this.changed();
        }
    }
    changeTaskVisibility(id: string, visible: boolean): void {
        const item = this.findItem(id);
        if(item) {
            item.visible = visible;
            this.changed();
        }
    }
    changeTaskSelected(id: string, selected: boolean): void {
        const item = this._itemList.filter(value => value.task && value.task.internalId === id)[0];
        if(item) {
            item.selected = selected;
            const viewItem = this.findItem(id);
            const taskIndex = viewItem && viewItem.visibleIndex;
            if(taskIndex > -1)
                this.renderHelper.recreateTaskElement(taskIndex);
        }
    }
    beginUpdate(): void {
        this._fLockCount++;
    }
    endUpdate(): void {
        this._fLockCount--;
        if(this._fLockCount == 0)
            this.changed();
    }
    public compareTaskOrder(taskModel: any): boolean {
        const newTasks = new TaskCollection();
        newTasks.importFromObject(taskModel);
        const newItems = newTasks.items;
        const oldItems = this.tasks.items;
        if(newItems.length !== oldItems.length)
            return false;

        for(let i = 0; i < newItems.length; i++) {
            const newTask = newItems[i];
            const oldTask = oldItems[i];
            if(newTask.id !== oldTask.id)
                return false;
        }
        return true;
    }
    refreshTaskDataIfRequires(tasks: any): boolean {
        const changed = !this.lockChangesProcessing && !this.compareTaskOrder(tasks);
        if(changed) {
            const hash = this.saveTaskInternalIds();
            this.tasks.importFromObject(tasks);
            this.restoreTaskInternalIds(hash);
            this.updateModel();
        }
        return changed;
    }
    public saveTaskInternalIds(): Record<any, string> {
        const hash = { };
        this.tasks.items.map(t => hash[t.id] = t.internalId);
        return hash;
    }
    public restoreTaskInternalIds(hash : Record<any, string>): void {
        for(const id in hash) {
            if(!Object.prototype.hasOwnProperty.call(hash, id))
                continue;
            const task = this.tasks.getItemByPublicId(id);
            if(task)
                task.internalId = hash[id];
        }
    }
    public canCreateDependency(predecessorId: string, successorId: string): boolean {
        if(!predecessorId || !successorId || predecessorId === successorId)
            return false;
        let hasLink = false;
        if(this.enableDependencyValidation) {
            const hash = this.getDependentTasksHash();
            if(this.parentAutoCalc)
                hasLink = this.checkTasksInterdependence(predecessorId, successorId, hash) || this.checkParent(predecessorId, successorId) || this.checkParent(successorId, predecessorId);
            else
                hasLink = this.checkDependencyChain([predecessorId], [successorId], hash, []);
        }
        return !hasLink;
    }

    public checkParent(childId: string, parentId: string): boolean {
        return this.getTaskTreeLine(childId).indexOf(parentId) > -1;
    }
    public getTaskTreeLine(taskId: string): Array<string> {
        const result = [taskId];
        let item = this.findItem(taskId);
        if(item) {
            item = item.parent;
            while(item?.task) {
                result.push(item?.task.internalId);
                item = item.parent;
            }
        }
        else {
            const task = this.tasks.getItemById(taskId);
            let parent = this.tasks.getItemById(task?.parentId);
            while(parent) {
                result.push(parent.id);
                parent = this.tasks.getItemById(parent.parentId);
            }
        }
        return result;
    }

    getDependentTasksHash(): Record<string, Array<string>> {
        const result = { };
        this.dependencies.items.forEach(d => {
            const id1 = d.predecessorId;
            const id2 = d.successorId;
            result[id1] ??= [ ];
            if(result[id1].indexOf(id2) < 0)
                result[id1].push(id2);
            result[id2] ??= [ ];
            if(result[id2].indexOf(id1) < 0)
                result[id2].push(id1);
        });
        return result;
    }
    checkTasksInterdependence(id1: string, id2: string, depHash: Record<string, Array<string>>): boolean {
        const treeLine1 = this.getTaskTreeLine(id1).reverse();
        const treeLine2 = this.getTaskTreeLine(id2).reverse();
        let group1Root;
        let group2Root;
        for(let i = 0; i < treeLine1.length - 1; i++) {
            const id = treeLine1[i];
            const index = treeLine2.indexOf(id);
            if(index > -1) {
                group1Root = treeLine1[i + 1];
                group2Root = treeLine2[index + 1];
            }
        }
        if(!group1Root && !group2Root) {
            group1Root = treeLine1[0];
            group2Root = treeLine2[0];
        }
        return this.checkDependencyChain(this.getBranchIds(group1Root), this.getBranchIds(group2Root), depHash, []);
    }
    checkDependencyChain(group1: Array<string>, group2: Array<string>, depHash: Record<string, Array<string>>, checked: Array<string>): boolean {
        if(group1.some(id => group2.indexOf(id) > -1))
            return true;
        checked.push(...group1);
        for(let i = 0; i < group1.length; i++) {
            const id1 = group1[i];
            const dependent = depHash[id1];
            if(dependent && this.checkDependencyChain(dependent.filter(id => checked.indexOf(id) === -1), group2, depHash, checked))
                return true;
        }
        return false;
    }
    getBranchIds(id: string): Array<string> {
        let result = [id];
        const item = this.findItem(id);
        const children = item?.children;
        if(children)
            children.forEach(vi => {
                const key = vi.task?.internalId;
                if(key)
                    result = result.concat(this.getBranchIds(key));
            });
        return result;
    }

    getTasksExpandedState(): Record<any, boolean> {
        const items = this.tasks.items;
        const state = { };
        items.forEach(t => state[t.id] = t.expanded);
        return state;
    }
    applyTasksExpandedState(state: Record<any, boolean>): void {
        if(!state) return;

        this.beginUpdate();
        for(const key in state)
            if(Object.prototype.hasOwnProperty.call(state, key))
                this.changeTaskExpanded(key, state[key]);
        this.endUpdate();
    }
    changed(): void {
        if(this._fLockCount !== 0)
            return;
        this.populateItemsForView();
        if(this.owner && this.owner.onVisualModelChanged)
            this.owner.onVisualModelChanged();
    }
    findItem(taskId: string): ViewVisualModelItem {
        return this._viewItemList.filter(value => value.task && value.task.internalId === taskId)[0];
    }
    get items(): Array<ViewVisualModelItem> { return this._viewItemList; }
    get itemCount(): number { return this.items.length; }
    getTaskVisibility(id: string):boolean {
        const item = this.findItem(id);
        return !!item && item.getVisible();
    }
    getTaskSelected(id: string):boolean {
        const item = this.findItem(id);
        return !!item && item.selected;
    }
    get noWorkingIntervals(): Array<DateRange> { return this._workTimeCalculator.noWorkingIntervals; }
    updateRange(range: DateRange): void { this._workTimeCalculator.updateRange(range); }

    taskHasChildrenByIndex(index: number): boolean { return this._viewItemList[index].children.length > 0; }
    taskHasChildren(id: string) : boolean {
        const item = this.findItem(id);
        return item && item.children.length > 0;
    }
    get enableDependencyValidation(): boolean {
        const settings = this.owner && this.owner.settings;
        return settings?.validation?.validateDependencies;
    }

    get parentAutoCalc(): boolean {
        const settings = this.owner && this.owner.settings;
        return settings && settings.validation && settings.validation.autoUpdateParentTasks;
    }

    get enablePredecessorGap(): boolean {
        const settings = this.owner && this.owner.settings;
        return settings && settings.validation && settings.validation.enablePredecessorGap;
    }

    get requireFirstLoadParentAutoCalc(): boolean { return this.parentAutoCalc && this.owner.requireFirstLoadParentAutoCalc(); }
    isTaskToCalculateByChildren(id: string): boolean { return this.parentAutoCalc && this.taskHasChildren(id); }

    hasTasks(): boolean { return this.tasks.length > 0; }
    getDataUpdateErrorCallback(): () => void {
        return this.owner.getDataUpdateErrorCallback && this.owner.getDataUpdateErrorCallback();
    }

    convertPublicToInternalKey(dataType: string, publicKey: any): string {
        const item = this.getItemByPublicId(dataType, publicKey);
        return item && item.internalId;
    }
    convertInternalToPublicKey(dataType: string, internalId: string): any {
        const item = this.getItemByInternalId(dataType, internalId);
        return item && item.id;
    }
    getItemByPublicId(dataType: string, publicKey: any): DataObject {
        const strKey = publicKey.toString();
        switch(dataType) {
            case "task":
                return this.tasks.getItemByPublicId(strKey);
            case "dependency":
                return this.dependencies.getItemByPublicId(strKey);
            case "resource":
                return this.resources.getItemByPublicId(strKey);
            case "assignment":
                return this.assignments.getItemByPublicId(strKey);
        }
        return null;
    }
    getItemByInternalId(dataType: string, internalId: string): DataObject {
        switch(dataType) {
            case "task":
                return this.tasks.getItemById(internalId);
            case "dependency":
                return this.dependencies.getItemById(internalId);
            case "resource":
                return this.resources.getItemById(internalId);
            case "assignment":
                return this.assignments.getItemById(internalId);
        }
        return null;
    }
    findAssignment(resourceKey: any, taskKey: any): ResourceAssignment {
        const resourceInternalKey = this.convertPublicToInternalKey("resource", resourceKey);
        const taskInternalKey = this.convertPublicToInternalKey("task", taskKey);
        return this.assignments.items.filter(val => val.resourceId === resourceInternalKey && val.taskId === taskInternalKey)[0];
    }
    findAllTaskAssignments(taskInternalKey: any): ResourceAssignment[] {
        return this.assignments.items.filter(val => val.taskId === taskInternalKey);
    }
    getAllVisibleTaskIndices(start?: number, end?: number): Array<number> {
        const result = [];
        start ??= 0;
        end ??= this._viewItemList.length - 1;
        for(let i = start; i <= end; i++) {
            const item = this._viewItemList[i];
            if(item?.getVisible() && item?.task?.isValid())
                result.push(i);
        }
        return result;
    }
    getVisibleTasks(): Array<Task> { return this.tasks.items.filter(t => t && this.getTaskVisibility(t.internalId) && t.isValid()); }
    getVisibleDependencies(): Array<Dependency> {
        const visibleTasksKeys = this.getVisibleTasks().map(t => t.internalId);
        return this.dependencies.items.filter(d => d && visibleTasksKeys.indexOf(d.successorId) > -1 && visibleTasksKeys.indexOf(d.predecessorId) > -1);
    }
    getVisibleResourceAssignments(): Array<ResourceAssignment> {
        const visibleTasksKeys = this.getVisibleTasks().map(t => t.internalId);
        return this.assignments.items.filter(a => a && visibleTasksKeys.indexOf(a.taskId) > -1);
    }
    getVisibleResources(): Array<Resource> {
        const visibleResources = [];
        const visibleAssignments = this.getVisibleResourceAssignments();
        for(let i = 0; i < visibleAssignments.length; i++) {
            const resource = this.getItemByInternalId("resource", visibleAssignments[i].resourceId);
            if(resource && visibleResources.indexOf(resource) === -1)
                visibleResources.push(resource);
        }
        return visibleResources;
    }
    getRootTaskId(): string {
        this.rootTaskId ??= this.calculateRootTaskId();
        return this.rootTaskId;
    }
    calculateRootTaskId(): string {
        let item = this.items[0];
        if(!item)
            return null;
        while(item.parent && item.task)
            item = item.parent;

        return item.children[0].task.parentId;
    }
    public getTaskMinStart(): Date {
        let min = this.owner.dataRange.start;
        this.tasks.items.forEach(t => {
            if(t.isValid() && t.start.getTime() < min.getTime())
                min = t.start;
        });
        return min;
    }
    public getTaskMaxEnd(): Date {
        let max = this.owner.dataRange.end;
        this.tasks.items.forEach(t => {
            if(t.isValid() && t.end.getTime() > max.getTime())
                max = t.end;
        });
        return max;
    }

    public processServerInsertedKey(oldKey: string, newKey: string, type: string): void {
        if(type === GanttDataObjectNames.task)
            this.tasks.invalidate();
        if(type === GanttDataObjectNames.dependency) {
            this.dependencies.invalidate();
            this.updateVisibleItemDependencies();
        }
        if(type === GanttDataObjectNames.resource)
            this.resources.invalidate();
        if(type === GanttDataObjectNames.resourceAssignment)
            this.assignments.invalidate();
        this.owner?.updateHistoryObsoleteInsertedKey(oldKey, newKey, type);
    }

    public onBeginDataObjectCreate(): void { this.owner.lockUpdateWithReload?.(); }
    public onEndDataObjectCreate(): void { this.owner.unlockUpdateWithReload?.(); }
}
