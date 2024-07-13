import { ICloneable } from "@dpt-ext-ui/utils/lib/types";

export abstract class DialogParametersBase implements ICloneable<DialogParametersBase> {
    abstract clone(): DialogParametersBase;
}
