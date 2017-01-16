import * as React from "react";

export interface ILayoutProps {}
export interface ILayoutState {}

export default class SideBar extends React.Component<ILayoutProps, ILayoutState> {
    render() {
        return (
            <div className="column col-xs-1 sidebar-offcanvas" id="sidebar">
                <ul className="nav" id="menu">
                    <li><a href=""><i className="glyphicon glyphicon-home"></i> <span>Accueil</span></a></li>
                    <li><a href=""><i className="glyphicon glyphicon-cog"></i> <span>Réglages</span></a></li>
                    <li><a href=""><i className="glyphicon glyphicon-th"></i> <span>Autre</span></a></li>
                </ul>
            </div>
        );
    }
}