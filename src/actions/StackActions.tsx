import dispatcher from "../dispatcher/dispatcher";

// Affichage d'un message de succès ou d'erreur
export function deleteAction(index: number) {
    dispatcher.dispatch({
        index,
        type: "STACK.DELETE_ACTION",
    });
}
