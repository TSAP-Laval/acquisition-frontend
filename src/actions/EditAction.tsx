import dispatcher from "../dispatcher/dispatcher";
import {serverURL} from "config";
import * as axios from "axios";
export function getJoueur() {
    axios.default.get(serverURL + "/joueur")
    .then(function(response: any) {
        dispatcher.dispatch({ type: "MATCH_EDIT.GETJOUEURS", text: response.data });
    });
}
export function getActionsEdit() {
     axios.default.get(serverURL + "/actions")
    .then(function(response: any){
        dispatcher.dispatch({ type: "GetActionsEdit", text: response.data });
    });
}
export function postAction(stringContenu: string) {
    axios.default.post(serverURL + "/actions", stringContenu)
    .then(function(r: any) {
        dispatcher.dispatch({ type: "postActionEdit", text: stringContenu });
    }).catch(function(error: string) {
        dispatcher.dispatch({ type: "postActionEdit", text: "error" });
    });
}

export function requestActionForm(e: React.MouseEvent<HTMLInputElement>,
                                  button: HTMLButtonElement, form: HTMLDivElement) {
    // Récupérer le joueur?
    dispatcher.dispatch({
        type: "MATCH_EDIT.REQUEST_ACTION_FORM",
        e,
        // tslint:disable-next-line:object-literal-sort-keys
        joueur: button,
        form,
    });
}

export function closeActionForm(form: HTMLDivElement) {
    dispatcher.dispatch({
        type: "MATCH_EDIT.CLOSE_ACTION_FORM",
        // tslint:disable-next-line:object-literal-sort-keys
        form,
    });
}
