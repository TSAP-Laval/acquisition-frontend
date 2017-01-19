import * as React from "react";
import * as  Dropzone from "react-dropzone";

import * as Actions from "../../Uploader/Actions"
import Store from "../../Uploader/uploaderStore"
import Form from "./Form";
import Error from "./Error";

export interface ILayoutProps {}
export interface ILayoutState {
    actions: {[key: string]: string};
}

export default class DragDrop extends React.Component<ILayoutProps, ILayoutState> {

    constructor (props: any) {
        super(props);
        // Bind listener
        this._onChange = this._onChange.bind(this);
        this.state = {actions: Store.getAll()};
    }

    componentWillMount(){
        Store.addListener("change", this._onChange);
    }

    componentWillUnmount() {
        Store.removeListener("change", this._onChange);
    }

    _onChange() {
        console.log("COUNT : " + Store.listenerCount('change'));
        this.setState({actions: Store.getAll()});
        console.log('State : ' + this.state.actions);
    }

    onDrop(acceptedFiles: Array<File>){
        console.log(acceptedFiles);
        if (acceptedFiles[0].type !== "video/mp4")
            Actions.Add('OPEN_ERROR', null, "FORMAT");
        else if (acceptedFiles.length > 1) 
            Actions.Add('OPEN_ERROR', null, "TOO_MANY");
        else if (acceptedFiles.length > 1) 
            Actions.Add('OPEN_ERROR', null, "NO_FILE");
        else
            Actions.Add('DROP', acceptedFiles[0]);
    }
    
    render() {
        var style = {width: "45%"};

        var form = null;
        var error = null;

        var dropzone = <Dropzone multiple={false} className="upload-drop-zone" activeClassName="upload-drop-zone drop" 
                        onDrop={ this.onDrop}>
                        <div id="drop-zone">
                            Déposer le fichier ici
                        </div>
                    </Dropzone>

        for (var element in this.state.actions) {
            console.log('PROGRESS ' + this.state.actions['PROGRESS']);
            console.log('ELEMENTS ' + this.state.actions[element]);
            switch (element) {
                case "DROP":
                    dropzone = <div className="progress">
                                    <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style={style}>
                                        <span className="sr-only">45% Complete</span>
                                    </div>
                                </div>;
                    break;
                case "OPEN_FORM":
                    form = <Form />
                    break;
                case "ERROR":
                    error = <Error />
                    break;
                default:
                    break;
            }
        }

        return (
            <div className="absolute wide">
                {error}
                {dropzone}
                {form}
            </div>
        );
    }
}