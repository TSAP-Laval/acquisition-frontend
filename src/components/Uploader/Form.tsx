import * as React   from "react";
import * as Select  from "react-select";
require('../../sass/react-select.scss');
import * as DateTime from "react-datetime";
require('../../sass/react-datetime.scss')
import * as Moment from "moment"

import * as Actions from "../../actions/UploadActions"
import Store        from "../../stores/UploaderStore"
import ConfForm     from "./Confirmation"
import { ILocations, ITeams, IGames } from "../../interfaces/interfaces"

export interface ILayoutProps {}
export interface ILayoutState {
    teams: any[]
    fields: any[]
    open_confirm_form: boolean
    checkboxChecked: boolean
    game: IGames
    errors: string[]
    savedOnce: boolean
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
        this.onSave = this.onSave.bind(this);
        this.onOpposingTeamInput = this.onOpposingTeamInput.bind(this);
        this.onConditionInput = this.onConditionInput.bind(this);
        this.onDateInput = this.onDateInput.bind(this);
        this.errorChecker = this.errorChecker.bind(this);

        this.state = {
            teams: Store.getTeams(), 
            fields: Store.getFields(),
            open_confirm_form: false, 
            checkboxChecked: true,
            game: {
                ID: 0,
                Team:           null,
                TeamID:         0,
                Status:         "local", // Local/visiteur
                OpposingTeam:   "",
                Season:         null,
                SeasonID:       0,
                Location:       null,
                LocationID:     0,
                FieldCondition: "",
                Date:           "",
                Action:         null,
            },
            errors: [],
            savedOnce: false,
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
        this.state.game.Status = this.state.checkboxChecked ? "local": "visiteur";
        this.shouldComponentUpdate(this.state);
    }

    onSave() {
        if (!this.state.savedOnce) {
            this.state.savedOnce = true;
            this.shouldComponentUpdate(this.state);
        }
        this.errorChecker();

        if (this.state.errors.length === 0) {
            let teamID = this.state.game.TeamID;
            let opposingTeam = this.state.game.OpposingTeam
            let status = this.state.game.Status
            let locationID = this.state.game.LocationID;
            let fieldCondition = this.state.game.FieldCondition
            let date = this.state.game.Date;

            Actions.save(teamID, opposingTeam, status, locationID, fieldCondition, date);
        }
    }

    errorChecker(date?: Moment.Moment) {
        if (this.state.savedOnce) {
            // We clear the errors
            this.state.errors = [];

            if (this.state.game.TeamID === 0)
                this.state.errors.push("Veuillez choisir une équipe");

            if (this.state.game.OpposingTeam === "")
                this.state.errors.push("Veuillez entrer une équipe adverse");

            if (this.state.game.LocationID === 0)
                this.state.errors.push("Veuillez choisir un terrain");

            if (this.state.game.FieldCondition === "")
                this.state.errors.push("Veuillez entrer la condition du terrain lors de la partie");

            if (date != null) {
                if (typeof date.date !== typeof undefined) {
                    if (Moment(date, "YYYY-MMM-DD HH:mm").isAfter(Moment.now()))
                        this.state.errors.push("La date entrée doit être avant la date actuelle !");
                    else if (!Moment(date, "YYYY-MMM-DD HH:mm", true).isValid())
                        this.state.errors.push("La date entrée est invalide !");
                }
                else
                    this.state.errors.push("Veuillez choisir une date valide");
            }
            else if (this.state.game.Date === "")
                this.state.errors.push("Veuillez choisir une date");

            this.shouldComponentUpdate(this.state);
        }
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

    onOpposingTeamInput(e: React.FormEvent<HTMLInputElement>) {
        this.state.game.OpposingTeam = (e.target as HTMLInputElement).value.trim();
        this.errorChecker();
        this.shouldComponentUpdate(this.state);
    } 

    onConditionInput(e: React.FormEvent<HTMLInputElement>) {
        this.state.game.FieldCondition = (e.target as HTMLInputElement).value.trim();
        this.errorChecker();
        this.shouldComponentUpdate(this.state);
    } 

    onDateInput(date: Moment.Moment) {
        if (typeof date.date !== typeof undefined) {
            if (Moment(date, "YYYY-MMM-DD HH:mm").isSameOrBefore(Moment.now()) &&
                Moment(date, "YYYY-MMM-DD HH:mm", true).isValid()) {
                    this.state.game.Date = date.format("YYYY-MM-DD HH:mm").toString();
                }
            else 
                this.state.game.Date = "";
        }
        this.errorChecker(date);
        this.shouldComponentUpdate(this.state);
    } 

    teamSelected(team: ITeams) {
        this.state.game.Team = team;
        this.state.game.TeamID = team === null ? 0 : team.ID;
        this.errorChecker();
        this.shouldComponentUpdate(this.state);
    }

    fieldSelected(location: ILocations) {
        this.state.game.Location = location;
        this.state.game.LocationID = location === null ? 0 : location.ID;
        this.errorChecker();
        this.shouldComponentUpdate(this.state);
    }

    render() {

        const AsyncComponent = Select.Async;
        let multi = false;
        let confForm = this.state.open_confirm_form ? <ConfForm/> : null;
        const errors = this.state.errors.map((e, i) => <li key={i}>{e}</li>)

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
                        <div>
                            <ul className="errors">{errors}</ul>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal" role="form">
                                <div className="form-group">
                                    <label  className="col-sm-2 control-label">Équipe</label>
                                    <div className="col-sm-8 section">
                                        <AsyncComponent multi={multi} autoload={false} value={this.state.game.Team} 
                                            onChange={ this.teamSelected } valueKey="ID" labelKey="Name"
                                            loadOptions={ this.onTeamSearch } backspaceRemoves={true} />
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
                                        placeholder="Équipe adverse" onInput={ e => this.onOpposingTeamInput(e) }/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-sm-2 control-label">Terrain</label>
                                    <div className="col-sm-10 section">
                                        <AsyncComponent multi={multi} autoload={false} value={this.state.game.Location} 
                                            onChange={ this.fieldSelected } valueKey="id" labelKey="Name"
                                            loadOptions={ this.onFieldSearch } backspaceRemoves={true} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-sm-2 control-label">Condition(s) du terrain</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control"
                                        placeholder="Condition(s) du terrain" onInput={ e => this.onConditionInput(e) }/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-sm-2 control-label">Date</label>
                                    <div className="col-sm-8">
                                        <DateTime locale="fr-ca" dateFormat="YYYY-MM-DD" timeFormat="HH:mm" onBlur={e => this.onDateInput(e)} />
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