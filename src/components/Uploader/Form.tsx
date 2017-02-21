import * as React   from "react";

import * as Actions from "./Actions"
import Store        from "./UploaderStore"
import ConfForm     from "./Confirmation"

export interface ILayoutProps {}
export interface ILayoutState {
    actions: string[];
    teams: Object
}

export default class Form extends React.Component<ILayoutProps, ILayoutState> {
    
    constructor() {
        super();
        // Bind listeners
        this._onChange = this._onChange.bind(this);
        this._onTeamSearch = this._onTeamSearch.bind(this);
        this.state = {actions: Store.getActions(), teams: Store.getTeams()};
    }

    componentWillMount(){
        Store.on("CHANGE", this._onChange);
        Store.on("TEAM_SEARCHED", this._onTeamSearch);
    }

    componentWillUnmount() {
        Store.removeListener("CHANGE", this._onChange);
        Store.removeListener("TEAM_SEARCHED", this._onTeamSearch);
    }

    _onChange(){
        this.setState({actions: Store.getActions()});
    }

    _onTeamSearch() {
        this.setState({teams: Store.getTeams()});
        console.log("SEARCH : " + this.state.teams)
    }

    closeForm() {
        if (Store.getProgress()[0] === "100")
            Actions.Add('CLOSE_FORM')
        else
            Actions.Add('OPEN_CONFIRM_FORM');
    }

    onSave() {
        Actions.Add('SAVE');
    }

    onTeamSearch(event: any) : void {
        Actions.Add("SEARCH_TEAM", null, event.target.value);
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