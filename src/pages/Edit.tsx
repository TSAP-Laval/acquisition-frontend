import * as React from "react";

require('../sass/Layout.scss');

import Header from "../layouts/Header"
import EditTest from "../layouts/Edit"
import VideoPlayer from "../components/VideoPlayer"
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
                    <VideoPlayer
                        url="//vjs.zencdn.net/v/oceans.mp4"
                     />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="wrapper col-xs-12">
                            <span id="rep"></span> 
                            <EditTest />
                           
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}   
