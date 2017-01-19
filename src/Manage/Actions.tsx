import * as React from "react";

import {Button, Alert} from "react-bootstrap";
import * as $ from "jquery"
//require("bootstrap-sass/assets/stylesheets/_bootstrap.scss");

export interface ILayoutProps {}
export interface ILayoutState {}


export default class Actions extends React.Component<ILayoutProps, ILayoutState> {
    render() {
        
        function Reussi() {
            alert("Ajout réussi")
        }


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

      }
        

        return (
                    

                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-sm-6 col-xs-12">

                                <h1>Action types :</h1>

                                <table className="table table-bordered table-hover" id="action_table">
                                    <thead>
                                        <tr >
                                            <th className="text-center">
                                                Nom
                                            </th>
                                            <th className="text-center">
                                                Description
                                            </th>
                                            <th className="text-center">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr id='action1'>
                                            <td>
                                                Passe
                                            </td>
                                            <td>
                                                Une belle passe
                                            </td>
                                            <td>
                                            <button className="btn btn-default btn-warning">Modifier</button>
                                            <button className="btn btn-danger btn-default">Supprimer</button>
                                            </td>
                                        </tr>
                                        <tr id='addr1'></tr>
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
                                        <div className="form-group ">
                                        <label className="control-label requiredField" htmlFor="mov_type">
                                        Type de mouvement :
                                        <span className="asteriskField">
                                            *
                                        </span>
                                        </label>
                                        <select className="select form-control" id="mov_type" name="mov_type">
                                            <option value="Defensive"></option>
                                            <option value="Offensive"></option>
                                            <option value="Neutre"></option>
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
