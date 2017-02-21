import * as React from "react";

import * as Actions from "./Actions"
import Store from "./UploaderStore"

export interface ILayoutProps {}
export interface ILayoutState {
    actions: string[];
}

export default class Footer extends React.Component<ILayoutProps, ILayoutState> {
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

    closeForm() {
        Actions.Add('CLOSE_FORM');
        Actions.Add('CANCEL');
    }

    closeConfirm() {
        Actions.Add('CLOSE_CONFIRM_FORM');
    }

    render() {
        return (
            <div>
                <div id="confirm" className="modal fade in">
                    <div className="modal-body">
                        Êtes-vous sûr de vouloir terminer l'importation ?
                    </div>
                    <div className="modal-footer">
                        <button onClick={ this.closeConfirm } className="btn">Annuler</button>
                        <button onClick={ this.closeForm } className="btn btn-primary" id="delete">Terminer</button>
                    </div>
                </div>
                <div id="blur-bkg-2" className="modal-backdrop fade in"></div>
            </div>
        );
    }
}