import * as React from "react";
import * as ReactDOM from "react-dom";
import DragDrop from "../components/Uploader/DragDrop";

export interface ILayoutProps {
    params: string;
}
export interface ILayoutState {
    hasVideo: boolean;
}

export default class Uploader extends React.Component<ILayoutProps, ILayoutState> {

    constructor(props: any) {
        super(props);
        // Check if a new upload needs to be done
        this.state = {hasVideo: (props.params === "true")};
    }


    public render() {
        return (
            <div className="column col-sm-12 col-xs-12" id="main">
                <DragDrop />
            </div>
        );
    }
}
