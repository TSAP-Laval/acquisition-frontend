import * as React from "react";

import * as Actions from "../../Uploader/Actions"
import Store from "../../Uploader/uploaderStore"

export interface ILayoutProps {}
export interface ILayoutState {
    actions: string[]
}

export default class Footer extends React.Component<ILayoutProps, ILayoutState> {
    constructor() {
        super();
        // Bind listeners
        this._onChange = this._onChange.bind(this);
        this.state = {actions: []};
    }

    componentWillMount(){
        Store.on("change", this._onChange);
    }

    componentWillUnmount() {
        console.clear();
        console.log(Store.listenerCount('change'));
        Store.removeListener("change", this._onChange);
        console.log(Store.listenerCount('change'));
    }

    _onChange() {
        this.setState({actions: Store.getAll()});
        console.log('Action : ' + this.state.actions);
    }

    closeForm(e:React.FormEvent<HTMLButtonElement>) {
        Actions.Add('CLOSE_FORM');
    }

    closeConfirm(e:React.FormEvent<HTMLButtonElement>) {
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
                        <button onClick={ e => this.closeConfirm(e) } className="btn">Annuler</button>
                        <button onClick={ e => this.closeForm(e) } className="btn btn-primary" id="delete">Terminer</button>
                    </div>
                </div>
                <div id="blur-bkg-2" className="modal-backdrop fade in"></div>
            </div>
        );
    }
}