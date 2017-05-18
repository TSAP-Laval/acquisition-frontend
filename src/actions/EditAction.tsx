import dispatcher from "../dispatcher/dispatcher";
import {serverURL} from "config";
import AuthStore            from "../stores/AuthStore";
import * as axios from "axios";
export function getJoueur() {
    axios.default.get(serverURL + "/joueurs")
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
export function getReception() {
     axios.default.get(serverURL + "/reception")
    .then(function(response: any){
        dispatcher.dispatch({ type: "getReception", text: response.data });
    });
}
export function getActionId(id: any) {
      let source: axios.CancelTokenSource;
         source = axios.default.CancelToken.source();
         
        const config = {
            cancelToken: source.token,
            headers: {
                "Authorization": "Bearer " + AuthStore.getToken(),
            },
           
        };
     axios.default.get(serverURL + "/actions/types/" + id,config)
    .then(function(response: any){
        console.log(response.data)
        dispatcher.dispatch({ type: "GetUneAction", text: response.data });
    });
}

export function postAction(stringContenu: any) {
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
