import dispatcher from "../dispatcher"
//import * as Actions from "./actions/dragEnter"

export function Add(type: string, file: File = null) {
    dispatcher.dispatch({
        type : type,
        file : file
    });
}

export function Remove(type: string) {
    dispatcher.dispatch({
        type : type
    });
}