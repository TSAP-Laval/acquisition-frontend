import * as React from "react";

// tslint:disable:import-spacing
import * as Dropzone    from "react-dropzone";
import * as Actions     from "../../actions/UploadActions";
import Store            from "../../stores/UploaderStore";
import Form             from "./Form";
import Message          from "./Message";
import { IMessages }    from "../../interfaces/interfaces";
// tslint:enable:import-spacing

// tslint:disable-next-line:no-empty-interface
export interface ILayoutProps {}
export interface ILayoutState {
    progress?: string[];
    message?: IMessages;
    uploading?: boolean;
    open_form?: boolean;
}

export default class DragDrop extends React.Component<ILayoutProps, ILayoutState> {

    constructor(props: any) {
        super(props);
        // Bind listeners
        this._onMessage = this._onMessage.bind(this);

        this._onUploading = this._onUploading.bind(this);
        this._onUploadEnd = this._onUploadEnd.bind(this);

        this._onOpenForm = this._onOpenForm.bind(this);
        this._onCloseForm = this._onCloseForm.bind(this);

        // Get current actions, message and set progress at 0% and uploading at false
        this.state = {
            message: Store.getMessage(),
            open_form: false,
            progress: ["0"],
            uploading: false,
        };
    }

    public componentWillMount(){
        Store.on("message", this._onMessage);

        Store.on("uploading", this._onUploading);
        Store.on("upload_ended", this._onUploadEnd);

        Store.on("open_form", this._onOpenForm);
        Store.on("close_form", this._onCloseForm);
    }

    public componentWillUnmount() {
        Store.removeListener("message", this._onMessage);

        Store.removeListener("uploading", this._onUploading);
        Store.removeListener("upload_ended", this._onUploadEnd);

        Store.removeListener("open_form", this._onOpenForm);
        Store.removeListener("close_form", this._onCloseForm);
    }
    private _onMessage() {
        this.setState({message: Store.getMessage()});
    }

    private _onUploading() {
        this.setState({progress: Store.getProgress()});
        this.setState({uploading: true});
    }

    private _onUploadEnd() {
        this.setState({progress: Store.getProgress()});
        this.setState({uploading: false});
    }

    private _onOpenForm() {
        this.setState({open_form: true});
    }

    private _onCloseForm() {
        this.setState({open_form: false});
    }

    private onDrop(acceptedFiles: File[]){
        let err: boolean = false;
        // We only accept video files
        acceptedFiles.forEach((file) => {
            const regex = new RegExp("video/.*");
            if (!regex.test(file.type.toLowerCase())) {
                err = true;
            }
        });

        if (err) {
            Actions.showMessage("FORMAT", true);
        }
        else if (acceptedFiles.length > 5) {
            Actions.showMessage("TOO_MANY", true);
        }
        else if (acceptedFiles.length < 1) {
            Actions.showMessage("NO_FILE", true);
        }
        else {
            Actions.upload(acceptedFiles);
        }
    }

    public render() {
        let form     =  null;
        let message  =  null;
        const progress =  this.state.progress == null ? 0 : this.state.progress;
        let dropzone = (
                        <Dropzone
                            multiple={true}
                            className="upload-drop-zone"
                            activeClassName="upload-drop-zone drop"
                            onDrop={ this.onDrop}
                            accept="video/*"
                        >
                            <div id="drop-zone">
                                Déposer le(s) fichier(s) ici
                            </div>
                        </Dropzone>);

        if (this.state.open_form) {
            form = <Form />;
        }

        if (this.state.uploading) {
            const style = {width: progress + "%"};
            dropzone = (
                        <div className="progress">
                            <div
                                className="progress-bar progress-bar-striped active"
                                role="progressbar"
                                aria-valuenow="45"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={style}
                            >
                                <span className="sr-only">{progress}% Complete</span>
                            </div>
                            <p> {progress}% Complété</p>
                        </div>);
        }

        if (this.state.message != null) {
            message = <Message message={this.state.message} />;
        }

        return (
            <div className="absolute wide">
                {message}
                {dropzone}
                {form}
            </div>
        );
    }
}
