import * as React from "react";

import {Button, Alert, Modal} from "react-bootstrap";
import * as Select from "react-select";
// Coach Store
import CoachStore from "../../stores/CoachStore";
import * as RequestHandler from "./RequestHandler";
// Seasons Store
import * as ManageActions from "../../actions/ManageActions";
import store from "../../stores/SeasonStore";

import * as Actions from "../../actions/UploadActions";
import {ITeams, ISports, ICoaches, ISeasons} from "../../interfaces/interfaces";
{/*tslint:disable-next-line:no-var-requires */}
require("../../sass/react-select.scss");

// Formulaire de modification
import EditForm from "./EditForm";

// tslint:disable-next-line:no-empty-interface
export interface ILayoutProps {}
export interface ILayoutState {
    teams?: any[];
    selectedValues?: any[];
    errorsMessage?: string[];
    coach?: ICoaches;
    sport?: string;
    seasons?: ISeasons[];
    editMode?: boolean;
    coachEditId?: number;
    coachsList?: any[];
    openEditForm?: boolean;
}



export default class Coachs extends React.Component<ILayoutProps, ILayoutState> {
    constructor(){
        super();

        this.state = {
            teams: CoachStore.GetAllTeams(),
            // tslint:disable-next-line:object-literal-sort-keys
            selectedValues: [],
            errorsMessage: [],
            seasons: [],
            coachsList: [],
            coach: {
                ID: 0,
                // tslint:disable-next-line:object-literal-sort-keys
                Fname: "",
                Lname: "",
                Email: "",
                Teams: null,
                TeamsIDs: [],
                Actif: true,
                PassHash:     "",
                TokenRequest: "",
                TokenReset:   "",
                TokenLogin:   "",
                Season: null,
            },
            coachEditId: null,
            editMode: false,
        };
        this.SelectedTeams = this.SelectedTeams.bind(this);
        this.SportChanged = this.SportChanged.bind(this);
        this.formValidator = this.formValidator.bind(this);
        this.SubmitAction = this.SubmitAction.bind(this);
        this.GetEquipeName = this.GetEquipeName.bind(this);
        this.EditCoach = this.EditCoach.bind(this);
        this.AddNew = this.AddNew.bind(this);

        this.OnFnameInput = this.OnFnameInput.bind(this);
        this.OnLnameInput = this.OnLnameInput.bind(this);
        this.OnMailInput = this.OnMailInput.bind(this);

        this._onOpenForm = this._onOpenForm.bind(this);
        this._onCloseForm = this._onCloseForm.bind(this);
    }

    public componentWillMount(){

        RequestHandler.getAllSports();
        RequestHandler.getAllTeams();
        RequestHandler.getCoachs();
        ManageActions.getSaison();

        CoachStore.on("change", () => {
            this.ListAllCoachs();
            this.ListAllSports();
            this.ListTeams("-1");
            this.ListSeasons();
        });

        CoachStore.on("openEditForm", this._onOpenForm);
    }

    public shouldComponentUpdate(nextState: ILayoutState) {
        this.setState(nextState);
        return true;
    }


    public _onOpenForm() {
        this.setState({openEditForm: true});
    }

    public _onCloseForm() {
        this.setState({openEditForm: false});
    }



    // Selection de sport changée
    public SportChanged(event: any){

        this.shouldComponentUpdate(this.state);
        this.ListTeams(String(event.target.value));
    }
    public ListAllCoachs(){
        const table = document.getElementById("coach_tbody");
        if (table !== undefined && table.children.length > 0){
            while (table.hasChildNodes()){
                table.removeChild(table.firstChild);
            }
        }

        const listCoachs = CoachStore.GetAllCoachs();
        this.setState({coachsList: listCoachs});
        const dataString = JSON.stringify(listCoachs);
        const jsonTab = JSON.parse(dataString);
        // tslint:disable-next-line:prefer-for-of
        for ( let i = 0; i < jsonTab.length; i++)
        {
            const data = jsonTab[i];
            /*tslint:disable-next-line:max-line-length */
            this.AddNew(data.Lname, data.Fname, data.Email, data.TeamsIDs, data.Actif, data.ID, data.SeasonID);

        }

    }
    public ListAllSports(){

        const selectSport = document.getElementById("sport_select");

        if (selectSport !== undefined && selectSport.children.length > 0){
            while (selectSport.hasChildNodes()){
                selectSport.removeChild(selectSport.firstChild);
            }
        }
        const allSport = CoachStore.GetAllSports();
        const dataSports = JSON.stringify(allSport);
        const jsonS = JSON.parse(dataSports);

        const emptOpt = document.createElement("option") as HTMLOptionElement;
        selectSport.appendChild(emptOpt);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < jsonS.length; i++)
            {
                const dataS = jsonS[i];
                const option = document.createElement("option");
                option.text = dataS.Name;
                option.value = dataS.ID;

                selectSport.appendChild(option);
            }
    }

    // Affiche la liste des equipes pour un sport donné
    public ListTeams(sportId: string){

        const listTeams = CoachStore.GetAllTeams();
        const dataTeam = JSON.stringify(listTeams);
        const jsonT = JSON.parse(dataTeam);
        const teamGr: any[] = [];
        if (sportId !== "-1"){
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < jsonT.length; i++ )
            {
                const dataT = jsonT[i];
                if (dataT.SportID === sportId){
                const option = document.createElement("option");
                option.text = dataT.Name;
                option.value = dataT.ID;
                teamGr.push({label : dataT.Name, value: dataT.ID });
                }
            }
        }
        this.setState({teams: teamGr});

    }


    public ListSeasons(){
        const allSaison = store.GetAllSeasons();
        const datastringify = JSON.stringify(allSaison);
        const tabJson = JSON.parse(datastringify);

        const seasonControl = document.getElementById("season_select");
        if (seasonControl !== undefined && seasonControl.children.length > 0){
        while (seasonControl.children.length > 0){
            seasonControl.removeChild(seasonControl.firstChild);
        }
        }

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < tabJson.length; i++) {
            const data = tabJson[i];
            const option = document.createElement("option");
            option.text = data.Years;
            option.value = data.ID;

            seasonControl.appendChild(option);

            this.state.seasons.push({ID: data.ID, Years: data.Years});

        }
    }

    public OnLnameInput(e: any){
        this.state.coach.Lname = (e.target as HTMLInputElement).value.trim();
        // this.shouldComponentUpdate(this.state);
    }

    public OnFnameInput(e: any){
        this.state.coach.Fname = (e.target as HTMLInputElement).value.trim();
        // this.shouldComponentUpdate(this.state);
    }

    public OnMailInput(e: any){
        this.state.coach.Email = (e.target as HTMLInputElement).value.trim();
        // this.shouldComponentUpdate(this.state);
    }

    // Valide le format de l'entrée de l'adresse d'email
    public validateEmail(email: string) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    }

    public formValidator(){

        const prenom = document.getElementById("coach_prenom") as HTMLInputElement;
        const nom = document.getElementById("coach_name") as HTMLInputElement;
        const email = document.getElementById("coach_mail") as HTMLInputElement;
        const selSport = document.getElementById("sport_select") as HTMLSelectElement;

        this.setState({errorsMessage: []});
        if ( prenom.value == null || prenom.value === ""){
            this.state.errorsMessage.push("Nom invalide : champs vide");
        }
        if (nom.value == null || nom.value === ""){
            this.state.errorsMessage.push("Prénom invalide : champs vide");
        }
        if (email.value == null || email.value === "" || !this.validateEmail(email.value)){
            this.state.errorsMessage.push("Email invalide");
        }
        if (selSport.selectedIndex === undefined){
            this.state.errorsMessage.push("Sport non sélectionné");
        }

        const errorArea = document.getElementById("error_zone") as HTMLTextAreaElement;
        errorArea.innerText = "Veuillez corriger les erreurs suivantes :";



        for (let i = 0; i < this.state.errorsMessage.length; i++) {
            const element = this.state.errorsMessage[i];
            errorArea.innerText += "\n" + (i + 1) + "- " + element;
        }

        errorArea.hidden = false;
        errorArea.className = "Error";
    }

    public ClearForm(){
        const prenom = document.getElementById("coach_prenom") as HTMLInputElement;
        const nom = document.getElementById("coach_name") as HTMLInputElement;
        const email = document.getElementById("coach_mail") as HTMLInputElement;
        const selSport = document.getElementById("sport_select") as HTMLSelectElement;
        const selSeason = document.getElementById("season_select") as HTMLSelectElement;

        prenom.value = "";
        nom.value = "";
        email.value = "";
        selSport.selectedIndex = 0;
        selSeason.selectedIndex = 0;


    }

    public SubmitAction(){
        const prenom = document.getElementById("coach_prenom") as HTMLInputElement;
        const nom = document.getElementById("coach_name") as HTMLInputElement;
        const email = document.getElementById("coach_mail") as HTMLInputElement;
        const selSport = document.getElementById("sport_select") as HTMLSelectElement;
        const selSeason = document.getElementById("season_select") as HTMLSelectElement;


        this.formValidator();
        if (this.state.errorsMessage.length === 0){

            const stateTeam = this.state.selectedValues;
            let joinedTeam = "";
            const selectedTeamName = [];

            for ( let i = 0; i < stateTeam.length; i++)
            {

                joinedTeam += stateTeam[i].value;
                selectedTeamName[i] = stateTeam[i].label;
                if ( i !== stateTeam.length - 1){
                joinedTeam += ",";
                }
            }
            const text = "{"
                    + '"Fname" :' + '"' + prenom.value + '"' + ","
                    + '"Lname" : ' + '"' + nom.value + '"' + ","
                    + '"Actif" : ' + '"' + "true" + '"' + ","
                    + '"Email" : ' + '"' + email.value + '"' + ","
                    + '"TeamsIDs" : ' + '"' + joinedTeam + '"' + ","
                    + '"SeasonID" : ' + Number(selSeason.value) +
                    + "}";

            if (!this.state.editMode && this.state.coachEditId == null)
            {
                RequestHandler.postCoach(text);

            }else{

                RequestHandler.putCoach(this.state.coachEditId, text);
            }
            const errorArea = document.getElementById("error_zone") as HTMLTextAreaElement;
            errorArea.hidden = true;
            this.ClearForm();
            RequestHandler.getCoachs();
            this.shouldComponentUpdate(this.state);
        }


        }

    public GetEquipeName(teamsIds: string) {

        const ulTeams = document.createElement("ul");
        const listTeams = CoachStore.GetAllTeams() as ITeams[];
        const ids = teamsIds.split(",");
        let nbTeams = 0;
        const countOption = document.createElement("ul");
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < ids.length; i++) {
            const tid = ids[i];
            // tslint:disable-next-line:prefer-for-of
            for (let j = 0; j < listTeams.length; j++) {
                const teams = listTeams[j];
                // tslint:disable-next-line:radix
                if ( parseInt(tid) === teams.ID){
                const option = document.createElement("li");
                option.innerText =  teams.Name;
                nbTeams++;
                ulTeams.appendChild(option);
            }
        }

        }

        return ulTeams;
    }

/*
    GetEquipeName(teamsIds:string) {

        var equipeAff  = document.createElement("select") as HTMLSelectElement;
        var listTeams = CoachStore.GetAllTeams() as ITeams[];
        var ids = teamsIds.split(',');
        var nbTeams = 0;
        var countOption = document.createElement("option");

        for (var i = 0; i < ids.length; i++) {
            var tid = ids[i];
            equipeAff.appendChild(countOption);
                for (var j = 0; j < listTeams.length; j++) {
                    var teams = listTeams[j];
                    if(parseInt(tid) == teams['ID']){
                    var option = document.createElement("option");
                    option.value = teams['ID'].toString();
                    option.text = teams['Name'];
                    equipeAff.appendChild(option);
                    nbTeams++;
                }
            }

    }

    if(ids.length == 0 || ids == undefined){
        equipeAff.disabled = true
    }else  {
        equipeAff.disabled = false;
    }
        return equipeAff;
    }
*/
    // Evenement lors de la fermeture de la liste
    public CoachTeamOnClose(val: any){
        const select = val as HTMLSelectElement;
        val.selectedIndex = 0;
    }

    // tslint:disable-next-line:max-line-length
     public AddNew(nom: string, prenom: string, email: string, equipe: string, estActif: string, id: number, season: any)
    {
        const doc = document.getElementById("coach_tbody");
        const x = document.createElement("tr");
        x.id = String(id);

        const tdNom = document.createElement("td");
        tdNom.innerHTML = nom;

        const tdPrenom =  document.createElement("td");
        tdPrenom.innerHTML = prenom;

        const tdEmail = document.createElement("td");
        tdEmail.innerHTML = email;

        const tdTeam = document.createElement("td");
        const teamsSel = this.GetEquipeName(equipe);
        tdTeam.appendChild(teamsSel);

        const tdActif = document.createElement("td");
        if (estActif === "true"){
        tdActif.innerHTML = "<input className='coach_actif' type='checkbox' name='Actif' value='true' checked >";
        }else {
            tdActif.innerHTML = "<input className='coach_actif' type='checkbox' name='Actif' value='true'>";
        }

        let saisonAffichage = "";
        // tslint:disable-next-line:arrow-parens
        this.state.seasons.forEach(s => {
            if (s.ID === season){
                saisonAffichage = s.Years;
            }
        });


        const tdSaison = document.createElement("td");
        tdSaison.innerHTML = saisonAffichage;

        const tbody = document.getElementById("coach_tbody");


        const tdEdit = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.innerHTML = "Modifier";
        editButton.id = String(id);

        editButton.onclick = this.EditCoach;


        x.appendChild(tdNom);
        x.appendChild(tdPrenom);
        x.appendChild(tdEmail);
        x.appendChild(tdTeam);
        x.appendChild(tdSaison);
        x.appendChild(tdActif);
        x.appendChild(editButton);

        tbody.appendChild(x);
    }



    public EditCoach(e: any){
        const Coachs = this.state.coachsList;

        const prenom = document.getElementById("coach_prenom") as HTMLInputElement;
        const nom = document.getElementById("coach_name") as HTMLInputElement;
        const email = document.getElementById("coach_mail") as HTMLInputElement;
        const selSeason = document.getElementById("season_select") as HTMLSelectElement;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < Coachs.length; i++) {
            if (e.target.id === Coachs[i].ID){

                const data = Coachs[i];

                prenom.value = data.Fname;
                nom.value = data.Lname;
                email.value = data.Email;
                selSeason.selectedIndex = data.SeasonID + 1;
                this.setState({coachEditId: data.ID});
                break;
        }
        }
    }

    public static propTypes = {
    label: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
      React.PropTypes.object,
    ]),
  };

    public SelectedTeams(val: any[]){
            this.setState({selectedValues: val});
    }


   public render() {

const te = React.createClass({

 render() {
        return (

        <div>

        <div id="te" className="modal fade" role="dialog">
        <div className="modal-dialog">

            <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Modal Header</h4>
            </div>
            <div className="modal-body">
                <p>Some text in the modal.</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
            </div>

        </div>
        </div>
</div>
        );
    },
});
return (
        <div className="container action_page" >
                                <div className="row col-lg-12">
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                            <h1>Coachs</h1>


                                            <div hidden={true} id="error_zone">
                                                {/*tslint:disable-next-line:max-line-length */}
                                                <textarea color="red" name="error_container" id="error_container" cols={30} rows={10} readOnly={true}/>
                                            </div>
                                            {/*tslint:disable-next-line:max-line-length */}
                                    <table style={ {width: 550}} className="table table-bordered table-hover striped bordered condensed hover coach_table" >
                                            <thead>
                                                <tr >
                                                    <th className="text-center">
                                                        Prenom
                                                    </th>
                                                    <th className="text-center">
                                                        Nom
                                                    </th>
                                                    <th className="text-center">
                                                        Email
                                                    </th>
                                                    <th className="text-center">
                                                        Equipes
                                                    </th>
                                                    <th className="text-center">
                                                        Saison
                                                    </th>
                                                    <th className="text-center">
                                                        Actif
                                                    </th>
                                                    <th className="texte-center">
                                                        Modification
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody id="coach_tbody"/>
                                        </table>

                                        <form method="post" title="Entraineur :" id="coachForm">
                                            <div className="form-group ">
                                                <label className="control-label" htmlFor="coach_name">
                                                Nom de l'entraineur :
                                                <span className="asteriskField">
                                                    *
                                                </span>
                                                </label>
                                                {/*tslint:disable-next-line:max-line-length */}
                                                {/*tslint:disable-next-line:arrow-parens */}
                                                <input onInput={e => this.OnLnameInput(e) } className="form-control requiredField" id="coach_name" name="Nom" type="text" required={true}/>
                                            </div>

                                            <div className="form-group ">
                                                <label className="control-label" htmlFor="coach_prenom">
                                                Prenom de l'entraineur :
                                                <span className="asteriskField">
                                                    *
                                                </span>
                                                </label>
                                                {/*tslint:disable-next-line:max-line-length */}
                                                <input onInput={e => this.OnFnameInput(e) } className="form-control requiredField" id="coach_prenom" name="Prenom" type="text" required/>
                                            </div>

                                            <div className="form-group ">
                                                <label className="control-label" htmlFor="coach_mail">
                                                Email de l'entraineur :
                                                <span className="asteriskField">
                                                    *
                                                </span>
                                                </label>
                                                {/*tslint:disable-next-line:max-line-length */}
                                                {/*tslint:disable-next-line:arrow-parens */}
                                                <input onInput={e => this.OnMailInput(e) } className="form-control requiredField" id="coach_mail" name="Email" type="email" required/>
                                            </div>

                                            <div className="form-group">

                                                    <label className="control-label" htmlFor="season_select">
                                                        Saison :
                                                        <span className="asteriskField">
                                                            *
                                                        </span>
                                                    </label>
                                                    {/*tslint:disable-next-line:max-line-length */}
                                                    <select className="select form-control" name="season_select" id="season_select"/>
                                                </div>

                                            <div className="form-group">
                                                    <label className="control-label" htmlFor="sport_select">
                                                        Sport :
                                                        <span className="asteriskField">
                                                            *
                                                        </span>
                                                    </label>
                                                    {/*tslint:disable-next-line:max-line-length */}
                                                        <select onChange={this.SportChanged} className="select form-control" name="sport_select" id="sport_select"/>
                                                </div>

                                                <div className="form-group">

                                                    <label className="control-label" htmlFor="teams_multi">
                                                        Équipes Disponibles :
                                                        <span className="asteriskField">
                                                            *
                                                        </span>
                                                    </label>
                                                    {/*tslint:disable-next-line:max-line-length */}
                                                        <Select multi={true} joinValues={true} options={this.state.teams}
                                                        onChange={ this.SelectedTeams} value={this.state.selectedValues}
                                                        placeholder="Sélectionner les équipes"
                                                    />
                                                </div>

                                        </form>

                                        <Button bsStyle="primary" id="submitBtn" onClick={this.SubmitAction}>
                                                    Enregistrer
                                        </Button>

                                        <Button bsStyle="default" id="clearBtn" onClick={this.ClearForm}>
                                                    Effacer
                                        </Button>

                                    </div>
                                </div>
        </div>



                );
    }
}
