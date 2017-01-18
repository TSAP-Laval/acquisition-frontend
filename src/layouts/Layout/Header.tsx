import * as React from "react";

import Title from "../Header/Title";
import Navbar from "./Navbar";




export interface ILayoutProps {}
export interface ILayoutState {}

export default class Header extends React.Component<ILayoutProps, ILayoutState> {
    render() {
        return (
            
            <header>
                <Title />
            </header>
        );
    }
}