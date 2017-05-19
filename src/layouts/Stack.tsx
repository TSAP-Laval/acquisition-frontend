// tslint:disable:import-spacing
import * as React from "react";
import {
    ListGroup,
    ListGroupItem,
    Table,
} from "react-bootstrap";
import EditStore from "../stores/EditStore";
import * as Actions from "../actions/UploadActions";
// tslint:enable:import-spacing

// tslint:disable:no-empty-interface
export interface ILayoutProps { }
export interface ILayoutState {
    actions: any[];
 }
// tslint:enable:no-empty-interface

export default class Uploader extends React.Component<ILayoutProps, ILayoutState> {

    constructor() {
        super();

        this.onActionAdded = this.onActionAdded.bind(this);

        this.state = {
            actions: [],
        };
    }

    private componentWillMount() {
        EditStore.on("actionChange", this.onActionAdded);
    }

    private componentDidMount() {
        const url = window.location.href;
        const res = url.split("/");
        const gameID = parseInt(res[res.length - 1], 10);

        EditStore.getActionsFromDB(gameID);
    }

    private componentWillUnmount() {
        EditStore.removeListener("actionChange", this.onActionAdded);
    }

    private onActionAdded() {
        this.setState({ actions: EditStore.GetAllActions() });
    }

    public closeForm(index: number) {
        /* TODO : DELETE actions(index) from the store/DB */
        Actions.closeForm();
    }

    public render() {
        const elements: any[] = [];

        const joueurs = EditStore.GetAllJoueurs() as any[];
        const actions = EditStore.GetAllActionsTypes() as any[];

        for (let index = 0; index < this.state.actions.length; index++) {
            let joueur: any;
            joueurs.forEach((j) => {
                if (j.ID === this.state.actions[index].PlayerID) {
                    joueur = j;
                }
            });

            let act: any;
            actions.forEach((a) => {
                if (a.ID === this.state.actions[index].ActionTypeID)  {
                    act = a;
                }
            });

            elements.push(
                <tr>
                    <td>{index + 1}</td>
                    <td>{joueur.Number}</td>
                    <td>{act.Description}</td>
                    <td>
                        <button type="button" onClick={this.closeForm.bind(index)} className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </td>
                </tr>,
            );
        }

        return (
            <div className="stack-container">
                <Table className="stack" striped={true} condensed={true} hover={true}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Joueur</th>
                            <th>Action</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elements}
                    </tbody>
                </Table>
            </div>
        );
    }
}
