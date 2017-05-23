// tslint:disable:import-spacing
import * as React from "react";
import {
    ListGroup,
    ListGroupItem,
    Table,
} from "react-bootstrap";
import EditStore from "../stores/EditStore";
import StackStore from "../stores/StackStore";
import * as UploadActions from "../actions/UploadActions";
import * as StackActions from "../actions/StackActions";
// tslint:enable:import-spacing

// tslint:disable:no-empty-interface
export interface ILayoutProps { }
export interface ILayoutState {
    actions: any[];
 }
// tslint:enable:no-empty-interface

export default class Uploader extends React.Component<ILayoutProps, ILayoutState> {

    private gameID: number = 0;

    constructor() {
        super();

        this.onActionAdded = this.onActionAdded.bind(this);
        this.onActionLoaded = this.onActionLoaded.bind(this);
        this.onActionDelete = this.onActionDelete.bind(this);

        this.state = {
            actions: [],
        };
    }

    private componentWillMount() {
        EditStore.on("actionChange", this.onActionAdded);
        EditStore.on("action_loaded", this.onActionLoaded);
        StackStore.on("action_deleted", this.onActionDelete);
    }

    private componentDidMount() {
        const url = window.location.href;
        const res = url.split("/");
        this.gameID = parseInt(res[res.length - 1], 10);

        EditStore.getActionsFromDB(this.gameID);
    }

    private componentWillUnmount() {
        EditStore.removeListener("actionChange", this.onActionAdded);
        EditStore.removeListener("action_loaded", this.onActionLoaded);
        StackStore.removeListener("action_deleted", this.onActionDelete);
    }

    private onActionAdded() {
        EditStore.getActionsFromDB(this.gameID);
    }

    private onActionDelete() {
        EditStore.getActionsFromDB(this.gameID);
    }

    private onActionLoaded() {
        this.setState({ actions: EditStore.GetAllActions() });
    }

    public deleteAction(e: React.MouseEvent<HTMLButtonElement>, index: number) {
        /* TODO : DELETE actions(index) from the store/DB */
        // Actions.closeForm();
        StackActions.deleteAction(index);
    }

    public render() {
        const elements: any[] = [];

        const joueurs = EditStore.GetAllJoueurs() as any[];
        const actions = EditStore.GetAllActionsTypes() as any[];

        for (let index = this.state.actions.length - 1; index >= 0; index--) {
            let joueur: any = joueurs[0];
            joueurs.forEach((j) => {
                if (j.ID === this.state.actions[index].PlayerID) {
                    joueur = j;
                }
            });

            let act: any = actions[0];
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
                        <button
                            type="button"
                            onClick={(e) => this.deleteAction(e, this.state.actions[index].ID)}
                            className="close"
                            aria-label="Close"
                        >
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
