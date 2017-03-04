import * as React from "react";

import {Button, Alert}     from "react-bootstrap";
import * as $              from "jquery";
import * as requesthandler from '../components/Manage/RequestHandler';
import actionStore         from '../stores/ActionsStore';
import { serverURL }       from 'config'

const  BootstrapTable     = require('react-bootstrap-table');
const  TableHeaderColumn  = require('react-bootstrap-table');

export interface ILayoutProps {}
export interface ILayoutState {}


export default class Actions extends React.Component<ILayoutProps, ILayoutState> {
    
    componentWillMount() {
        requesthandler.getActionTypes();

        actionStore.on("change",() =>{
        this.ListAllActions();
        });
    }

    ListAllActions() {

        var table = document.getElementById('table_action');
        
        if(table != undefined && table.children.length > 0){
            while(table.hasChildNodes()){
                table.removeChild(table.firstChild);
            }
        }

        var lstActionType = actionStore.getAllActions();
        var dataString = JSON.stringify(lstActionType);
        var jsonTab = JSON.parse(dataString);
        
        for(var i= 0; i < jsonTab.length; i++)
        {
            var data = jsonTab[i];
            this.AddNew(data);
        }
    }
    
    SubmitAction() {
        var text = '{'
       +'"Nom" :' + '"' +$('#action_name').val() + '"'+','
       +'"Description" : '+ '"' +$('#action_desc').val() + '"' + ','
       +'"TypeControl" : '+ '"' +$('#control_type').val() + '"' + ','
       +'"TypeMouvement" : '+ '"' +$('#mov_type').val() + '"'
       +'}';
       
       alert("Ajout Réussi");

       requesthandler.postNewActionType(text);
    }

    AddNew(data:any) {
            var doc = document.getElementsByClassName("action_table");
			  var x = document.createElement("tr");
			  
			  var tnom = document.createElement("td");
			  tnom.innerHTML=data['Nom'];
              var tdesc =  document.createElement("td");
			  tdesc.innerHTML= data['Description']
              var tc = document.createElement("td");
			  tc.innerHTML=data['TypeControl']
              var tm =  document.createElement("td");
			  tm.innerHTML= data['TypeMouvement']
			  x.appendChild(tnom);
              x.appendChild(tdesc);
              x.appendChild(tc);
              x.appendChild(tm);
			  console.log(x);
			  $('#action_table tbody').append(x);
    }
    
    
    OnKeyPress(event:any) {
        if (event.which === 13 /* Enter */) {
        event.preventDefault();
        }
    }

    render() {
        
        function Reussi() {
            alert("Ajout réussi")
        }


        function SubmitAction() {
            var http = new XMLHttpRequest();
            var url = serverURL + "/PostActionType";

         
            var text = '{'
                +'"Nom" :' + '"' +$('#action_name').val() + '"'+','
                +'"Description" : '+ '"' +$('#action_desc').val() + '"' + ','
                +'"TypeControl" : '+ '"' +$('#control_type').val() + '"' + ','
                +'"TypeMouvement" : '+ '"' +$('#mov_type').val() + '"'
                +'}';

            var stringg = JSON.stringify(text);

            http.open('POST', url, true);

            http.setRequestHeader("Content-type", "application/json");

            http.onreadystatechange = function() {//Call a function when the state changes.
                if(http.readyState == 4) {
                    console.log("test");
                
                    
                    console.log("response text : " +http.responseText);
                    console.log("response" + http.getResponseHeader);
                    console.log("response :" + http.response);
                    console.log("response :" + http.responseURL);
                }else{
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                }
            }
            
            http.send(stringg);

            requesthandler.postNewActionType(text);
            
            AddRow(String($('#action_name').val()), String($('#action_desc').val()),String($('#control_type option:selected').text()), String($('#mov_type option:selected').text()) );

            $('#action_name').val('');
            $('#action_desc').val('');
        }

        $(function() {
            var $tbody = $('#action_table tbody');
            var $rowCount = $('#action_table tr').length;
            var warningTr =   "<tr id='noAction'><td>Aucune action n'a été trouvée</td></tr>"
            var idWarning = $('#noAction');

            if($rowCount== 0) {

                $tbody.append(warningTr);
            }else {
                $tbody.remove('#noAction');
            }
        });


        function AddRow(actionName:string, actionDesc:string, controlType:string, movType:string){
            var trToAdd =   "<tr id='action1'><td>" + String(actionName) + "</td><td contenteditable='true'>" 
                        + String(actionDesc) + "</td><td>" 
                        + String(controlType) + "</td><td>" 
                        + String(movType) + "</td></tr>";

            $('#action_table tbody').append(trToAdd)
        }

        return (

                <div className="container action_page" >
                        <div className="row col-lg-12">
                            <div className="col-md-6 col-sm-6 col-xs-12">

                                <h1>Action types :</h1>

                                <table className="table table-bordered table-hover striped bordered condensed hover" id="action_table">
                                    <thead>
                                        <tr >
                                            <th className="text-center">
                                                Nom
                                            </th>
                                            <th className="text-center">
                                                Description
                                            </th>
                                            <th className="text-center">
                                                Type de contrôle
                                            </th>
                                            <th className="text-center">
                                                Type de mouvement
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="table_action">
                                        
                                    </tbody>
                                </table>


                                <form method="post" title="Actions :" id="actionForm">
                                    <div className="form-group ">
                                        <label className="control-label requiredField" htmlFor="action_name">
                                        Nom de l'action :
                                        <span className="asteriskField">
                                            *
                                        </span>
                                        </label>
                                        <input className="form-control requiredField" id="action_name" name="Nom" type="text" required/>
                                    </div>
                                    <div className="form-group ">
                                        <label className="control-label " htmlFor="action_desc">
                                        Description :
                                        </label>
                                        <textarea className="form-control" cols={40} id="action_desc" name="Description" rows={10}></textarea>
                                    </div>
                                        <div className="form-group">
                                        
                                        <label className="control-label requiredField" htmlFor="mov_type">
                                        Type de contrôle :
                                        <span className="asteriskField">
                                            *
                                        </span>
                                        </label>
                                        <select className="select form-control" id="control_type" name="control_type">
                                            <option value="Acquisition">Acquisition</option>
                                            <option value="Separation">Séparation</option>
                                        </select>

                                        </div>


                                        <div className="form-group ">
                                        <label className="control-label requiredField" htmlFor="mov_type">
                                        Type de mouvement :
                                        <span className="asteriskField">
                                            *
                                        </span>
                                        </label>
                                        <select className="select form-control" id="mov_type" name="mov_type">
                                            <option value="Positive">Positive</option>
                                            <option value="Negative">Negative</option>
                                            <option value="Neutre">Neutre</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div>
                                        <Button bsStyle="primary" onClick={this.SubmitAction}>
                                            Submit
                                        </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
        );
    }
}
