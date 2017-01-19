import * as React from "react";
import { Link } from "react-router"

import Header from "../layouts/Layout/Header"
import Footer from "../layouts/Layout/Footer"
import VideoPlayer from "../layouts/layout/VideoPlayer"

require('../sass/Layout.scss');

export interface ILayoutProps {}
export interface ILayoutState {}

export class Home extends React.Component<ILayoutProps, ILayoutState> {
    render() {
        return (
            <div>
                <Header title="Page d'accueil"/>
                <Link to="upload">Upload</Link>
                <Link to="edit">edit</Link>
                <Footer />
            </div>
        )
    }
}   