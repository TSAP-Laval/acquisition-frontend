import * as React from "react";

require('../sass/Layout.scss');

import Header   from "../layouts/Header"
import Footer   from "../layouts/Footer"
import Uploader from "../layouts/Uploader"
import SideBar  from "../layouts/SideBar"

export interface ILayoutProps {
    hasVideo: boolean
}
export interface ILayoutState {}

export class Upload extends React.Component<ILayoutProps, ILayoutState> {
    render() {
        return (
            <div className="wrapper absolute">
                <div className="row row-offcanvas row-offcanvas-left">
                    <Header title="Page d'analyse vidéo"/>
                    <SideBar />
                    <Uploader params={ window.location.href.split('is_new=')[1] }/>
                </div>
                <Footer />
            </div>
        )
    }
}   