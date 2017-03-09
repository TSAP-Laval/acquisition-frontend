import * as React   from "react";

import * as Actions from "../../actions/UploadActions"
import Store        from "../../stores/UploaderStore"
import ConfForm     from "./Confirmation"

export interface ILayoutProps {}
export interface ILayoutState {
    teams: Object
    open_confirm_form: boolean
}

export default class Form extends React.Component<ILayoutProps, ILayoutState> {
    
    constructor() {
        super();
        // Bind listeners
        this._onOpenConfirmForm = this._onOpenConfirmForm.bind(this);
        this._onCloseConfirmForm = this._onCloseConfirmForm.bind(this);

        this._onTeamSearch = this._onTeamSearch.bind(this);

        this.state = {teams: Store.getTeams(), open_confirm_form: false};
    }

    componentWillMount(){
        Store.on("open_confirm_form", this._onOpenConfirmForm);
        Store.on("close_confirm_form", this._onCloseConfirmForm);

        Store.on("team_searched", this._onTeamSearch);
    }

    componentWillUnmount() {
        Store.removeListener("open_confirm_form", this._onOpenConfirmForm);
        Store.removeListener("close_confirm_form", this._onCloseConfirmForm);

        Store.removeListener("team_searched", this._onTeamSearch);
    }

    shouldComponentUpdate(nextState: ILayoutState) {
        this.setState(nextState);
        return true;
    }

    _onOpenConfirmForm(){
        this.state.open_confirm_form = true;
        this.shouldComponentUpdate(this.state);
    }

    _onCloseConfirmForm(){
        this.state.open_confirm_form = false;
        this.shouldComponentUpdate(this.state);
    }

    _onTeamSearch() {
       this.state.teams = Store.getTeams();
        this.shouldComponentUpdate(this.state);
    }

    closeForm() {
        Actions.closeForm()
    }

    onSave() {
        Actions.save();
    }

    onTeamSearch(event: any) : void {
        Actions.searchTeam(event.target.value);
    }  

    render() {

        var confForm = this.state.open_confirm_form ? <ConfForm/> : null;

        return (
            <div>
                <div className="modal-dialog relative" id="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button onClick={ this.closeForm } type="button" className="close" data-dismiss="modal">
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
                                        <input type="text" className="form-control" onInput={ e => this.onTeamSearch(e) }
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
                            <button onClick={ this.closeForm } type="button" className="btn btn-default"
                                    data-dismiss="modal">
                                        Fermer
                            </button>
                            <button onClick={ this.onSave } type="button" className="btn btn-primary">
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