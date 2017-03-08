import dispatcher from "../dispatcher/dispatcher"

export function Add(type: string, video: File = null, text: string = null) {
    dispatcher.dispatch({
        type,
        video,
        text
    });
}