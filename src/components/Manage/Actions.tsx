import * as React from "react";

import {Button, Alert} from "react-bootstrap";
import * as $ from "jquery";

import * as requesthandler from './RequestHandler';
import actionStore from '../../stores/ActionsStore';


export interface ILayoutProps {}
export interface ILayoutState {}


export default class Actions extends React.Component<ILayoutProps, ILayoutState> {
    



    //On conponenent mounting 
    componentWillMount(){
        requesthandler.getActionTypes();

        actionStore.on("change",() =>{
        this.ListAllActions();
        });
     }
     
    //Retourne la liste des actions déjà créées duh
    ListAllActions(){

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
    
    //Post action 
    SubmitAction(){

        var text = '{'
       +'"Description" : '+ '"' +$('#action_desc').val() + '"' + ','
       +'"Acquisition" : '+ '"' +$('#acquisition').val() + '"' + ','
       +'"Separation" : '+ '"' +$('#separation').val() + '"'
       +'}';
       
       alert("Ajout Réussi");

       requesthandler.postNewActionType(text);
    }

    typeSepAcq(typeMvm:string)
    {

        var retVal = "";

        if(typeMvm.includes("neg")){
            retVal = "Négative";
        }else if(typeMvm.includes("pos"))  {
             retVal = "Positive";
        }else   {
             retVal = "Neutre";
        }
        return retVal;
    }

    //Ajoute une nouvelle ligne contenant les actions ou l'action 
    //nouvellement ajoutée.
    AddNew(data:any)
    {
            var doc = document.getElementsByClassName("action_table");
			  var x = document.createElement("tr");

              var tdesc =  document.createElement("td");
			  tdesc.innerHTML= data['Description']

              var tc = document.createElement("td");
              var typeAcqui = this.typeSepAcq(data['Acquisition']);
			  tc.innerHTML= typeAcqui;


              var tm =  document.createElement("td");
              var typeSepa = this.typeSepAcq(data['Separation']);
			  tm.innerHTML= typeSepa;

              x.appendChild(tdesc);
              x.appendChild(tc);
              x.appendChild(tm);
			  console.log(x);
			  $('#action_table tbody').append(x);
    }
    
    
    //Previent le submit sur le bouton OK
    OnKeyPress(event:any) {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
    }
    }


    render() {
        


//Aucune row trouvée
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


    //Ajout d'une nouvelle action
    function AddRow( actionDesc:string, separation:string, acquisition:string){
        
        
         var trToAdd =   "<tr id='action1'><td>" + String(actionDesc) + "</td><td contenteditable='true'>" 
                        + String(acquisition) + "</td><td>" 
                        + String(separation) + "</td></tr>";

            $('#action_table tbody').append(trToAdd)

            $('#action_desc').val("");
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
                                                Description de l'action 
                                            </th>
                                            <th className="text-center">
                                                Type de séparation
                                            </th>
                                            <th className="text-center">
                                                Type d'acquisition 
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="table_action">
                                        
                                    </tbody>
                                </table>


                                <form method="post" title="Actions :" id="actionForm">
                                    <div className="form-group ">
                                        <label className="control-label " htmlFor="action_desc">
                                        Description :
                                        </label>
                                        <textarea className="form-control" cols={40} id="action_desc" name="Description" rows={10}></textarea>
                                    </div>
                                        <div className="form-group">
                                        
                                        <label className="control-label requiredField" htmlFor="mov_type">
                                        Acquisition :
                                        <span className="asteriskField">
                                            *
                                        </span>
                                        </label>
                                        <select className="select form-control" id="acquisition" name="control_type">
                                            <option value="ac_pos">Positive</option>
                                            <option value="ac_neg">Negative</option>
                                            <option value="ac_neu">Neutre</option>
                                        </select>

                                        </div>


                                        <div className="form-group ">
                                        <label className="control-label requiredField" htmlFor="mov_type">
                                        Séparation :
                                        <span className="asteriskField">
                                            *
                                        </span>
                                        </label>
                                        <select className="select form-control" id="separation" name="mov_type">
                                            <option value="se_pos">Positive</option>
                                            <option value="se_neg">Negative</option>
                                            <option value="se_neu">Neutre</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div>
                                        <Button bsStyle="primary" onClick={this.SubmitAction}>
                                            Ajouter
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
