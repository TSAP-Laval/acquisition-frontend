import dispatcher from "../dispatcher/dispatcher"

export function showMessage(text: string, isError: boolean) {
    dispatcher.dispatch({
        type: "UPLOAD.SHOW_MESSAGE",
        text: text,
        isError: isError,
    });
}

export function upload(files: File[]) {
    dispatcher.dispatch({
        type: "UPLOAD.UPLOAD",
        files: files,
    });
}

export function closeForm() {
    dispatcher.dispatch({
        type: "UPLOAD.OPEN_CONFIRM_FORM",
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

export function save(teamID: number, opposingTeam: string, status: string, 
                     locationID: number, fieldCondition: string, date: string) {
    dispatcher.dispatch({
        type: "UPLOAD.SAVE",
        teamID: teamID,
        opposingTeam: opposingTeam,
        status: status,
        locationID: locationID,
        fieldCondition: fieldCondition,
        date: date,
    });
}

export function searchTeam(team: string) {
    dispatcher.dispatch({
        type: "UPLOAD.SEARCH_TEAM",
        text: team,
    });
}

export function searchField(field: string) {
    dispatcher.dispatch({
        type: "UPLOAD.SEARCH_FIELD",
        text: field,
    });
}