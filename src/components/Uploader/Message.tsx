import * as React   from "react";

import * as Actions from "./Actions"
import Store        from "./UploaderStore"

export interface ILayoutProps {}
export interface ILayoutState {
    actions: string[]
}

export default class Message extends React.Component<ILayoutProps, ILayoutState> {
    
    constructor() {
        super();
        // Bind listener
        this._onChange = this._onChange.bind(this);
        this.state = {actions: Store.getActions()};
    }

    componentWillMount(){
        Store.on("CHANGE", this._onChange);
    }

    componentWillUnmount() {
        Store.removeListener("CHANGE", this._onChange);
    }

    _onChange() {
        this.setState({actions: Store.getActions()});
    }

    render() {
        var msg = null;
        var style = "error"
        
        this.state.actions.forEach(function(element: any) {
            switch (element) {
                case "FORMAT":
                    style = "error"
                    msg = "Le fichier choisi n'est pas dans un format vidéo reconnu"
                    break;
                case "TOO_MANY":
                    style = "error"
                    msg = "Veuillez ne sélectionner qu'un seul fichier"
                    break;
                case "NO_FILE":
                    style = "error"
                    msg = "Veuillez sélectionner un fichier à ajouter"
                case "EXIST":
                    style = "error"
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