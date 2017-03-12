import * as React   from "react";
import * as Select  from "react-select";
require('../../sass/react-select.scss');
import * as DateTime from "react-datetime";
require('../../sass/react-datetime.scss')

import * as Actions from "../../actions/UploadActions"
import Store        from "../../stores/UploaderStore"
import ConfForm     from "./Confirmation"

export interface ILayoutProps {}
export interface ILayoutState {
    teams: any[]
    fields: any[]
    open_confirm_form: boolean
    checkboxChecked: boolean
    teamSelected: string
    fieldSelected: string
}

export default class Form extends React.Component<ILayoutProps, ILayoutState> {

    constructor() {
        super();
        // Bind listeners
        this._onOpenConfirmForm = this._onOpenConfirmForm.bind(this);
        this._onCloseConfirmForm = this._onCloseConfirmForm.bind(this);

        this._onTeamSearch = this._onTeamSearch.bind(this);
        this._onFieldSearch = this._onFieldSearch.bind(this);
        
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.onTeamSearch = this.onTeamSearch.bind(this);
        this.teamSelected = this.teamSelected.bind(this);
        this.onFieldSearch = this.onFieldSearch.bind(this);
        this.fieldSelected = this.fieldSelected.bind(this);

        this.state = {
            teams: Store.getTeams(), 
            fields: Store.getFields(),
            open_confirm_form: false, 
            checkboxChecked: true,
            teamSelected: "",
            fieldSelected: "",
        };
    }

    componentWillMount(){
        Store.on("open_confirm_form", this._onOpenConfirmForm);
        Store.on("close_confirm_form", this._onCloseConfirmForm);

        Store.on("team_searched", this._onTeamSearch);
        Store.on("field_searched", this._onFieldSearch);
    }

    componentWillUnmount() {
        Store.removeListener("open_confirm_form", this._onOpenConfirmForm);
        Store.removeListener("close_confirm_form", this._onCloseConfirmForm);

        Store.removeListener("team_searched", this._onTeamSearch);
        Store.removeListener("field_searched", this._onFieldSearch);
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

    _onFieldSearch() {
        this.state.fields = Store.getFields();
        this.shouldComponentUpdate(this.state);
    }

    closeForm() {
        Actions.closeForm()
    }

    handleCheckboxChange() {
        this.state.checkboxChecked = !this.state.checkboxChecked;
        this.shouldComponentUpdate(this.state);
    }

    onSave() {
        Actions.save();
    }

    onTeamSearch(value: any, callback: Function) {
        if (!value) {
			return Promise.resolve({ options: [] });
		}

        Actions.searchTeam(value);
        callback(null, {
            options: this.state.teams,
            complete: false
        });
    }  

    onFieldSearch(value: any, callback: Function) {
        if (!value) {
			return Promise.resolve({ options: [] });
		}

        Actions.searchField(value);
        callback(null, {
            options: this.state.fields,
            complete: false
        });
    }  

    teamSelected(value: any) {
        this.state.teamSelected = value;
        this.shouldComponentUpdate(this.state);
    }

    fieldSelected(value: any) {
        this.state.fieldSelected = value;
        this.shouldComponentUpdate(this.state);
    }

    render() {

        const AsyncComponent = Select.Async;
        let multi = false;
        let confForm = this.state.open_confirm_form ? <ConfForm/> : null;

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
                                Informations sur la vidéo à analyser
                            </h4>
                        </div>
                        
                        <div className="modal-body">
                            <form className="form-horizontal" role="form">
                                <div className="form-group">
                                    <label  className="col-sm-2 control-label">Équipe</label>
                                    <div className="col-sm-8 section">
                                        <AsyncComponent multi={multi} autoload={false} value={this.state.teamSelected} 
                                            onChange={this.teamSelected} valueKey="id" labelKey="Name"
                                            loadOptions={this.onTeamSearch} backspaceRemoves={true} />
                                    </div>
                                    <div className="onoffswitch col-sm-2">
                                        <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch" 
                                                onChange={ this.handleCheckboxChange } checked={ this.state.checkboxChecked } />
                                        <label className="onoffswitch-label" htmlFor="myonoffswitch">
                                            <span className="onoffswitch-inner"></span>
                                            <span className="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-sm-2 control-label">Équipe adverse</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" 
                                        placeholder="Équipe adverse"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-sm-2 control-label">Terrain</label>
                                    <div className="col-sm-10 section">
                                        <AsyncComponent multi={multi} autoload={false} value={this.state.fieldSelected} 
                                            onChange={this.fieldSelected} valueKey="id" labelKey="Name"
                                            loadOptions={this.onFieldSearch} backspaceRemoves={true} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-sm-2 control-label">Date</label>
                                    <div className="col-sm-8">
                                        <DateTime locale="fr-ca"/>
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