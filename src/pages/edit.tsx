import * as React from "react";


require('../sass/Layout.scss');

import Header from "../layouts/Layout/Header"
import Footer from "../layouts/Layout/Footer"
import EditTest from "../layouts/Layout/Edit"
import VideoPlayer from "../layouts/layout/VideoPlayer"
import SideBar from "../layouts/Layout/SideBar"

export interface ILayoutProps {}
export interface ILayoutState {}

export class Edit extends React.Component<ILayoutProps, ILayoutState> {
    render() {
        return (
            <div className="wrapper">   
                <div className="video-container">
                    <VideoPlayer />
                </div>
                <h2>Les joueurs de l'équipe</h2>
                 <span id="rep"></span> 
                <EditTest />
                <Footer />
            </div>
        )
    }
}   