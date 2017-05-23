// tslint:disable:import-spacing
import * as React   from "react";
import {
    Link,
    browserHistory,
} from "react-router";
import * as Actions from "../actions/AuthActions";
// tslint:enable:import-spacing

// tslint:disable:no-empty-interface
export interface ILayoutProps {}
export interface ILayoutState {}
// tslint:enable:no-empty-interface

export default class SideBar extends React.Component<ILayoutProps, ILayoutState> {
    public constructor() {
        super();

        this._onLogout = this._onLogout.bind(this);
    }

    private _onLogout() {
        Actions.logout();
        browserHistory.push("/");
    }

    public render() {
        return (
            <div className="column sidebar-offcanvas" id="sidebar">
                <ul className="nav" id="menu">
                    <li>
                        <Link to="home">
                            <i className="glyphicon glyphicon-home" />
                            <span>Accueil</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="upload">
                            <i className="glyphicon glyphicon-cloud-upload" />
                            <span>Upload</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="edit">
                            <i className="glyphicon glyphicon-edit" />
                            <span>Édition</span>
                        </Link>
                    </li>
                    <li>
                        <a href="">
                            <i className="glyphicon glyphicon-cog" />
                            <span>Réglages</span>
                        </a>
                    </li>
                    <li>
                        <a href="" onClick={this._onLogout}>
                            <i className="glyphicon glyphicon-log-out" />
                            <span>Quitter</span>
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}
