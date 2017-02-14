import * as React from "react";

export interface ILayoutProps {}
export interface ILayoutState {}

export default class Footer extends React.Component<ILayoutProps, ILayoutState> {
    render() {
        return (
            <footer>Copyright &copy; TSAP-Acquisition 2017</footer>
        );
    }
}