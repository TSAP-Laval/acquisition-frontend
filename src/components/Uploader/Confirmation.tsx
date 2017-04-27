import * as React from "react";

import * as Actions from "../../actions/UploadActions";
import Store from "../../stores/UploaderStore";

// tslint:disable:no-empty-interface
export interface ILayoutProps {}
export interface ILayoutState {}
// tslint:enable:no-empty-interface

export default class Footer extends React.Component<ILayoutProps, ILayoutState> {
    constructor() {
        super();
    }

    private closeForm() {
        Actions.cancelUpload();
    }

    private closeConfirm() {
        Actions.closeConfirmForm();
    }

    public render() {
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
                <div id="blur-bkg-2" className="modal-backdrop fade in" />
            </div>
        );
    }
}
