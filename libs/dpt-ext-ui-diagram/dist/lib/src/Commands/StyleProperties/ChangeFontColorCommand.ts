import { ChangeStyleTextPropertyCommand } from "./ChangeStyleTextPropertyCommand";
import { ColorUtils } from "@dpt-ext-ui/utils/lib/utils/color";

export class ChangeFontColorCommand extends ChangeStyleTextPropertyCommand {
    processParameter(parameter: string): string {
        return ColorUtils.stringToHash(parameter);
    }
    getStyleProperty(): string {
        return "fill";
    }
}
