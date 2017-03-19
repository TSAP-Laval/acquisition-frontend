import * as React     from "react";
import * as Dropzone  from "react-dropzone";
import * as Actions   from "../../actions/UploadActions"

import Store          from "../../stores/UploaderStore"
import Form           from "./Form";
import Message        from "./Message";
import { IMessages }  from "../../interfaces/interfaces"

export interface ILayoutProps {}
export interface ILayoutState {
    progress?: string[]
    message?: IMessages
    uploading?: boolean
    open_form?: boolean
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
            open_form: false, 
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

    shouldComponentUpdate(nextState: ILayoutState) {
        this.setState(nextState);
        return true;
    }

    _onMessage() {
        this.state.message = Store.getMessage();
        this.shouldComponentUpdate(this.state);
    }

    _onUploading() {
        this.state.uploading = true;
        this.state.progress = Store.getProgress();

        this.shouldComponentUpdate(this.state);
    }

    _onUploadEnd() {
        this.state.progress = Store.getProgress();
        this.state.uploading = false;

        this.shouldComponentUpdate(this.state);
    }

    _onOpenForm() {
        this.state.open_form = true;
        this.shouldComponentUpdate(this.state);
    }

    _onCloseForm() {
        this.state.open_form = false;
        this.shouldComponentUpdate(this.state);
    }

    onDrop(acceptedFiles: Array<File>){
        // For the moment we only accept MP4 files
        // TODO : Decide witch formats should be used
        acceptedFiles.forEach(file => {
            if (file.type !== "video/mp4")
                Actions.showMessage("FORMAT", true);
        });
        
        if (acceptedFiles.length > 5) 
            Actions.showMessage("TOO_MANY", true);
        else if (acceptedFiles.length < 1) 
            Actions.showMessage("NO_FILE", true);
        else
            Actions.upload(acceptedFiles);
    }
    
    render() {
        let form     =  null;
        let message  =  null;
        let progress =  this.state.progress == null ? 0 : this.state.progress;
        let dropzone =  <Dropzone multiple={true} className="upload-drop-zone" activeClassName="upload-drop-zone drop" 
                            onDrop={ this.onDrop}>
                            <div id="drop-zone">
                                Déposer le(s) fichier(s) ici
                            </div>
                        </Dropzone>

        if (this.state.open_form) {
            form = <Form />
        } 

        if (this.state.uploading) {
            let style = {width: progress + "%"};
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