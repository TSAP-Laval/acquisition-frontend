import * as React     from "react";
import * as Dropzone  from "react-dropzone";
import * as Actions   from "./Actions"

import Store          from "./UploaderStore"
import Form           from "./Form";
import Message        from "./Message";

export interface ILayoutProps {}
export interface ILayoutState {
    actions: string[]
    progress: string[]
}

export default class DragDrop extends React.Component<ILayoutProps, ILayoutState> {

    constructor (props: any) {
        super(props);
        // Bind listeners
        this._onChange = this._onChange.bind(this);
        // Get current actions and set progress at 0%
        this.state = { actions: Store.getActions(), progress: ["0"] };
    }

    componentWillMount(){
        Store.addListener("CHANGE", this._onChange);
    }

    componentWillUnmount() {
        Store.removeListener("CHANGE", this._onChange);
    }

    _onChange() {
        this.setState({ actions: Store.getActions(), progress: Store.getProgress() });
    }

    onDrop(acceptedFiles: Array<File>){
        // For the moment we only accept MP4 files
        // TODO : Decide witch formats should be used
        if (acceptedFiles[0].type !== "video/mp4")
            Actions.Add('OPEN_ERROR', null, "FORMAT");
        else if (acceptedFiles.length > 1) 
            Actions.Add('OPEN_ERROR', null, "TOO_MANY");
        else if (acceptedFiles.length < 1) 
            Actions.Add('OPEN_ERROR', null, "NO_FILE");
        else
            Actions.Add('DROP', acceptedFiles[0]);
    }
    
    render() {
        var form =      null;
        var message =   null;
        var progress =  this.state.progress == null ? 0 : this.state.progress;
        var dropzone =  <Dropzone multiple={false} className="upload-drop-zone" activeClassName="upload-drop-zone drop" 
                            onDrop={ this.onDrop}>
                            <div id="drop-zone">
                                Déposer le fichier ici
                            </div>
                        </Dropzone>

        this.state.actions.forEach(function(element: any) {
            switch (element) {
                case "DROP":
                    var style = {width: progress + "%"};
                    dropzone =  <div className="progress">
                                    <div className="progress-bar progress-bar-striped active" 
                                        role="progressbar" aria-valuenow="45" aria-valuemin="0" 
                                        aria-valuemax="100" style={style}>
                                        <span className="sr-only">{progress}% Complete</span>
                                    </div>
                                    <p> {progress}% Complété</p>
                                </div>;
                    break;
                case "OPEN_FORM":
                    form = <Form />
                    break;
                case "MESSAGE":
                    message = <Message />
                    break;
                default:
                    break;
            }
        });
        
        return (
            <div className="absolute wide">
                {message}
                {dropzone}
                {form}
            </div>
        );
    }
}