import * as React from "react";

export interface ILayoutProps {}
export interface ILayoutState {}

export default class Coachs extends React.Component<ILayoutProps, ILayoutState> {
    render() {
        return (
           <h1>Coachs</h1>
        );
    }
}