import * as React from "react";
import { Link } from "react-router"

import Header from "../layouts/Header"
import Manager from "../components/Manage/Manage"
import Footer from "../layouts/Footer"
import SideBar from "../layouts/SideBar"

require('../sass/Layout.scss');

export interface ILayoutProps {}
export interface ILayoutState {}

export class Home extends React.Component<ILayoutProps, ILayoutState> {
    render() {
        return (
            <div>
                <Header title="Page d'accueil"/>
                <SideBar />
                <Manager />
                <Footer />
            </div>
        )
    }
}   