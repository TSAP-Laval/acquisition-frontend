import * as React from "react";
import * as Actions from "../../Uploader/Actions"
import Store from "../../Uploader/uploaderStore"

export interface ILayoutProps {}
export interface ILayoutState {
    actions: String[]
}

export default class DragDrop extends React.Component<ILayoutProps, ILayoutState> {

    actions: String[];

    constructor () {
        super();
        this.state = {actions: []};
    }

    addAction(e:MouseEvent){
        Actions.DragOver();
    }

    componentWillMount(){
        Store.on("change", () => {
            this.state = {actions: Store.getAll()};
        })
    }
    
    render() {

        this.state.actions.forEach(element => {
            switch (element) {
                case "drag":
                    
                    break;
                case "drop":
                    
                    break;
                default:
                    break;
            }
        });

        return (
            <div className="absolute wide">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 absolute" onDrag={this.addAction.bind(this)}>
                            <form ref="uploadForm" action='http://localhost.com:3000/' method='GET' 
                            onDrag={ e => this.handleSubmit(e) }
                            onSubmit={ e => this.handleSubmit(e) } encType="multipart/form-data">
                                <label className="file-upload btn btn-primary btn-file">
                                    Envoyer 
                                    <input ref="file" type='file' id="file" name='file' className="upload" />
                                </label>
                            </form>
                        </div>
                        <div className="drag-name">
                            <h4>Ou glisser le fichier ci-dessous</h4>
                        </div>
                    </div>
                </div>
                <div ref="dragDropFile" className="upload-drop-zone" id="drop-zone" onDrop={ e => this.onDrop(e)} 
                onDragOver={ e => this.dragOver(e) } onDragLeave={ e => this.dragLeave(e) }>
                    Déposer le fichier ici
                </div>
            </div>
        );
    }
}