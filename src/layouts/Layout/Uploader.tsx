import * as React from "react";
import * as ReactDOM from "react-dom";
import DragDrop from "../Uploader/DragDrop";
import Form from "../Uploader/Form";

export interface ILayoutProps {
    params: string
}
export interface ILayoutState {
    hasVideo: boolean
}

export default class Uploader extends React.Component<ILayoutProps, ILayoutState> {

    constructor(props: any) {
        super(props);
        // Check if a new upload needs to be done
        this.state = {hasVideo: (props.params === 'true')};
        console.log(this.state.hasVideo);
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    dragLeave(e: React.FormEvent<HTMLDivElement>) {
        e.preventDefault();
        var target = e.target as HTMLDivElement;
        target.className = 'upload-drop-zone';
    }

    dragOver(e: React.FormEvent<HTMLDivElement>) {
        e.preventDefault();
        var target = e.target as HTMLDivElement;
        target.className = 'upload-drop-zone drop';
    }

    onDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        var target = e.target as HTMLDivElement;
        target.className = 'upload-drop-zone';

        var file = e.dataTransfer.files;

        var createForm = document.getElementById("modal") as HTMLDivElement;
        var bkgDiv = document.getElementsByClassName("modal-backdrop")[0] as HTMLDivElement;
        createForm.style.setProperty("z-index", "2");
        createForm.style.setProperty("display", "block");
        bkgDiv.style.setProperty("display", "block");
        bkgDiv.style.setProperty("z-index", "1");
    }

    closeForm(e: React.FormEvent<HTMLButtonElement>) {
        var createForm = document.getElementById("modal") as HTMLDivElement;
        var bkgDiv = document.getElementsByClassName("modal-backdrop")[0] as HTMLDivElement;
        createForm.style.setProperty("z-index", "-1");
        createForm.style.setProperty("display", "none");
        bkgDiv.style.setProperty("display", "none");
        bkgDiv.style.setProperty("z-index", "-1");
    }


    render() {
        var divStyle = {
            display: "none",
        };

        return (          
            <div className="column col-sm-12 col-xs-12" id="main">
                {DragDrop}
                {Form}
            </div>
        );
    }
}