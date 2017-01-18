import dispatcher from "../dispatcher"

export function Add(type: string, file: File = null) {
    dispatcher.dispatch({
        type : type,
        file : file
    });
}