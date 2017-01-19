import dispatcher from "../dispatcher"

export function Add(type: string, video: File = null, text: string = null) {
    dispatcher.dispatch({
        type: type,
        video,
        text
    });
}