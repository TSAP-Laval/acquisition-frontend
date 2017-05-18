/*import * as React from "react";
import {Button, Alert, Modal} from "react-bootstrap";
import * as Select from "react-select";
import CoachStore from "../../stores/CoachStore";
import * as RequestHandler from "./RequestHandler";

export interface ILayoutProps {}
export interface ILayoutState {}



// Ajout d"une équipe modale
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
    SelectedTeams?: string;
}
export default class Coachs extends React.Component<ILayoutProps, ILayoutState> {


    Option: any[] =  [];

    constructor(){
        super();
        
        this.SelectedTeams = this.SelectedTeams.bind(this);

    this.state = {
        SelectedTeams:"",
        };
    }
    
    componentWillMount(){
        RequestHandler.getCoachs();
        RequestHandler.getAllTeams();
        RequestHandler.getAllSports();

        CoachStore.on("change", ()=> {
            this.ListAllCoachs();
            this.ListAllTeamsAndSports();
        })   
    }

    OnCheckedChange(){
         $(".coach_actif").change(function() {
            if(this.checked) {
                alert(this);
            }
        });
    }
    ListAllCoachs(){
        var table = document.getElementById("coach_tbody");
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
            this.AddNew(data["Lname"],data["Fname"],data["Email"], data["Teams"], data["Actif"], i);

        }   
        
    }
    ListAllTeamsAndSports(){

        var selectSport = document.getElementById("sport_select");

        if(selectSport != undefined && selectSport.children.length > 0){
            while (selectSport.hasChildNodes()){
                selectSport.removeChild(selectSport.firstChild);
            }
        }
        var allSport= CoachStore.GetAllSports();
        var dataSports = JSON.stringify(allSport);
        var jsonS = JSON.parse(dataSports);
        
         for(var i= 0; i < jsonS.length; i++)
        {
            var dataS = jsonS[i];
            var option = document.createElement("option");
            option.text = dataS["Name"];
            option.value = dataS["ID"];
            
            selectSport.appendChild(option);
        }

        var teams_control = document.getElementById("teams_multi");
        if(teams_control != undefined && teams_control.children.length > 0){
            while (teams_control.children.length  != 0){
                teams_control.removeChild(teams_control.firstChild);
            }
        }
        var listTeams = CoachStore.GetAllTeams();
        var dataTeam = JSON.stringify(listTeams);
        var jsonT = JSON.parse(dataTeam);

         for(var i= 0; i < jsonT.length; i++)
        {
            var dataT = jsonT[i];
            var option = document.createElement("option");
            option.text = dataT["Name"];
            option.value = dataT["ID"];
            
            teams_control.appendChild(option);
        }
        
        
    }

    SubmitAction(){


         var teams : Number[] = []; 
            // $("#teams_multi :selected").each(function(i, selected){ 
            // teams[i] = Number($(selected).val()); 
            // });
            
            
            
            var jsonTeams = JSON.stringify(teams);
            
         var text = "{"
                +""Fname" :" + """ +$("#coach_prenom").val() + """ + ","
                +""Lname" : "+ """ +$("#coach_name").val() + """ + "," 
                +""Actif" : "+ """ + "true" + """ + ","
                +""Email" : "+ """ +$("#coach_mail").val() + "","
                +""Teams" : " + jsonTeams
                +"}";

       RequestHandler.postCoach(text);
    }


     AddNew(nom:string, prenom:string, email:string, equipe:string[], estActif:string, id:number)
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
              if(equipe != undefined && equipe.length > 0){
                tdEmail.innerHTML = equipe.join(",");
              }

              var tdActif = document.createElement("td");
                if(estActif == "true"){
                tdActif.innerHTML = "<input className="coach_actif" type="checkbox" name="Actif" value="true" checked >";
                }else {
                    tdActif.innerHTML = "<input className="coach_actif" type="checkbox" name="Actif" value="true">";
                }

              x.appendChild(tdNom);
              x.appendChild(tdPrenom);
              x.appendChild(tdEmail);
              x.appendChild(tdTeam);
              x.appendChild(tdActif);

              $("#coach_tbody").append(x);
    }



    ShowModal(){
        return modalInstance; 
    }


    SelectedTeams(val:any){
        this.setState({ SelectedTeams: val});
    }


    render() {

        function AddRow(coachName:string, coachPrenom:string, coachMail:string){
        
        
        
         var trToAdd =   "<tr><td>" + String(coachPrenom) + "</td><td contenteditable="true">" 
                        + String(coachName) + "</td><td contenteditable="true">" 
                        + String(coachMail) + "</td>"
                        + "<td></td><td>type="checkbox" className="coach_actif" value="true" checked></td></tr>";

            $(".coach_table tbody").append(trToAdd);

           
    }


        return (
<div className="container action_page" >
                        <div className="row col-lg-12">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                    <h1>Coachs</h1>
                               <table style={ {width:500}} className="table table-bordered table-hover striped bordered condensed hover coach_table" >
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
                                        Nom de l"entraineur :
                                        <span className="asteriskField">
                                            *
                                        </span>
                                        </label>
                                        <input className="form-control requiredField" id="coach_name" name="Nom" type="text" required/>
                                    </div>

                                    <div className="form-group ">
                                        <label className="control-label" htmlFor="coach_prenom">
                                        Prenom de l"entraineur :
                                        <span className="asteriskField">
                                            *
                                        </span>
                                        </label>
                                        <input className="form-control requiredField" id="coach_prenom" name="Prenom" type="text" required/>
                                    </div>

                                    <div className="form-group ">
                                        <label className="control-label" htmlFor="coach_mail">
                                        Email de l"entraineur :
                                        <span className="asteriskField">
                                            *
                                        </span>
                                        </label>
                                        <input className="form-control requiredField" id="coach_mail" name="Email" type="email" required/>
                                    </div>


                                    <div className="form-group">
                                                                        
                                            <label className="control-label" htmlFor="sport_select">
                                                Sport :
                                                <span className="asteriskField">
                                                    *
                                                </span>
                                            </label>
                                                <select className="select form-control" id="sport_select" name="sport_select">
                                                </select>
                                        </div>

                                        <div className="form-group">
                                                                        
                                            <label className="control-label" htmlFor="teams_multi">
                                                Équipes Disponibles :
                                                <span className="asteriskField">
                                                    *
                                                </span>
                                            </label>

                                                <select multiple className="select multiple form-control" id="teams_multi" name="teams_multi" >
                                                    <option value="A">A</option>
                                                    <option value="AA">AA</option>
                                                    <option value="AAA">AAA</option>
                                                    <option value="recreatif">Récreatif</option>
                                                </select>

                                       { <Select
                                                name="form-field-name"
                                                multi={true}
                                                searchable={true}
                                                options={this.Option}
                                                onChange={this.SelectedTeams}
                                                backspaceRemoves={false}
/>}
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
}*/
