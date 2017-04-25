import * as React from "react";

import "../sass/Layout.scss";

// tslint:disable:import-spacing
import Header       from "../layouts/Header";
import EditTest     from "../layouts/Edit";
import VideoPlayer  from "../components/VideoPlayer";
import SideBar      from "../layouts/SideBar";
import Footer       from "../layouts/Footer";
import Stack        from "../layouts/Stack";
// tslint:enable:import-spacing

// tslint:disable:no-empty-interface
export interface ILayoutProps {}
export interface ILayoutState {}
// tslint:enable:no-empty-interface

export class Edit extends React.Component<ILayoutProps, ILayoutState> {
    public  render() {
        const style = { "margin-top" : "25px", "margin-left" : "50px" };
        const stylestack = { "margin-top" : "100px" };
        return (
            <div>
                <div className="video-container">
                    <VideoPlayer
                        url="//vjs.zencdn.net/v/oceans.mp4"
                    />
                </div>
                <SideBar />
                <div style={style}>
                    <div className="row">
                        <div className="wrapper">
                            <div className="column col-sm-8 col-xs-8">
                                <EditTest />
                            </div>
                            <div className="column col-sm-4 col-xs-4" style={stylestack}>
                                <Stack />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
