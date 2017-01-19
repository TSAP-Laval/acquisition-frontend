import * as React from "react";


require('../sass/Layout.scss');

import Header from "../layouts/Layout/Header"
import Footer from "../layouts/Layout/Footer"
import EditTest from "../layouts/Layout/Edit"
import SideBar from "../layouts/Layout/SideBar"

export interface ILayoutProps {}
export interface ILayoutState {}

export class Edit extends React.Component<ILayoutProps, ILayoutState> {
    render() {
        return (
            <div className="wrapper">   
                <h2>Les joueurs de l'équipe</h2>
                 <span id="rep"></span> 
                <EditTest />
                <Footer />
            </div>
        )
    }
}   