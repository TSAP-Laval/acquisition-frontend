import * as React from "react";
import * as $ from "jquery";

import {Button, Alert, Modal} from "react-bootstrap";

export interface ILayoutProps {}
export interface ILayoutState {}

const  BootstrapTable = require('react-bootstrap-table');
const  TableHeaderColumn  = require('react-bootstrap-table');

import CoachStore from "./Stores/CoachStore";

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


        lstCoachs: any = [];

    constructor(){
        super();
        this.lstCoachs = CoachStore.GetAllCoachs();
        this.ListAllCoachs(this.lstCoachs);
    
        }


    ListAllCoachs(lstCoachs:any){

        var dataString = JSON.stringify(lstCoachs);
        var jsonTab = JSON.parse(dataString);

        for(var i= 0; i < jsonTab.length; i++)
        {
            var data = jsonTab[i];
            this.AddNew(data['Nom'],data['Prenom'],data['Email']);
        }   
        
    }


     AddNew(nom:string, prenom:string, email:string)
    {
			  var x = document.createElement("tr");

			  var tdNom = document.createElement("td");
			  tdNom.innerHTML=nom;
              
              var tdPrenom =  document.createElement("td");
			  tdPrenom.innerHTML= prenom;
              
              var tdEmail = document.createElement("td");
			  tdEmail.innerHTML= email;
			  
              x.appendChild(tdNom);
              x.appendChild(tdPrenom);
              x.appendChild(tdEmail);
			  
              console.log(x);
			  
              $('#coach_table tbody').insertAfter(x);
    }



    ShowModal(){
        return modalInstance; 
    }


    render() {


        function SubmitAction(){

            var name = $('#coach_name').val();
            var prenom = $('#coach_prenom').val();
            var mail = $('#coach_mail').val();


            var text = '{'
                +'"Nom" :' + '"' +$('#coach_prenom').val() + '"'+','
                +'"Description" : '+ '"' +$('#coach_name').val() + '"'
                +'"TypeControl" : '+ '"' +$('#coach_mail').val() + '"'
                +'}';


                AddRow(name, prenom, mail);
        }


        function AddRow(coachName:string, coachPrenom:string, coachMail:string){
        
        
         var trToAdd =   "<tr><td>" + String(coachPrenom) + "</td><td contenteditable='true'>" 
                        + String(coachName) + "</td><td contenteditable='true'>" 
                        + String(coachMail) + "</td>"
                        + "<td><a onClick={{this.ShowModal}}><i className='glyphicon glyphicon-edit'></i></td></tr>";

            $('#coach_table tbody').append(trToAdd);
    }


        return (
<div className="container action_page" >
                        <div className="row col-lg-12">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                    <h1>Coachs</h1>
                               <table style={ {width:500}} className="table table-bordered table-hover striped bordered condensed hover" id="coach_table">
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
                                    <tbody className="table_action">
                                        
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

                                <Button bsStyle="primary" onClick={SubmitAction}>
                                            Soumettre
                                </Button>
                            </div>
                        </div>
</div>
        );
    }
}