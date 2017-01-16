import * as React from "react";

import Title from "../Header/Title"

export interface ILayoutProps {
    title: string
}
export interface ILayoutState {
    title: string
}

export default class Header extends React.Component<ILayoutProps, ILayoutState> {
    constructor (props: any) {
        super(props);
        console.log(props);
        this.state = { title: this.props.title};
    }

    render() {
        return (
            <header className="page-header">
                <Title title={this.state.title}/>
            </header>
        );
    }
}