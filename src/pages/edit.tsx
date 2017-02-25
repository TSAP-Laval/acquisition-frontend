import * as React from "react";


require('../sass/Layout.scss');

import Header from "../layouts/Header"
  //import Footer from "../layouts/Footer"
import EditTest from "../layouts/Edit"
import VideoPlayer from "../layouts/VideoPlayer"
import SideBar from "../layouts/SideBar"
import Footer from "../layouts/Footer"
export interface ILayoutProps {}
export interface ILayoutState {}

export class Edit extends React.Component<ILayoutProps, ILayoutState> {
    render() {
        return (
            <div>
                <SideBar />
                <div className="video-container">
                    <VideoPlayer />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="wrapper col-xs-12">   
                            <h2>Les joueurs de l'équipe</h2>
                            <span id="rep"></span> 
                            <EditTest />
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}   