import * as React from "react";
import * as $ from "jquery";

import {Button, Alert, Modal} from "react-bootstrap";

import CoachStore from "./Stores/CoachStore";
import * as RequestHandler from "./RequestHandler";

const  BootstrapTable = require('react-bootstrap-table');
const  TableHeaderColumn  = require('react-bootstrap-table');

export interface ILayoutProps {}
export interface ILayoutState {}

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



export default class Coachs extends React.Component<ILayoutProps, ILayoutState> {


    componentWillMount(){
        RequestHandler.GetCoachs();

        CoachStore.on("change", ()=> {
            this.ListAllCoachs();
        })
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
            this.AddNew(data['Nom'],data['Prenom'],data['Email'], data['Equipes']);
        }   
        
    }

    SubmitAction(){


         var teams : any[] = []; 
            $('#teams_multi :selected').each(function(i, selected){ 
            teams[i] = $(selected).text(); 
            });
        
            var jsonTeams = JSON.stringify(teams);

        var text = '{'
                +'"Prenom" :' + '"' +$('#coach_prenom').val() + '"'+','
                +'"Nom" : '+ '"' +$('#coach_name').val() + '"' + ','
                +'"Email" : '+ '"' +$('#coach_mail').val() + '"' 
                //+'"Equipes" : ' + jsonTeams + ','
                +'}';

       RequestHandler.PostCoach(text);
    }


     AddNew(nom:string, prenom:string, email:string, equipe:string[])
    {

              var doc = document.getElementById("coach_tbody");
			  var x = document.createElement("tr");

			  var tdNom = document.createElement("td");
			  tdNom.innerHTML=nom;
              
              var tdPrenom =  document.createElement("td");
			  tdPrenom.innerHTML= prenom;
              
              var tdEmail = document.createElement("td");
			  tdEmail.innerHTML= email;

              var tdTeam = document.createElement("td");
              if(equipe != undefined && equipe.length > 0){
                tdEmail.innerHTML = equipe.join(',');
              }
              x.appendChild(tdNom);
              x.appendChild(tdPrenom);
              x.appendChild(tdEmail);
              x.appendChild(tdTeam);

              console.log(x);
			  
              $('#coach_tbody').append(x);
    }



    ShowModal(){
        return modalInstance; 
    }


    render() {

        function AddRow(coachName:string, coachPrenom:string, coachMail:string){
        
        
        
         var trToAdd =   "<tr><td>" + String(coachPrenom) + "</td><td contenteditable='true'>" 
                        + String(coachName) + "</td><td contenteditable='true'>" 
                        + String(coachMail) + "</td>"
                        + "<td></td></tr>";

                    console.log(trToAdd);
            $('.coach_table tbody').append(trToAdd);

           
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
                                        <input className="form-control requiredField" id="coach_name" name="Nom" type="text" required/>
                                    </div>

                                    <div className="form-group ">
                                        <label className="control-label" htmlFor="coach_prenom">
                                        Prenom de l'entraineur :
                                        <span className="asteriskField">
                                            *
                                        </span>
                                        </label>
                                        <input className="form-control requiredField" id="coach_prenom" name="Prenom" type="text" required/>
                                    </div>

                                    <div className="form-group ">
                                        <label className="control-label" htmlFor="coach_mail">
                                        Email de l'entraineur :
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