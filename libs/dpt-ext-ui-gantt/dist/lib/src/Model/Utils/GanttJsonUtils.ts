import { JsonUtils } from "@dpt-ext-ui/utils/lib/utils/json";

export class GanttJsonUtils {
    static parseJson(json: string): any {
        return JsonUtils.isValid(json) ? JSON.parse(json) : null;
    }
}
