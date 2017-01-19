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
<<<<<<< HEAD
            <div>
                <Header title="bonjour" />
                <Footer />
            </div>
=======
                <div>
                    <Header />
                    <Manage/>
                    <Footer />
                </div>
>>>>>>> 13b7b752d95074fd6d2a3a54998ea95766383e94
        );
    }
}