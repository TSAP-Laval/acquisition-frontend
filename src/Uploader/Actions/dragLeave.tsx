import {IAction} from "../../interface"

export class DragLeave implements IAction {
    type: string;

    constructor() {
        this.type = "DRAG_LEAVE"
    }
}