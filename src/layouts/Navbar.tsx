
import * as React from "react";

export interface ILayoutProps {}
export interface ILayoutState {}

export default class Navbar extends React.Component<ILayoutProps, ILayoutState> {
    render() {
        
        return (
            <div></div>
            /*<SideNav
            title="test"
            items={['Item 1', 'Item 2']}
            />

            <nav className="navbar navbar-default sidebar" role="navigation">
                <div className="container-fluid">
                <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-sidebar-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>      
                </div>
                <div className="collapse navbar-collapse" id="bs-sidebar-navbar-collapse-1">
                <ul className="nav navbar-nav">
                    <li className="active"><a href="#">Ajouter une nouvelle analyse<span  className="pull-right hidden-xs showopacity glyphicon glyphicon-home"></span></a></li>
                    <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">Gestionnaire de saison<span className="caret"></span><span className="pull-right hidden-xs showopacity glyphicon glyphicon-user"></span></a>
                    <ul className="dropdown-menu forAnimate" role="menu">
                        <li><a>Saison</a></li>
                        <li><a href="#">Équipes</a></li>
                        <li><a href="#">Joueurs</a></li>
                        <li><a href="#">Entraineurs</a></li>
                        <li><a href="#">Actions</a></li>
                    </ul>
                    </li>          
                    <li ><a href="#">Paramètres<span className="pull-right hidden-xs showopacity glyphicon glyphicon-th-list"></span></a></li>        
                </ul>
                </div>
            </div>
            </nav>*/
        );
    }
}
