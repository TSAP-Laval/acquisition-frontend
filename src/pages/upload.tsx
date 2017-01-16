import * as React from "react";

require('../sass/Layout.scss');

import Header from "../layouts/Layout/Header"
import Footer from "../layouts/Layout/Footer"
import Uploader from "../layouts/Layout/Uploader"
import SideBar from "../layouts/Layout/SideBar"

export interface ILayoutProps {}
export interface ILayoutState {}

export class Upload extends React.Component<ILayoutProps, ILayoutState> {
    render() {
        return (
            <div className="wrapper">
                <div className="row row-offcanvas row-offcanvas-left">
                    <Header title="Page d'upload"/>
                    <SideBar />
                    <Uploader />
                </div>
                <Footer />
            </div>
        )
    }
}   