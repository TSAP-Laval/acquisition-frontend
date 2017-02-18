import * as React from "react";

import {Button, Alert} from "react-bootstrap";
import * as $ from "jquery";

var ReactDataGrid = require('react-data-grid/addons');

export interface ILayoutProps {}
export interface ILayoutState {}


export default class Actions extends React.Component<ILayoutProps, ILayoutState> {
    render() {
        
        function Reussi() {
            alert("Ajout réussi")
        }

        $(function() {
            var table = $('#action_table');
            var http = new XMLHttpRequest();
            var url = "http://localhost:3000/api/GetActionType";
            http.open("GET", url, true);
            http.setRequestHeader('Content-type', 'application/json');
            http.send(null);
            http.onreadystatechange = function() {
                if (http.readyState === 4) {
                var data = JSON.parse(http.responseText);
                        console.log(data);
                    for(var i = 0; i < data.length; i++){
                        var objAction = data[i];

                    AddNewRow(String(objAction.Nom), String(objAction.Description));
                    }
                }
            }
        });

      function SubmitAction(){
       
         
        var text = '{'
       +'"Nom" :' + '"' +$('#action_name').val() + '"'+','
       +'"Description" : '+ '"' +$('#action_desc').val() + '"'
       +'}';
var xmlhttp = new XMLHttpRequest();
     
  xmlhttp.open('POST', 'http://localhost:3000/api/PostActionType', true);
  xmlhttp.setRequestHeader('Content-type', 'application/json');
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4) {
       var response = xmlhttp.responseText;
       console.log(response)
    }
   
  };
  xmlhttp.send(text);
    AddNewRow(String($('#action_name').val()), String($('#action_desc').val()));

    $('#action_name').val('');
    $('#action_desc').val('');

$(function(){
    var $tbody = $('#action_table tbody');
    var $rowCount = $('#action_table tr').length;
    var warningTr =   "<tr id='noAction'><td>Aucune action n'a été trouvée</td></tr>"
    var idWarning = $('#noAction');

    if($rowCount== 0){

        $tbody.append(warningTr);
    }else{
        $tbody.remove('#noAction');
    }
});

}

        
    function AddNewRow(actionName:string, actionDesc:string){
        
        
         var trToAdd =   "<tr id='action1'><td>" + String(actionName) + "</td><td contenteditable='true'>" 
                        + String(actionDesc) + "</td></tr>";


            $('#action_table tbody').append(trToAdd)
    }




    function AddRow(actionName:string, actionDesc:string, controlType:string, movType:string){
        
        
         var trToAdd =   "<tr id='action1'><td>" + String(actionName) + "</td><td contenteditable='true'>" 
                        + String(actionDesc) + "</td><td contenteditable='true'>" 
                        + String(controlType) + "</td><td contenteditable='true'>" 
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
                                    <tbody className="table_action">
                                        
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
                                        <input className="form-control" id="action_name" name="Nom" type="text"/>
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
                                            <option value="acquisition">Acquisition</option>
                                            <option value="separation">Séparation</option>
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
                                            <option value="pos">Positive</option>
                                            <option value="neg">Negative</option>
                                            <option value="null">Neutre</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div>
                                        <Button bsStyle="primary" onClick={SubmitAction}>
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
