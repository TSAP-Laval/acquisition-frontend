import * as React from "react";

export interface ILayoutProps {
    title: string
}
export interface ILayoutState {}

export default class Title extends React.Component<ILayoutProps, ILayoutState> {
    constructor (props: any) {
        super(props);
        this.state = { title: this.props.title };
    }

    render() {
        return (
            <h1>{this.props.title}</h1>
        );
    }
}