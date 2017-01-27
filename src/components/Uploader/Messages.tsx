import * as React from "react";

import * as Actions from "./Actions"
import Store from "./UploaderStore"

export interface ILayoutProps {}
export interface ILayoutState {
    actions: string[]
}

export default class Footer extends React.Component<ILayoutProps, ILayoutState> {
    constructor() {
        super();
        // Bind listener
        this._onMessage = this._onMessage.bind(this);
        this.state = {actions: Store.getActions()};
    }

    componentWillMount(){
        Store.on("MESSAGE", this._onMessage);
    }

    componentWillUnmount() {
        Store.removeListener("MESSAGE", this._onMessage);
    }

    _onMessage() {
        this.setState({actions: Store.getActions()});
        console.log('Action : ' + this.state.actions);
    }

    render() {
        var msg = null;
        var style = "error"
        
        this.state.actions.forEach(function(element: any) {
            console.log('MESSAGE : ' + element);
            switch (element) {
                case "FORMAT":
                    msg = "Le fichier choisi n'est pas dans un format vidéo reconnu"
                    break;
                case "TOO_MANY":
                    msg = "Veuillez ne sélectionner qu'un seul fichier"
                    break;
                case "NO_FILE":
                    msg = "Veuillez sélectionner un fichier à ajouter"
                case "EXIST":
                    msg = "Un fichier de même nom existe déjà dans notre base de donnée.\n Veuillez choisir un fichier de nom différent"
                    break;
                case "UPLOAD_SUCCESS":
                    msg = "Le fichier a bel et bien été envoyé sur le serveur"
                    style = "success"
                    break;
            }
        });

        return (
            <div className={style}>
                    {msg}
            </div>
        );
    }
}