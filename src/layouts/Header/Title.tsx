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
<<<<<<< HEAD
            <h1>{this.props.title}</h1>
=======
            <h1>TSAP-Acquisition</h1>
>>>>>>> 13b7b752d95074fd6d2a3a54998ea95766383e94
        );
    }
}