import { ChangeStylePropertyCommand } from "./ChangeStylePropertyCommand";
import { ColorUtils } from "@dpt-ext-ui/utils/lib/utils/color";

export class ChangeStrokeColorCommand extends ChangeStylePropertyCommand {
    processParameter(parameter: string): string {
        return ColorUtils.stringToHash(parameter);
    }
    getStyleProperty(): string {
        return "stroke";
    }
}
