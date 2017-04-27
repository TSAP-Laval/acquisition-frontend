// tslint:disable:import-spacing
import * as React from "react";
import {
    ListGroup,
    ListGroupItem,
    Table,
} from "react-bootstrap";
import ActionsStore from "../stores/ActionsStore";
import * as Actions from "../actions/UploadActions";
// tslint:enable:import-spacing

// tslint:disable:no-empty-interface
export interface ILayoutProps { }
export interface ILayoutState { }
// tslint:enable:no-empty-interface

export default class Uploader extends React.Component<ILayoutProps, ILayoutState> {

    constructor() {
        super();
    }

    public closeForm(index: number) {
        /* TODO : DELETE actions(index) from the store/DB */
        Actions.closeForm();
    }

    public render() {
        const elements: any[] = [];
        for (let index = 1; index < 200; index++) {
            elements.push(
                <tr>
                    <td>{index}</td>
                    <td>Mark</td>
                    <td>@mdo</td>
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
