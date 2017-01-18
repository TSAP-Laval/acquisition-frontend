import * as React from "react";
import * as  Dropzone from "react-dropzone";

import * as Actions from "../../Uploader/Actions"
import Store from "../../Uploader/uploaderStore"

export interface ILayoutProps {}
export interface ILayoutState {
    actions: string[]
}

export default class DragDrop extends React.Component<ILayoutProps, ILayoutState> {

    constructor (props: any) {
        super(props);
        this.state = {actions: []};
    }

    onDrop(acceptedFiles: File){
        console.clear();
        console.log(acceptedFiles);
        Actions.Add('drop');
    }

    componentWillMount(){
        Store.on("change", () => {
            this.setState({actions: Store.getAll()});
            console.log(this.state.actions);
        })
    }
    
    render() {
        var style = {width: "45%"};

        var dropzone = <Dropzone className="upload-drop-zone" activeClassName="upload-drop-zone drop" onDrop={ this.onDrop}>
                        <div id="drop-zone">
                            Déposer le fichier ici
                        </div>
                    </Dropzone>

        this.state.actions.forEach(element => {
            switch (element) {
                case "dragenter":
                    break;
                case "drop":
                    dropzone = <div className="progress">
                                    <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style={style}>
                                        <span className="sr-only">45% Complete</span>
                                    </div>
                                </div>;
                    break;
                default:
                    break;
            }
        });

        return (
            <div className="absolute wide">
                {dropzone}
            </div>
        );
    }
}