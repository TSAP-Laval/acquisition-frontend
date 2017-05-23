import * as React from "react";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

// tslint:disable:no-empty-interface
export interface ILayoutProps {}
export interface ILayoutState {}

export class Layout extends React.Component<ILayoutProps, ILayoutState> {
    constructor() {
        super();
    }

    public render() {
        return (
                <div>
                    {this.props.children}
                </div>
        );
    }
}
