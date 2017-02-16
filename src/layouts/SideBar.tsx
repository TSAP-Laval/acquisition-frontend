import * as React from "react";
import { Link } from "react-router"

export interface ILayoutProps {}
export interface ILayoutState {}

export default class SideBar extends React.Component<ILayoutProps, ILayoutState> {
    render() {
        return (
            <div className="column sidebar-offcanvas" id="sidebar">
                <ul className="nav" id="menu">
                    <li>
                        <a href=""><i className="glyphicon glyphicon-home"></i> <span>Accueil</span></a>
                    </li>
                    <li>
                        <Link to="upload"><i className="glyphicon glyphicon-cloud-upload"></i> <span>Upload</span></Link>
                    </li>
                    <li>
                        <Link to="edit"><i className="glyphicon glyphicon-edit"></i> <span>Édition</span></Link>
                    </li>
                    <li>
                        <a href=""><i className="glyphicon glyphicon-cog"></i> <span>Réglages</span></a>
                    </li>
                    <li>
                        <a href=""><i className="glyphicon glyphicon-th"></i> <span>Autre</span></a>
                    </li>
                </ul>
            </div>
        );
    }
}