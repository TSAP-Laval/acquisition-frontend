import dispatcher from "../dispatcher/dispatcher"

export function showMessage(text: string, isError: boolean) {
    dispatcher.dispatch({
        type: "UPLOAD.SHOW_MESSAGE",
        text: text,
        isError: isError,
    });
}

export function upload(file: File) {
    dispatcher.dispatch({
        type: "UPLOAD.UPLOAD",
        file: file,
    });
}

export function closeForm() {
    dispatcher.dispatch({
        type: "UPLOAD.CLOSE_FORM",
    });
}

export function closeConfirmForm() {
    dispatcher.dispatch({
        type: "UPLOAD.CLOSE_CONFIRM_FORM",
    });
}

export function cancelUpload() {
    dispatcher.dispatch({
        type: "UPLOAD.CANCEL_UPLOAD",
    });
}

export function save() {
    dispatcher.dispatch({
        type: "UPLOAD.SAVE",
    });
}

export function searchTeam(team: string) {
    dispatcher.dispatch({
        type: "UPLOAD.SEARCH_TEAM",
        text: team,
    });
}