import * as React from "react";
import { browserHistory } from "react-router";

import "../../sass/Layout.scss";

// tslint:disable:import-spacing
import * as Dropzone    from "react-dropzone";
import * as Actions     from "../../actions/UploadActions";
import Store            from "../../stores/UploaderStore";
import Form             from "./Form";
import Message          from "./Message";
import ConfForm         from "./Confirmation";
import { IMessages }    from "../../interfaces/interfaces";
import { ProgressBar }  from "react-bootstrap";
// tslint:enable:import-spacing

// tslint:disable-next-line:no-empty-interface
export interface ILayoutProps {}
export interface ILayoutState {
    progress?: string[];
    message?: IMessages;
    uploading?: boolean;
    open_form?: boolean;
    openConfirmForm?: boolean;
    saved?: boolean;
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

        this._onOpenConfirmForm = this._onOpenConfirmForm.bind(this);
        this._onCloseConfirmForm = this._onCloseConfirmForm.bind(this);

        this._onSaved = this._onSaved.bind(this);

        // Get current actions, message and set progress at 0% and uploading at false
        this.state = {
            message: Store.getMessage(),
            open_form: false,
            progress: ["0"],
            saved: false,
            uploading: false,
        };
    }

    public componentWillMount(){
        Store.on("message", this._onMessage);

        Store.on("uploading", this._onUploading);
        Store.on("upload_ended", this._onUploadEnd);

        Store.on("open_form", this._onOpenForm);
        Store.on("close_form", this._onCloseForm);

        Store.on("open_confirm_form", this._onOpenConfirmForm);
        Store.on("close_confirm_form", this._onCloseConfirmForm);

        Store.on("saved", this._onSaved);
    }

    public componentWillUnmount() {
        Store.removeListener("message", this._onMessage);

        Store.removeListener("uploading", this._onUploading);
        Store.removeListener("upload_ended", this._onUploadEnd);

        Store.removeListener("open_form", this._onOpenForm);
        Store.removeListener("close_form", this._onCloseForm);

        Store.removeListener("open_confirm_form", this._onOpenConfirmForm);
        Store.removeListener("close_confirm_form", this._onCloseConfirmForm);
    }

    private _onMessage() {
        this.setState({message: Store.getMessage()});
    }

    private _onUploading() {
        this.setState({ progress: Store.getProgress(), uploading: true });
    }

    private _onUploadEnd() {
        if (this.state.saved && Store.getProgress()[0] === "100") {
            browserHistory.push("edit/" + Store.getGameID());
        } else {
            this.setState({ progress: Store.getProgress(), uploading: false });
        }
    }

    private _onOpenForm() {
        this.setState({open_form: true});
    }

    private _onCloseForm() {
        this.setState({open_form: false});
    }

    public _onOpenConfirmForm() {
        this.setState({ openConfirmForm: true });
    }

    public _onCloseConfirmForm() {
        this.setState({ openConfirmForm: false });
    }

    public _onSaved() {
        if (!this.state.uploading && Store.getProgress()[0] === "100") {
            browserHistory.push("edit/" + Store.getGameID());
        } else {
            this.setState({ saved: true });
        }
    }

    public closeForm() {
        Actions.closeForm();
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
        else if (acceptedFiles.length > 10) {
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
        const confForm = this.state.openConfirmForm ? !this.state.open_form ? <ConfForm /> : null : null;
        const progress: number = this.state.progress == null ? 0 : Math.floor(parseFloat(this.state.progress[0]));
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
            dropzone = (
                <div>
                    {/* tslint:disable-next-line:jsx-boolean-value */}
                    <ProgressBar active now={progress} label={`${progress}%`} />
                    <button type="button" onClick={this.closeForm} className="close-upload" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            );
        }

        if (this.state.message != null) {
            message = <Message message={this.state.message} />;
        }

        return (
            <div>
                <div className="absolute wide">
                    {message}
                    {dropzone}
                    {form}
                </div>
                {confForm }
            </div>
        );
    }
}
