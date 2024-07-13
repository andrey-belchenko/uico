import { ShapeTypes } from "../../ShapeTypes";
import { Size } from "@dpt-ext-ui/utils/lib/geometry/size";
import { ShapeDefaultDimension } from "../ShapeDescription";
import { HexagonShapeDescription } from "../General/HexagonShapeDescription";

export class PreparationShapeDescription extends HexagonShapeDescription {
    constructor() {
        super(true);

        this.defaultSize = new Size(ShapeDefaultDimension, ShapeDefaultDimension * 0.75);
    }
    get key() { return ShapeTypes.Preparation; }
}
