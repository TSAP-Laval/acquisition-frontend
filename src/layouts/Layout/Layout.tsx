import * as React from "react";

import Header from "./Header"
import Video from "./Video"
import Footer from "./Footer"

require('../../sass/Layout.scss');

export interface ILayoutProps {}
export interface ILayoutState {}

export class Layout extends React.Component<ILayoutProps, ILayoutState> {
    render() {
        return (
            <div>
                <Header title="bonjour" />
                <Video />
                <Footer />
            </div>
        );
    }
}