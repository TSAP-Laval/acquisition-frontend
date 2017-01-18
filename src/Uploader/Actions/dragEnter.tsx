import {IAction} from "../../interface"

export class DragEnter implements IAction {
    type: string;

    constructor() {
        this.type = "DRAG_ENTER"
    }
}