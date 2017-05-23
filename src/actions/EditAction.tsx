// tslint:disable:import-spacing
import dispatcher    from "../dispatcher/dispatcher";
import AuthStore     from "../stores/AuthStore";
import * as axios    from "axios";
import { serverURL } from "config";
// tslint:enable:import-spacing

const config = {
    headers: {
        Authorization: "Bearer " + AuthStore.getToken(),
    },
};

// Récupération de tous les joueurs
export function getJoueur() {
    axios.default.get(serverURL + "/joueurs", config)
    .then(function(response: any) {
        dispatcher.dispatch({ type: "MATCH_EDIT.GETJOUEURS", text: response.data });
    });
}

// Récupération de toutes les types d'actions
export function getActionsEdit() {
     axios.default.get(serverURL + "/actions/types", config)
    .then(function(response: any){
        dispatcher.dispatch({ type: "GetActionsEdit", text: response.data });
    });
}

// Récupération de tous les types de réception
export function getReception() {
    axios.default.get(serverURL + "/receptions", config)
    .then(function(response: any){
        dispatcher.dispatch({ type: "getReception", text: response.data });
    });
}

// Récupération d'une action en particulier
export function getActionId(id: any) {
     axios.default.get(serverURL + "/actions/types/" + id, config)
    .then(function(response: any){
        dispatcher.dispatch({ type: "GetUneAction", text: response.data });
    });
}

// Création d'une action
export function postAction(stringContenu: any) {
    axios.default.post(serverURL + "/actions", stringContenu, config)
    .then(function(r: any) {
        dispatcher.dispatch({ type: "postActionEdit", text: stringContenu });
    }).catch(function(error: axios.AxiosError) {
        // console.log("ERROR (XHR): \n" + error);
        dispatcher.dispatch({ type: "postActionEdit", text: "error" });
    });
}

export function requestActionForm(e: React.MouseEvent<HTMLInputElement>,
                                  button: HTMLButtonElement, form: HTMLDivElement) {
    // Récupérer le joueur?
    dispatcher.dispatch({
        e,
        form,
        joueur: button,
        type: "MATCH_EDIT.REQUEST_ACTION_FORM",
    });
}

export function closeActionForm(form: HTMLDivElement) {
    dispatcher.dispatch({
        form,
        type: "MATCH_EDIT.CLOSE_ACTION_FORM",
    });
}
