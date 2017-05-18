// tslint:disable:import-spacing
import * as React from "react";

import {Button, Alert} from "react-bootstrap";

import * as requesthandler from "./RequestHandler";
import actionStore         from "../../stores/ActionsStore";
// tslint:enable:import-spacing

// tslint:disable:no-empty-interface
export interface ILayoutProps {}
export interface ILayoutState {
    controlType?: string;
    movementType?: string;
    description?: string;
}
// tslint:enable:no-empty-interface

export default class Actions extends React.Component<ILayoutProps, ILayoutState> {

    // On conponenent mounting
    public componentWillMount(){
        requesthandler.getActionTypes();

        actionStore.on("change", () => {
        this.listAllActions();
        });
     }

    // Retourne la liste des actions déjà créées duh
    private listAllActions(){
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
        for (let i = 0; i < jsonTab.length; i++)
        {
            const data = jsonTab[i];
            this.addNew(data);
        }
    }

    // Post action
    private submitAction() {
        const text = {
            Acquisition: this.state.controlType,
            Description : this.state.description,
            Separation : this.state.movementType,
        };

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

    // Ajoute une nouvelle ligne contenant les actions ou l"action
    // nouvellement ajoutée.
    private addNew( data: any)
    {
        const doc = document.getElementsByClassName("action_table");
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
        // $("#action_table tbody").append(x);
    }

    private _controlTypeSelected(e: React.SyntheticEvent<HTMLSelectElement>) {
        this.setState({ controlType: e.currentTarget.value });
    }

    private _movementTypeSelected(e: React.SyntheticEvent<HTMLSelectElement>) {
        this.setState({ movementType: e.currentTarget.value });
    }

    private _onDescriptio(e: React.FocusEvent<HTMLTextAreaElement>) {
        this.setState({description: e.currentTarget.value});
    }

    // Previent le submit sur le bouton OK
    private _onKeyPress(event: any) {
        if (event.which === 13 /* Enter */) {
            event.preventDefault();
        }
    }

    public render() {
        // Aucune row trouvée
        const tbody = document.getElementById("action_table").children[1];
        const rowCount = document.getElementById("action_table").children[1].children.length;
        /*const warningTr = "<tr id=\"#noAction\"><td>Aucune action n\"a été trouvée</td></tr>";

        if (rowCount === 0){
            tbody.append(warningTr);
        }*/

        // Ajout d"une nouvelle action
        /*function AddRow(actionDesc: string, separation: string, acquisition: string){
            const trToAdd = "<tr id=\"#action1\"><td>" + String(actionDesc) + "</td><td contenteditable=\"true\">"
                + String(acquisition) + "</td><td>"
                + String(separation) + "</td></tr>";

            let tr = document.createElement("tr");
            tr.id = "action1";

            let td = document.createElement("td");
            td.innerText = actionDesc;

            let td = document.createElement("td");
            td.innerText = acquisition;

            let td = document.createElement("td");
            td.innerText = separation;

            const node = new Node();
            node.ch

            document.getElementById("action_table").children[0].appendChild(trToAdd);

            this.setState({description: ""});
        }*/

        return (
                <div className="container action_page" >
                        <div className="row col-lg-12">
                            <div className="col-md-6 col-sm-6 col-xs-12">

                                <h1>Action types :</h1>

                                <table
                                    className="table table-bordered table-hover striped bordered condensed hover"
                                    id="action_table"
                                >
                                    <thead>
                                        <tr>
                                            <th className="text-center">
                                                Description de l"action
                                            </th>
                                            <th className="text-center">
                                                Type de séparation
                                            </th>
                                            <th className="text-center">
                                                Type d"acquisition
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="table_action" />
                                </table>

                                <form method="post" title="Actions :" id="actionForm">
                                    <div className="form-group ">
                                        <label className="control-label " htmlFor="action_desc">
                                        Description :
                                        </label>
                                        <textarea
                                            className="form-control"
                                            cols={40}
                                            id="action_desc"
                                            name="Description"
                                            rows={10}
                                            onBlur={(e) => this._onDescriptio(e)}
                                        />
                                    </div>
                                        <div className="form-group">
                                        <label className="control-label requiredField" htmlFor="mov_type">
                                        Acquisition :
                                        <span className="asteriskField">
                                            *
                                        </span>
                                        </label>
                                        <select
                                            className="select form-control"
                                            id="acquisition"
                                            name="control_type"
                                            onSelect={(e) => this._controlTypeSelected(e)}
                                        >
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
                                        <select
                                            className="select form-control"
                                            id="separation"
                                            name="mov_type"
                                            onSelect={(e) => this._movementTypeSelected(e)}
                                        >
                                            <option value="se_pos">Positive</option>
                                            <option value="se_neg">Negative</option>
                                            <option value="se_neu">Neutre</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div>
                                        <Button bsStyle="primary" onClick={this.submitAction}>
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
