import * as React from "react";

// tslint:disable:no-empty-interface
export interface ILayoutProps {}
export interface ILayoutState {}
// tslint:enable:no-empty-interface

export default class Footer extends React.Component<ILayoutProps, ILayoutState> {
    public render() {
        return (
            <footer>Copyright &copy; TSAP-Acquisition 2017</footer>
        );
    }
}