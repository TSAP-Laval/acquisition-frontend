import * as React from "react";
import * as  Dropzone from "react-dropzone";

<<<<<<< HEAD
import * as Actions from "../../Uploader/Actions"
=======
import * as Actions from "../../Uploader/actions"
>>>>>>> d315ee2212f360adde47f8d63f8ec6ccfb43164e
import Store from "../../Uploader/uploaderStore"
import Form from "./Form";
import Error from "./Error";

export interface ILayoutProps {}
export interface ILayoutState {
    actions: string[]
    progress: string[]
}

export default class DragDrop extends React.Component<ILayoutProps, ILayoutState> {

    constructor (props: any) {
        super(props);
        // Bind listener
        this._onChange = this._onChange.bind(this);
        this.state = {actions: Store.getActions(), progress: ["0"]};
    }

    componentWillMount(){
        Store.addListener("change", this._onChange);
    }

    componentWillUnmount() {
        Store.removeListener("change", this._onChange);
    }

    _onChange() {
        this.setState({actions: Store.getActions(), progress: Store.getProgress()});
    }

    onDrop(acceptedFiles: Array<File>){
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
        var form = null;
        var error = null;

        var progress = this.state.progress == null ? 0 : this.state.progress;
<<<<<<< HEAD

=======
>>>>>>> d315ee2212f360adde47f8d63f8ec6ccfb43164e
        var dropzone = <Dropzone multiple={false} className="upload-drop-zone" activeClassName="upload-drop-zone drop" 
                        onDrop={ this.onDrop}>
                        <div id="drop-zone">
                            Déposer le fichier ici
                        </div>
                    </Dropzone>

        this.state.actions.forEach(function(element: any) {
            console.log('ELEMENT ' + element);
            switch (element) {
                case "DROP":
                    var style = {width: progress + "%"};
                    dropzone = <div className="progress">
                                    <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style={style}>
                                        <span className="sr-only">{progress}% Complete</span>
                                    </div>
<<<<<<< HEAD
                                    <p> {progress}% Complété</p>
=======
>>>>>>> d315ee2212f360adde47f8d63f8ec6ccfb43164e
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
        });

        return (
            <div className="absolute wide">
                {error}
                {dropzone}
                {form}
            </div>
        );
    }
}