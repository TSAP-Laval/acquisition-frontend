import * as React from "react";

import Header from "./Header";
import Footer from "./Footer";
import Manage from "../components/Manage/Manage";

import "../sass/layout.scss";

// tslint:disable:no-empty-interface
export interface ILayoutProps {}
export interface ILayoutState {}

export class Layout extends React.Component<ILayoutProps, ILayoutState> {
    public render() {
        return (
            <div>
                <Header title="Bienvenue sur TSAP-Acquisition" />
                <Manage/>
                <Footer />
            </div>
        );
    }
}
