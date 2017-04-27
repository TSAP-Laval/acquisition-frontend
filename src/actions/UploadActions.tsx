import dispatcher from "../dispatcher/dispatcher"

export function showMessage(txt: string, isErr: boolean) {
    dispatcher.dispatch({
        isError: isErr,
        text: txt,
        type: "UPLOAD.SHOW_MESSAGE",
    });
}

export function upload(f: File[]) {
    dispatcher.dispatch({
        files: f,
        type: "UPLOAD.UPLOAD",
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

export function save(tID: number, oTeam: string, st: string,
                     lID: number, fieldCond: string, dt: string) {
    dispatcher.dispatch({
        date: dt,
        fieldCondition: fieldCond,
        locationID: lID,
        opposingTeam: oTeam,
        status: st,
        teamID: tID,
        type: "UPLOAD.SAVE",
    });
}

export function searchTeam(team: string) {
    dispatcher.dispatch({
        text: team,
        type: "UPLOAD.SEARCH_TEAM",
    });
}

export function searchField(field: string) {
    dispatcher.dispatch({
        text: field,
        type: "UPLOAD.SEARCH_FIELD",
    });
}
