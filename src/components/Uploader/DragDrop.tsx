import * as React     from "react";
import * as Dropzone  from "react-dropzone";
import * as Actions   from "../../actions/UploadActions"

import Store          from "../../stores/UploaderStore"
import Form           from "./Form";
import Message        from "./Message";
import { IMessages }  from "../../interfaces/interfaces"

export interface ILayoutProps {}
export interface ILayoutState {
    progress: string[]
    message: IMessages
    uploading: boolean
    open_form: boolean
}

export default class DragDrop extends React.Component<ILayoutProps, ILayoutState> {

    constructor (props: any) {
        super(props);
        // Bind listeners
        this._onMessage = this._onMessage.bind(this);

        this._onUploading = this._onUploading.bind(this);
        this._onUploadEnd = this._onUploadEnd.bind(this);

        this._onOpenForm = this._onOpenForm.bind(this);
        this._onCloseForm = this._onCloseForm.bind(this);

        // Get current actions, message and set progress at 0% and uploading at false
        this.state = { 
            progress: ["0"], 
            message: Store.getMessage(), 
            uploading: false, 
            open_form: false 
        };
    }

    componentWillMount(){
        Store.on("message", this._onMessage);

        Store.on("uploading", this._onUploading);
        Store.on("upload_ended", this._onUploadEnd);

        Store.on("open_form", this._onOpenForm);
        Store.on("close_form", this._onCloseForm);
    }

    componentWillUnmount() {
        Store.removeListener("message", this._onMessage);

        Store.removeListener("uploading", this._onUploading);
        Store.removeListener("upload_ended", this._onUploadEnd);

        Store.removeListener("open_form", this._onOpenForm);
        Store.removeListener("close_form", this._onCloseForm);
    }

    _onMessage() {
        this.setState({
            progress: this.state.progress, 
            message: Store.getMessage(),
            uploading: this.state.uploading,
            open_form: this.state.open_form,
        });
    }

    _onUploading() {
        this.setState({
            progress: Store.getProgress(), 
            message: this.state.message,
            uploading: true,
            open_form: this.state.open_form,
        });
    }

    _onUploadEnd() {
        this.setState({
            progress: Store.getProgress(), 
            message: this.state.message,
            uploading: false,
            open_form: this.state.open_form,
        });
    }

    _onOpenForm() {
        this.setState({
            progress: this.state.progress, 
            message: this.state.message,
            uploading: this.state.uploading,
            open_form: true,
        });
    }

    _onCloseForm() {
        this.setState({
            progress: this.state.progress, 
            message: this.state.message,
            uploading: this.state.uploading,
            open_form: false,
        });
    }

    onDrop(acceptedFiles: Array<File>){
        // For the moment we only accept MP4 files
        // TODO : Decide witch formats should be used
        if (acceptedFiles[0].type !== "video/mp4")
            Actions.showMessage("FORMAT", true);
        else if (acceptedFiles.length > 1) 
            Actions.showMessage("TOO_MANY", true);
        else if (acceptedFiles.length < 1) 
            Actions.showMessage("NO_FILE", true);
        else
            Actions.upload(acceptedFiles[0]);
    }
    
    render() {
        var form     =  null;
        var message  =  null;
        var progress =  this.state.progress == null ? 0 : this.state.progress;
        var dropzone =  <Dropzone multiple={false} className="upload-drop-zone" activeClassName="upload-drop-zone drop" 
                            onDrop={ this.onDrop}>
                            <div id="drop-zone">
                                Déposer le fichier ici
                            </div>
                        </Dropzone>

        if (this.state.open_form) {
            form = <Form />
        } 

        if (this.state.uploading) {
            var style = {width: progress + "%"};
            dropzone =  <div className="progress">
                            <div className="progress-bar progress-bar-striped active" 
                                role="progressbar" aria-valuenow="45" aria-valuemin="0" 
                                aria-valuemax="100" style={style}>
                                <span className="sr-only">{progress}% Complete</span>
                            </div>
                            <p> {progress}% Complété</p>
                        </div>;
        }
        
        if (this.state.message != null)
            message = <Message message={this.state.message} />;

        return (
            <div className="absolute wide">
                {message}
                {dropzone}
                {form}
            </div>
        );
    }
}