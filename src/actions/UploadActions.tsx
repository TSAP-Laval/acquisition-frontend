import dispatcher from "../dispatcher/dispatcher";

// Affichage d'un message de succès ou d'erreur
export function showMessage(txt: string, isErr: boolean) {
    dispatcher.dispatch({
        isError: isErr,
        text: txt,
        type: "UPLOAD.SHOW_MESSAGE",
    });
}

// Upload d'un ou de plusieurs fichiers
export function upload(f: File[]) {
    dispatcher.dispatch({
        files: f,
        type: "UPLOAD.UPLOAD",
    });
}

// Fermeture du formulaire et ouverture du formulaire de confirmations d'annulation
export function closeForm() {
    dispatcher.dispatch({
        type: "UPLOAD.OPEN_CONFIRM_FORM",
    });
}

// Fermeture du formulaire de confimation d'annulation de l'upload
export function closeConfirmForm() {
    dispatcher.dispatch({
        type: "UPLOAD.CLOSE_CONFIRM_FORM",
    });
}

// Annulation de l'upload du ou des fichiers
export function cancelUpload() {
    dispatcher.dispatch({
        type: "UPLOAD.CANCEL_UPLOAD",
    });
}

// Sauvegarde des informations sur la partie
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

// Recherche sur les équipes
export function searchTeam(team: string) {
    dispatcher.dispatch({
        text: team,
        type: "UPLOAD.SEARCH_TEAM",
    });
}

// Recherche sur les terrains
export function searchField(field: string) {
    dispatcher.dispatch({
        text: field,
        type: "UPLOAD.SEARCH_FIELD",
    });
}
