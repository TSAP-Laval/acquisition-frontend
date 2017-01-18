import * as React from "react";

require('../sass/Layout.scss');

import Header from "../layouts/Layout/Header"
import Footer from "../layouts/Layout/Footer"
import Uploader from "../layouts/Layout/Uploader"
import SideBar from "../layouts/Layout/SideBar"
import VideoPlayer from "../layouts/layout/VideoPlayer"

export interface ILayoutProps {
    hasVideo: boolean
}
export interface ILayoutState {}

export class Upload extends React.Component<ILayoutProps, ILayoutState> {

    //      <div className="video-container">
    //         <VideoPlayer />
    //      </div>

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