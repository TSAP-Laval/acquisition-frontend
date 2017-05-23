// tslint:disable:import-spacing
import * as React   from "react";
import { Link }     from "react-router";

import Header   from "../layouts/Header";
import Manager  from "../components/Manage/Manage";
import Footer   from "../layouts/Footer";
import SideBar  from "../layouts/SideBar";
// tslint:enable:import-spacing

import "../sass/Layout.scss";

// tslint:disable:no-empty-interface
export interface ILayoutProps {}
export interface ILayoutState {}
// tslint:enable:no-empty-interface

export class Home extends React.Component<ILayoutProps, ILayoutState> {
    public render() {
        return (
            <div>
                <Header title="Page d'accueil"/>
                <SideBar />
                <Manager />
                <Footer />
            </div>
        );
    }
}
