// tslint:disable:import-spacing
import * as React       from "react";

import * as Select      from "react-select";
import * as DateTime    from "react-datetime";
import * as Moment      from "moment";

import "../../sass/react-datetime.scss";
import "../../sass/react-select.scss";

import ConfForm             from "./Confirmation";
import Store                from "../../stores/UploaderStore";
import * as Actions         from "../../actions/UploadActions";
import TeamSearchOptions    from "./_teamSearchOptions";
import FieldSearchOptions   from "./_fieldSearchOptions";
import {
    IGames,
    ILocations,
    ITeams,
} from "../../interfaces/interfaces";
// tslint:enable:import-spacing

// tslint:disable-next-line:no-empty-interface
export interface ILayoutProps {}
export interface ILayoutState {
    teams?: any[];
    fields?: any[];
    openConfirmForm?: boolean;
    checkboxChecked?: boolean;
    game?: IGames;
    errors?: string[];
    savedOnce?: boolean;
    teamIsLoadingExternally?: boolean;
    fieldIsLoadingExternally?: boolean;
}

export default class Form extends React.Component<ILayoutProps, ILayoutState> {

    constructor() {
        super();
        // Bind listeners
        this._onOpenConfirmForm = this._onOpenConfirmForm.bind(this);
        this._onCloseConfirmForm = this._onCloseConfirmForm.bind(this);
        this._onTeamSearch = this._onTeamSearch.bind(this);
        this._onFieldSearch = this._onFieldSearch.bind(this);
        this._sendInfos = this._sendInfos.bind(this);

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
            checkboxChecked: true,
            errors: [],
            fields: Store.getFields(),
            game: {
                Action:         null,
                Date:           "",
                FieldCondition: "",
                ID:             0,
                Location:       null,
                LocationID:     0,
                OpposingTeam:   "",
                Season:         null,
                SeasonID:       0,
                Status:         "local", // Local/visiteur
                Team:           null,
                TeamID:         0,
            },
            openConfirmForm: false,
            savedOnce: false,
            teams: Store.getTeams(),
        };
    }

    public componentWillMount() {
        Store.on("open_confirm_form", this._onOpenConfirmForm);
        Store.on("close_confirm_form", this._onCloseConfirmForm);
        Store.on("team_searched", this._onTeamSearch);
        Store.on("field_searched", this._onFieldSearch);
    }

    public componentWillUnmount() {
        Store.removeListener("open_confirm_form", this._onOpenConfirmForm);
        Store.removeListener("close_confirm_form", this._onCloseConfirmForm);
        Store.removeListener("team_searched", this._onTeamSearch);
        Store.removeListener("field_searched", this._onFieldSearch);
    }

    public shouldComponentUpdate(nextState: ILayoutState) {
        this.setState(nextState);
        return true;
    }

    private _onOpenConfirmForm() {
        this.setState({openConfirmForm: true});
    }

    private _onCloseConfirmForm() {
        this.setState({openConfirmForm: false});
    }

    private _onTeamSearch() {
        this.setState({ teams: Store.getTeams(), teamIsLoadingExternally: false});
    }

    private _onFieldSearch() {
        this.setState({ fields: Store.getFields(), fieldIsLoadingExternally: false});
    }

    private closeForm() {
        Actions.closeForm();
    }

    private handleCheckboxChange() {
        const g = this.state.game;
        this.setState({checkboxChecked: !this.state.checkboxChecked});
        g.Status = this.state.checkboxChecked ? "local" : "visiteur";
        this.setState({game: g});
    }

    private onSave() {
        if (!this.state.savedOnce) {
            this.setState({savedOnce: true}, () => {
                this._sendInfos();
            });
        } else {
            this._sendInfos();
        }
    }

    private _sendInfos() {
        this.errorChecker(null);

        if (this.state.errors.length === 0) {
            const teamID = this.state.game.TeamID;
            const opposingTeam = this.state.game.OpposingTeam;
            const status = this.state.game.Status;
            const locationID = this.state.game.LocationID;
            const fieldCondition = this.state.game.FieldCondition;
            const date = this.state.game.Date;
            Actions.save(teamID, opposingTeam, status, locationID, fieldCondition, date);
        }
    }

    private errorChecker(date?: Moment.Moment) {
        if (this.state.savedOnce) {
            // We clear the errors
            while (this.state.errors.length > 0) {
                this.state.errors.pop();
            }

            if (this.state.game.TeamID === 0) {
                this.state.errors.push("Veuillez choisir une équipe");
            }

            if (this.state.game.OpposingTeam === "") {
                this.state.errors.push("Veuillez entrer une équipe adverse");
            }

            if (this.state.game.LocationID === 0) {
                this.state.errors.push("Veuillez choisir un terrain");
            }

            if (this.state.game.FieldCondition === "") {
                this.state.errors.push("Veuillez entrer la condition du terrain lors de la partie");
            }

            if (date != null) {
                if (typeof date.date !== typeof undefined) {
                    if (Moment(date, "YYYY-MM-DD HH:mm").isAfter(Moment.now())) {
                        this.state.errors.push("La date entrée doit être avant la date actuelle !");
                    }
                    else if (!Moment(date, "YYYY-MM-DD HH:mm", true).isValid()) {
                        this.state.errors.push("La date entrée est invalide !");
                    }
                }
                else {
                    this.state.errors.push("Veuillez choisir une date valide");
                }
            }
            else if (this.state.game.Date === "") {
                this.state.errors.push("Veuillez choisir une date");
            }
            this.shouldComponentUpdate(this.state);
        }
    }

    // tslint:disable-next-line:ban-types
    private onTeamSearch(value: any, callback: Function) {
        if (!value.trim()) {
            return Promise.resolve({ options: [] });
        }
        this.setState({ teamIsLoadingExternally: true });
        Actions.searchTeam(value.trim());

        callback(null, {
            complete: false,
            options: this.state.teams,
        });
    }

    // tslint:disable-next-line:ban-types
    private onFieldSearch(value: any, callback: Function) {
        if (!value.trim()) {
            return Promise.resolve({ options: [] });
        }
        this.setState({fieldIsLoadingExternally: true});
        Actions.searchField(value.trim());

        callback(null, {
            complete: false,
            options: this.state.fields,
        });
    }

    private onOpposingTeamInput(e: React.FormEvent<HTMLInputElement>) {
        this.state.game.OpposingTeam = (e.target as HTMLInputElement).value.trim();
        this.errorChecker();
        this.shouldComponentUpdate(this.state);
    }

    private onConditionInput(e: React.FormEvent<HTMLInputElement>) {
        this.state.game.FieldCondition = (e.target as HTMLInputElement).value.trim();
        this.errorChecker();
        this.shouldComponentUpdate(this.state);
    }

    private onDateInput(date: Moment.Moment) {
        if (typeof date.date !== typeof undefined) {
            if (Moment(date, "YYYY-MMM-DD HH:mm").isSameOrBefore(Moment.now()) &&
                Moment(date, "YYYY-MMM-DD HH:mm", true).isValid()) {
                    this.state.game.Date = date.format("YYYY-MM-DD HH:mm").toString();
                }
            else {
                this.state.game.Date = "";
            }
        }
        this.errorChecker(date);
        this.shouldComponentUpdate(this.state);
    }

    private teamSelected(team: ITeams) {
        this.state.game.Team = team;
        this.state.game.TeamID = team === null ? 0 : team.ID;
        this.errorChecker();
        this.shouldComponentUpdate(this.state);
    }

    private fieldSelected(location: ILocations) {
        this.state.game.Location = location;
        this.state.game.LocationID = location === null ? 0 : location.ID;
        this.errorChecker();
        this.shouldComponentUpdate(this.state);
    }

    public render() {
        const AsyncComponent = Select.Async;
        const confForm = this.state.openConfirmForm ? <ConfForm/> : null;
        const errors = this.state.errors.map((e, i) => <li key={i}>{e}</li>);
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
                                        <AsyncComponent
                                            multi={false}
                                            autoload={true}
                                            value={ this.state.game.Team }
                                            onChange={ this.teamSelected }
                                            loadOptions={ this.onTeamSearch }
                                            options={this.state.teams}
                                            isLoading={this.state.teamIsLoadingExternally}
                                            backspaceRemoves={true}
                                            valueKey="ID"
                                            labelKey="Name"
                                            optionComponent={TeamSearchOptions}
                                        />
                                    </div>
                                    <div className="onoffswitch col-sm-2">
                                        <input
                                            type="checkbox"
                                            name="onoffswitch"
                                            className="onoffswitch-checkbox"
                                            id="myonoffswitch"
                                            onChange={ this.handleCheckboxChange }
                                            checked={ this.state.checkboxChecked }
                                        />
                                        <label className="onoffswitch-label" htmlFor="myonoffswitch">
                                            <span className="onoffswitch-inner" />
                                            <span className="onoffswitch-switch" />
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-sm-2 control-label">Équipe adverse</label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Équipe adverse"
                                            onInput={ (e) => this.onOpposingTeamInput(e) }
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-sm-2 control-label">Terrain</label>
                                    <div className="col-sm-10 section">
                                        <AsyncComponent
                                            multi={false}
                                            autoload={true}
                                            value={ this.state.game.Location }
                                            onChange={ this.fieldSelected }
                                            loadOptions={ this.onFieldSearch }
                                            options={ this.state.fields }
                                            isLoading={this.state.fieldIsLoadingExternally}
                                            backspaceRemoves={true}
                                            valueKey="ID"
                                            labelKey="Name"
                                            optionComponent={FieldSearchOptions}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-sm-2 control-label">Condition(s) du terrain</label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Condition(s) du terrain"
                                            onInput={ (e) => this.onConditionInput(e) }
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-sm-2 control-label">Date</label>
                                    <div className="col-sm-8">
                                        <DateTime
                                            locale="fr-ca"
                                            dateFormat="YYYY-MM-DD"
                                            timeFormat="HH:mm"
                                            onBlur={ (e) => this.onDateInput(e) }
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                onClick={ this.closeForm }
                                type="button"
                                className="btn btn-default"
                                data-dismiss="modal"
                            >
                                Fermer
                            </button>
                            {/* tslint:disable-next-line:jsx-no-bind */}
                            <button onClick={ this.onSave.bind(this) } type="button" className="btn btn-primary">
                                Sauvegarder
                            </button>
                        </div>
                    </div>
                </div>
                <div id="blur-bkg" className="modal-backdrop fade in" />
                {confForm}
            </div>
        );
    }
}
