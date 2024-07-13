import { Point } from "@dptuiext/utils/lib/geometry/point";
import { PasteSelectionCommandBase } from "./PasteSelectionCommandBase";
import { DiagramItem } from "../../Model/DiagramItem";

export class PasteSelectionCommand extends PasteSelectionCommandBase {
    protected getEventPositionOffset(_items: DiagramItem[], _evtPosition?: Point): Point {
        return new Point(0, 0);
    }
}
