import {IAction} from "../../interface"

export class DragOver implements IAction {
    type: String;

    constructor() {
        this.type = "DRAG_OVER"
    }
}