import * as React from "react";

import * as Actions from "../../actions/UploadActions"
import Store from "../../stores/UploaderStore"

export interface ILayoutProps {}
export interface ILayoutState {}

export default class Footer extends React.Component<ILayoutProps, ILayoutState> {
    constructor() {
        super();
    }

    closeForm() {
        Actions.cancelUpload();
    }

    closeConfirm() {
        Actions.closeConfirmForm();
    }

    render() {
        return (
            <div>
                <div id="confirm" className="modal fade in">
                    <div className="modal-body">
                        Êtes-vous sûr de vouloir terminer l'analyse ?
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