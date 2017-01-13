import * as React from "react";

export interface ILayoutProps {}
export interface ILayoutState {}

export default class Title extends React.Component<ILayoutProps, ILayoutState> {
    render() {
        return (
            <h1>Hello, World!!</h1>
        );
    }
}