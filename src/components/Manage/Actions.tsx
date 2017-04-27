import * as React from "react";

import {Button, Alert} from "react-bootstrap";

import * as requesthandler from "./RequestHandler";
import actionStore from "../../stores/ActionsStore";

// tslint:disable-next-line:no-empty-interface
export interface ILayoutProps{}
// tslint:disable-next-line:no-empty-interface
export interface ILayoutState{}

export default class Actions extends React.Component<ILayoutProps, ILayoutState> {


    // On conponenent mounting
   public componentWillMount(){
        requesthandler.getActionTypes();
        actionStore.on("change", () => {
        this.ListAllActions();
        });
     }

    // Retourne la liste des actions déjà créées duh
    public ListAllActions(){

        const table = document.getElementById("table_action");

        if (table !== undefined && table.children.length > 0){
            while (table.hasChildNodes()){
                table.removeChild(table.firstChild);
            }
        }

        const lstActionType = actionStore.getAllActions();
        const dataString = JSON.stringify(lstActionType);
        const jsonTab = JSON.parse(dataString);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < jsonTab.length; i++ )
        {
            const data = jsonTab[i];
            this.AddNew(data);
        }
    }

    // Post action
    public SubmitAction(){

        const Description = document.getElementById("action_desc") as HTMLInputElement;
        const Acquisition = document.getElementById("acquisition") as HTMLSelectElement;
        const Separation = document.getElementById("separation") as HTMLSelectElement;

        const text = "{"
       + '"Description" : ' + '"' + Description.value + '"' + ","
       + '"Acquisition" : ' + '"' + Acquisition.value + '"' + ","
       + '"Separation" : ' + '"' + Separation.value + '"'
       + "}" ;

        requesthandler.postNewActionType(text);
    }

    private typeSepAcq(typeMvm: string)
    {

        let retVal = "";

        if (typeMvm.includes("neg")){
            retVal = "Négative";
        }else if (typeMvm.includes("pos"))  {
             retVal = "Positive";
        }else   {
             retVal = "Neutre";
        }
        return retVal;
    }

    // Ajoute une nouvelle ligne contenant les actions ou l'action
    // nouvellement ajoutée.
    public AddNew(data: any)
    {
        const table = document.getElementById("table_action");
        const x = document.createElement("tr");

        const tdesc =  document.createElement("td");
        tdesc.innerHTML = data.Description;

        const tc = document.createElement("td");
        const typeAcqui = this.typeSepAcq(data.Acquisition);
        tc.innerHTML = typeAcqui;


        const tm =  document.createElement("td");
        const typeSepa = this.typeSepAcq(data.Separation);
        tm.innerHTML = typeSepa;

        x.appendChild(tdesc);
        x.appendChild(tc);
        x.appendChild(tm);
        table.appendChild(x);
    }

    // Previent le submit sur le bouton OK
    public OnKeyPress(event: any) {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
    }
    }


    public render() {


        return (


                <div className="container action_page" >
                        <div className="row col-lg-12">
                            <div className="col-md-6 col-sm-6 col-xs-12">

                                <h1>Action types :</h1>
                                {/*tslint:disable-next-line:max-line-length */}
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
                                    <tbody id="table_action"/>
                                </table>


                                <form method="post" title="Actions :" id="actionForm">
                                    <div className="form-group ">
                                        <label className="control-label " htmlFor="action_desc">
                                        Description :
                                        </label>
                                        {/*tslint:disable-next-line:max-line-length */}
                                        <textarea className="form-control" cols={40} id="action_desc" name="Description" rows={10}/>
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
