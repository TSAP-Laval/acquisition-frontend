import dispatcher from "../dispatcher"
import * as Actions from "./actions/dragOver"

export function DragOver() {
    const action = new Actions.DragOver()
    dispatcher.dispatch(action);
}