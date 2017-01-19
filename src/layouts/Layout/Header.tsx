import * as React from "react";

import Title from "../Header/Title";
import Navbar from "./Navbar";




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
<<<<<<< HEAD
            <header className="page-header">
                <Title title={this.state.title}/>
=======
            
            <header>
                <Title />
>>>>>>> 13b7b752d95074fd6d2a3a54998ea95766383e94
            </header>
        );
    }
}