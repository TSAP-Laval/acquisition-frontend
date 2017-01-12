import * as React from "react";

require('../../sass/Layout.scss');

export interface ILayoutProps {}

export interface ILayoutState {
    title: string
}

export class Layout extends React.Component<ILayoutProps, ILayoutState> {

    constructor() {
        super();
        this.state = {
            title: "TSAP"
        }
    }

    render() {
        return (
            <h1>Hello, World!</h1>
        );
    }
}