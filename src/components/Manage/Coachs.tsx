import * as React from "react";
import * as $ from "jquery";

import {Button, Alert, Modal} from "react-bootstrap";
import * as Select from 'react-select';
//Coach Store
import CoachStore from "../../stores/CoachStore";
import * as RequestHandler from "./RequestHandler";
//Seasons Store
import * as ManageActions  from "../../actions/ManageActions";
import store from "../../stores/SeasonStore";

import * as Actions from "../../actions/UploadActions";
import {ITeams, ISports, ICoaches, ISeasons} from "../../interfaces/interfaces";
require('../../sass/react-select.scss');

///Ajout d'une équipe modale
const modalInstance = React.createClass({

    render() {
        return (

    <div className="static-modal">
        <Modal.Dialog>
        <Modal.Header>
            <Modal.Title>Assigner des équipes</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div className="form-group">
                                            
                <label className="control-label" htmlFor="sport_select">
                    Sport :
                    <span className="asteriskField">
                        *
                    </span>
                </label>
                    <select className="select form-control" id="sport_select" name="sport_select">
                        <option value="Soccer">Soccer</option>
                    </select>
            </div>

            <div className="form-group">
                                            
                <label className="control-label" htmlFor="teams_multi">
                    Équipes Disponibles :
                    <span className="asteriskField">
                        *
                    </span>
                </label>
                    <select multiple className="select multiple form-control" id="teams_multi" name="teams_multi">
                        <option value="A">A</option>
                        <option value="AA">AA</option>
                        <option value="AAA">AAA</option>
                        <option value="recreatif">Récreatif</option>
                    </select>
            </div>
        </Modal.Body>

        <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
            <Button bsStyle="primary">Save changes</Button>
        </Modal.Footer>

        </Modal.Dialog>
        </div>
        );
    }
});

export interface ILayoutProps {}
export interface ILayoutState {
    //SelectedTeams: string;
    teams?: any[];
    selectedValues? : any[];
    errors?: string[];
    coach?: ICoaches;
    sport?: string;
    seasons?: ISeasons[];
    openEditForm?: boolean;
}
export default class Coachs extends React.Component<ILayoutProps, ILayoutState> {
    constructor(){
        super();

    this.state = {
        teams: CoachStore.GetAllTeams(),
        selectedValues: [],
        errors: [],
        seasons: [],
        //sport : "1",
        coach: {
            ID: 0,
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
            Season: null
        },
        openEditForm: false
    };
            
        this.SelectedTeams = this.SelectedTeams.bind(this);
        this.SportChanged = this.SportChanged.bind(this);
        this.formValidator = this.formValidator.bind(this);
        this.SubmitAction = this.SubmitAction.bind(this);
        this.GetEquipeName = this.GetEquipeName.bind(this);

        this.OnFnameInput = this.OnFnameInput.bind(this);
        this.OnLnameInput = this.OnLnameInput.bind(this);
        this.OnMailInput = this.OnMailInput.bind(this);

        this._onOpenForm = this._onOpenForm.bind(this);
        this._onCloseForm = this._onCloseForm.bind(this);
        
    }
    
    componentWillMount(){

        RequestHandler.getAllSports();
        RequestHandler.getAllTeams();
        RequestHandler.getCoachs();
        ManageActions.getSaison();
        
        CoachStore.on("change", ()=> {
            this.ListAllCoachs();
            this.ListAllSports();
            this.ListTeams("-1");
            this.ListSeasons();
        })
    }

    shouldComponentUpdate(nextState: ILayoutState) {
        this.setState(nextState);
        return true;
    }


    _onOpenForm() {
        this.setState({openEditForm: true});
    }

    _onCloseForm() {
        this.setState({openEditForm: false});
    }



    //Selection de sport changée
    SportChanged(event: any){

        this.shouldComponentUpdate(this.state);
        console.log(String(event.target.value));
        this.ListTeams(String(event.target.value));
    }
    ListAllCoachs(){
        var table = document.getElementById('coach_tbody');
        if(table != undefined && table.children.length > 0){
            while (table.hasChildNodes()){
                table.removeChild(table.firstChild);
            }
        }

        var listCoachs = CoachStore.GetAllCoachs();
        var dataString = JSON.stringify(listCoachs);
        var jsonTab = JSON.parse(dataString);

        for(var i= 0; i < jsonTab.length; i++)
        {
            var data = jsonTab[i];
            this.AddNew(data['Lname'],data['Fname'],data['Email'], data['TeamsIDs'], data['Actif'], i, data["SeasonID"]);

        }   
        
    }
    ListAllSports(){

        var selectSport = document.getElementById('sport_select');

        if(selectSport != undefined && selectSport.children.length > 0){
            while (selectSport.hasChildNodes()){
                selectSport.removeChild(selectSport.firstChild);
            }
        }
        var allSport= CoachStore.GetAllSports();
        var dataSports = JSON.stringify(allSport);
        var jsonS = JSON.parse(dataSports);
        
        var emptOpt = document.createElement("option") as HTMLOptionElement;
       selectSport.appendChild(emptOpt);

         for(var i= 0; i < jsonS.length; i++)
        {
            var dataS = jsonS[i];
            var option = document.createElement("option");
            option.text = dataS['Name'];
            option.value = dataS['ID'];

            selectSport.appendChild(option);
        }

        
    }

    //Affiche la liste des equipes pour un sport donné
    ListTeams(sportId: string){
       
        var listTeams = CoachStore.GetAllTeams();
        var dataTeam = JSON.stringify(listTeams);
        var jsonT = JSON.parse(dataTeam);
        var teamGr : any[] = [];
        if(sportId != "-1"){
            for(var i=0; i < jsonT.length; i++ )
            {
                var dataT = jsonT[i];
                if(dataT["SportID"] == sportId){
                var option = document.createElement("option");
                option.text = dataT['Name'];
                option.value = dataT['ID'];
                teamGr.push({label : dataT['Name'], value: dataT['ID'] });
                }
            }
        }
        this.setState({teams: teamGr});
        
    }


    ListSeasons(){
        var allSaison=store.GetAllSeasons();
        var datastringify =JSON.stringify(allSaison);
 	    var tabJson = JSON.parse(datastringify);

        var seasonControl = document.getElementById('season_select');
         if(seasonControl != undefined && seasonControl.children.length > 0){
            while (seasonControl.children.length > 0){
                seasonControl.removeChild(seasonControl.firstChild);
            }
        }


        for (var i = 0; i < tabJson.length; i++) {
            var data = tabJson[i];
            var option = document.createElement("option");
            option.text = data['Years'];
            option.value = data['ID'];

            seasonControl.appendChild(option);

            this.state.seasons.push({ID: data['ID'], Years: data['Years']});

        }
    }

    OnLnameInput(e: any){
        this.state.coach.Lname = (e.target as HTMLInputElement).value.trim();
        //this.shouldComponentUpdate(this.state);
    }

     OnFnameInput(e: any){
        this.state.coach.Fname = (e.target as HTMLInputElement).value.trim();
        //this.shouldComponentUpdate(this.state);
    }

     OnMailInput(e: any){
        this.state.coach.Email = (e.target as HTMLInputElement).value.trim();
        //this.shouldComponentUpdate(this.state);
    }

    //Valide le format de l'entrée de l'adresse d'email
    validateEmail(email: string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    }

    formValidator(){
        this.state.errors =  [];
        if(this.state.coach.Fname == null || this.state.coach.Fname == ""){
            this.state.errors.push("Nom invalide : champs vide");
        }
        if(this.state.coach.Fname == null || this.state.coach.Lname == ""){
            this.state.errors.push("Prénom invalide : champs vide");
        }
        if(this.state.coach.Fname == null || this.state.coach.Email == "" || !this.validateEmail(this.state.coach.Email)){
            this.state.errors.push("Email invalide");
        }
        
        console.log(this.state.errors);
        var errorArea = document.getElementById("error_zone") as HTMLTextAreaElement;
        errorArea.innerText = "Veuillez corriger les erreurs suivantes :";
        
        for (var i = 0; i < this.state.errors.length; i++) {
            var element = this.state.errors[i];
            errorArea.innerText += "\n" + (i+1) + "- " + element;
        }

        errorArea.hidden = false;

    }

    ClearForm(){
        var prenom = document.getElementById("coach_prenom") as HTMLInputElement;
        var nom = document.getElementById("coach_name") as HTMLInputElement;
        var email = document.getElementById("coach_mail") as HTMLInputElement;
        var selSport = document.getElementById("sport_select") as HTMLSelectElement;
        
        prenom.value = "";
        nom.value = "";
        email.value = "";
        selSport.selectedIndex = 0;

    }

    SubmitAction(){
        debugger;
        var prenom = document.getElementById("coach_prenom") as HTMLInputElement;
        var nom = document.getElementById("coach_name") as HTMLInputElement;
        var email = document.getElementById("coach_mail") as HTMLInputElement;
        var selSport = document.getElementById("sport_select") as HTMLSelectElement;
        var selSeason = document.getElementById("season_select") as HTMLSelectElement;


        this.formValidator();
        if(this.state.errors.length == 0){
            
            var stateTeam = this.state.selectedValues;
            var joinedTeam = "";
            var selectedTeamName = [];
            
            for( var i = 0; i < stateTeam.length; i++)
            {
               
                joinedTeam += stateTeam[i]["value"];
                selectedTeamName[i] = stateTeam[i]["label"];
                if(i != stateTeam.length-1){
                joinedTeam += ",";
                }
            }

        var text = '{'
                +'"Fname" :' + '"' + prenom.value + '"' + ','
                +'"Lname" : '+ '"' + nom.value + '"' + ',' 
                +'"Actif" : '+ '"' + "true" + '"' + ','
                +'"Email" : '+ '"' + email.value + '"' + ',' 
                +'"TeamsIDs" : ' + '"' + joinedTeam + '"' + ',' 
                +'"SeasonID" : ' + '"' + selSeason.id + '"'
                +'}';
        
        RequestHandler.postCoach(text);

        var errorArea = document.getElementById("error_zone") as HTMLTextAreaElement;

        errorArea.hidden = true;

        this.ClearForm();

        CoachStore.emit("change");
        }
    }

    GetEquipeName(teamsIds:string) {
        
        var equipeAff  = document.createElement("select");
        var listTeams = CoachStore.GetAllTeams() as ITeams[];
        var ids = teamsIds.split(',');

        for (var i = 0; i < ids.length; i++) {
            debugger;
            var tid = ids[i];
                for (var j = 0; j < listTeams.length; j++) {
                    var teams = listTeams[j];
                    if(parseInt(tid) == teams['ID']){
                    var option = document.createElement("option");
                    option.value = teams['ID'].toString();
                    option.text = teams['Name'];
                    equipeAff.appendChild(option);
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



     AddNew(nom:string, prenom:string, email:string, equipe:string, estActif:string, id:number, season:any)
    {
              var doc = document.getElementById("coach_tbody");
			  var x = document.createElement("tr");
              x.id = String(id);

			  var tdNom = document.createElement("td");
			  tdNom.innerHTML=nom;
              
              var tdPrenom =  document.createElement("td");
			  tdPrenom.innerHTML= prenom;
              
              var tdEmail = document.createElement("td");
			  tdEmail.innerHTML= email;

              var tdTeam = document.createElement("td");    
              var teamsSel = this.GetEquipeName(equipe) as HTMLSelectElement;
              
              tdTeam.appendChild(teamsSel);
              var tdActif = document.createElement("td");
                if(estActif == 'true'){
                tdActif.innerHTML = "<input className='coach_actif' type='checkbox' name='Actif' value='true' checked >";
                }else {
                    tdActif.innerHTML = "<input className='coach_actif' type='checkbox' name='Actif' value='true'>";
                }

                var saisonAffichage = ""
                this.state.seasons.forEach(s => {
                    if(s.ID == season){
                        saisonAffichage = s.Years;
                    }
                });


              var tdSaison = document.createElement("td");
              tdSaison.innerHTML = saisonAffichage;

              x.appendChild(tdNom);
              x.appendChild(tdPrenom);
              x.appendChild(tdEmail);
              x.appendChild(tdTeam);
              x.appendChild(tdSaison)
              x.appendChild(tdActif);

              $('#coach_tbody').append(x);


    }

    static propTypes = {
    label: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
      React.PropTypes.object,
    ])
  }

    ShowModal(){
        return modalInstance; 
    }


    SelectedTeams(val: any[]){
            console.log("Selection : " + val);
            this.setState({selectedValues: val});
    }


    render() {

      /*  function AddRow(coachName:string, coachPrenom:string, coachMail:string){
        
        
         var trToAdd =   "<tr><td>" + String(coachPrenom) + "</td><td contenteditable='true'>" 
                        + String(coachName) + "</td><td contenteditable='true'>" 
                        + String(coachMail) + "</td>"
                        + "<td></td><td>type='checkbox' className='coach_actif' value='true' checked></td></tr>";
            $('.coach_table tbody').append(trToAdd);           
    }*/
        return (
<div className="container action_page" >
                        <div className="row col-lg-12">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                    <h1>Coachs</h1>


                                    <div hidden={true} id="error_zone">
                                        
                                        <textarea color="red" name="error_container" id="error_container" cols={30} rows={10} readOnly>
                                        </textarea>
                                    </div>

                               <table style={ {width:550}} className="table table-bordered table-hover striped bordered condensed hover coach_table" >
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
                                        </tr>
                                    </thead>
                                    <tbody id="coach_tbody">

                                    </tbody>
                                </table>

                                
                                <form method="post" title="Entraineur :" id="coachForm">
                                    <div className="form-group ">
                                        <label className="control-label" htmlFor="coach_name">
                                        Nom de l'entraineur :
                                        <span className="asteriskField">
                                            *
                                        </span>
                                        </label>
                                        <input onInput={e => this.OnLnameInput(e) } className="form-control requiredField" id="coach_name" name="Nom" type="text" required/>
                                    </div>

                                    <div className="form-group ">
                                        <label className="control-label" htmlFor="coach_prenom">
                                        Prenom de l'entraineur :
                                        <span className="asteriskField">
                                            *
                                        </span>
                                        </label>
                                        <input onInput={e => this.OnFnameInput(e) } className="form-control requiredField" id="coach_prenom" name="Prenom" type="text" required/>
                                    </div>

                                    <div className="form-group ">
                                        <label className="control-label" htmlFor="coach_mail">
                                        Email de l'entraineur :
                                        <span className="asteriskField">
                                            *
                                        </span>
                                        </label>
                                        <input onInput={e => this.OnMailInput(e) } className="form-control requiredField" id="coach_mail" name="Email" type="email" required/>
                                    </div>

                                    <div className="form-group">
                                                                        
                                            <label className="control-label" htmlFor="season_select">
                                                Saison :
                                                <span className="asteriskField">
                                                    *
                                                </span>
                                            </label>
                                                <select className="select form-control" name="season_select" id="season_select">
                                                </select>
                                        </div>

                                    <div className="form-group">
                                                                        
                                            <label className="control-label" htmlFor="sport_select">
                                                Sport :
                                                <span className="asteriskField">
                                                    *
                                                </span>
                                            </label>
                                                <select onChange={this.SportChanged} className="select form-control" name="sport_select" id="sport_select">
                                                </select>
                                        </div>

                                        <div className="form-group">
                                                                        
                                            <label className="control-label" htmlFor="teams_multi">
                                                Équipes Disponibles :
                                                <span className="asteriskField">
                                                    *
                                                </span>
                                            </label>
                                                <Select multi joinValues options={this.state.teams}
                                                onChange={ this.SelectedTeams} value={this.state.selectedValues}
                                                placeholder="Sélectionner les équipes"
                                              />
                                        </div>

                                </form>

                                <Button bsStyle="primary" onClick={this.SubmitAction}>
                                            Soumettre
                                </Button>
                            </div>
                        </div>
</div>
        );
    }
}
