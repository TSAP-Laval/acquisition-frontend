import * as React from "react";

import "../sass/Layout.scss";

// tslint:disable:import-spacing
import Header   from "../layouts/Header";
import Footer   from "../layouts/Footer";
import Uploader from "../layouts/Uploader";
import SideBar  from "../layouts/SideBar";
// tslint:enable:import-spacing

export interface ILayoutProps {
    hasVideo: boolean;
}
// tslint:disable-next-line:no-empty-interface
export interface ILayoutState {}

export class Upload extends React.Component<ILayoutProps, ILayoutState> {
    public render() {
        return (
            <div className="wrapper absolute">
                <div className="row row-offcanvas row-offcanvas-left">
                    <Header title="Page d'envoie vidéo"/>
                    <SideBar />
                    <Uploader params={ window.location.href.split("is_new=")[1] }/>
                </div>
                <Footer />
            </div>
        );
    }
}
