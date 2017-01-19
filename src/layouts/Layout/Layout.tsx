import * as React from "react";

import Header from "./Header"
import Footer from "./Footer"
import Navbar from "./Navbar"
import Manage from "../../Manage/Manage"

require('../../sass/Layout.scss');

export interface ILayoutProps {}
export interface ILayoutState {}

export class Layout extends React.Component<ILayoutProps, ILayoutState> {
    render() {
        return (
                <div>
                    <Header title="bonjour" />
                    <Manage/>
                    <Footer />
                </div>
        );
    }
}