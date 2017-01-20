import * as React from "react";

import * as Actions from "../../Uploader/actions"
import Store from "../../Uploader/uploaderStore"

import ConfForm from "./Confirmation"

export interface ILayoutProps {}
export interface ILayoutState {
    actions: string[];
}

export default class Form extends React.Component<ILayoutProps, ILayoutState> {
    constructor() {
        super();
        // Bind listener
        this._onChange = this._onChange.bind(this);
        this.state = {actions: Store.getActions()};
    }

    componentWillMount(){
        Store.on("change", this._onChange);
    }

    componentWillUnmount() {
        Store.removeListener("change", this._onChange);
    }

    _onChange(){
        this.setState({actions: Store.getActions()});
        console.log('Action : ' + this.state.actions);
    }

    closeForm(e:React.FormEvent<HTMLButtonElement>) {
        Actions.Add('OPEN_CONFIRM_FORM');
    }

    save(e:React.FormEvent<HTMLButtonElement>) {
        Actions.Add('SAVE');
    }

    render() {

        var confForm = null;

        this.state.actions.forEach(function(element: any) {
            switch (element) {
                case "OPEN_CONFIRM_FORM":
                    confForm = <ConfForm/>
                default:
                    break;
            }
        });

        return (
            <div>
                <div className="modal-dialog relative" id="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button onClick={ e => this.closeForm(e) } type="button" className="close" data-dismiss="modal">
                                <span aria-hidden="true">&times;</span>
                                <span className="sr-only">Close</span>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">
                                Informations de la vidéo à analyser
                            </h4>
                        </div>
                        
                        <div className="modal-body">
                            <form className="form-horizontal" role="form">
                                <div className="form-group">
                                    <label  className="col-sm-2 control-label">Équipe locale</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" 
                                        placeholder="Équipe locale"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-sm-2 control-label">Équipe visiteure</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" 
                                        placeholder="Équipe visiteure"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-sm-2 control-label">Terrain</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" 
                                        placeholder="Terrain"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-sm-2 control-label">Date</label>
                                    <div className="col-sm-10">
                                        <input type="date" className="form-control" />
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                        <div className="modal-footer">
                            <button onClick={ e => this.closeForm(e) } type="button" className="btn btn-default"
                                    data-dismiss="modal">
                                        Fermer
                            </button>
                            <button onClick={ e => this.save(e) } type="button" className="btn btn-primary">
                                Sauvegarder
                            </button>
                        </div>
                    </div>
                </div>
                <div id="blur-bkg" className="modal-backdrop fade in"></div>
                {confForm}
            </div>
        );
    }
}