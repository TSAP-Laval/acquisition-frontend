import * as React from "react";
import * as  Dropzone from "react-dropzone";

import * as Actions from "../../Uploader/Actions"
import Store from "../../Uploader/uploaderStore"
import Form from "./Form";

export interface ILayoutProps {}
export interface ILayoutState {
    actions: string[]
}

export default class DragDrop extends React.Component<ILayoutProps, ILayoutState> {

    constructor (props: any) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {actions: []};
    }

    componentWillMount(){
        console.clear();
        console.log("COUNT : " + Store.listenerCount('change'));
        Store.addListener("change", this._onChange);
        console.log("COUNT : " + Store.listenerCount('change'));
    }

    componentWillUnmount() {
        console.clear();
        console.log(Store.listenerCount('change'));
        Store.removeListener("change", this._onChange);
        console.log(Store.listenerCount('change'));
    }

    _onChange() {
        console.log("COUNT : " + Store.listenerCount('change'));
        this.setState({actions: Store.getAll()});
        console.log('State : ' + this.state.actions);
    }

    onDrop(acceptedFiles: File){
        Actions.Add('DROP');
    }
    
    render() {
        var style = {width: "45%"};

        var form = null;

        var dropzone = <Dropzone className="upload-drop-zone" activeClassName="upload-drop-zone drop" 
                        onDrop={ this.onDrop}>
                        <div id="drop-zone">
                            Déposer le fichier ici
                        </div>
                    </Dropzone>

        this.state.actions.forEach(element => {
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
                default:
                    break;
            }
        });

        return (
            <div className="absolute wide">
                {dropzone}
                {form}
            </div>
        );
    }
}