import * as React from "react";

import * as Actions from "../../Uploader/Actions"
import Store from "../../Uploader/uploaderStore"

export interface ILayoutProps {}
export interface ILayoutState {
    actions: {[string:string] : string}
}

export default class Footer extends React.Component<ILayoutProps, ILayoutState> {
    constructor() {
        super();
        // Bind listener
        this._onChange = this._onChange.bind(this);
        this.state = {actions: Store.getAll()};
    }

    componentWillMount(){
        Store.on("change", this._onChange);
    }

    componentWillUnmount() {
        Store.removeListener("change", this._onChange);
    }

    _onChange() {
        this.setState({actions: Store.getAll()});
        console.log('Action : ' + this.state.actions);
    }

    render() {
        var msg = null;
        for (var element in this.state.actions) {
            console.log('ELEMENT ' + element);
            switch (element) {
                case "FORMAT":
                    msg = "Le fichier choisi n'est pas dans un format vidéo reconnu"
                    break;
                case "TOO_MANY":
                    msg = "Veuillez ne sélectionner qu'un seul fichier"
                    break;
                case "NO_FILE":
                    msg = "Veuillez sélectionner un fichier à ajouter"
                    break;
            }
        }

        return (
            <div className="error">
                    {msg}
            </div>
        );
    }
}