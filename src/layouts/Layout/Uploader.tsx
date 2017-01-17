import * as React from "react";
import * as ReactDOM from "react-dom";

export interface ILayoutProps {
    params: string
}
export interface ILayoutState {
    hasVideo: boolean
}

export default class Layout extends React.Component<ILayoutProps, ILayoutState> {

    constructor(props: any) {
        super(props);
        // Check if a new upload needs to be done
        this.state = {hasVideo: (props.params === 'true')};
        console.log(this.state.hasVideo);
    }

    refs: {
        [string: string]: any;
        file: any;
        dragDropFile: any
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let fileInput =  ReactDOM.findDOMNode(this.refs.file) as HTMLInputElement;
        console.log(fileInput);
    }

    dragLeave(e: React.FormEvent<HTMLDivElement>) {
        e.preventDefault();
        var target = e.target as HTMLDivElement;
        target.className = 'upload-drop-zone';
    }

    dragOver(e: React.FormEvent<HTMLDivElement>) {
        e.preventDefault();
        var target = e.target as HTMLDivElement;
        target.className = 'upload-drop-zone drop';
    }

    onDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        var target = e.target as HTMLDivElement;
        target.className = 'upload-drop-zone';

        var file = e.dataTransfer.files;

        var createForm = document.getElementById("modal") as HTMLDivElement;
        var bkgDiv = document.getElementsByClassName("modal-backdrop")[0] as HTMLDivElement;
        createForm.style.setProperty("z-index", "2");
        createForm.style.setProperty("display", "block");
        bkgDiv.style.setProperty("display", "block");
        bkgDiv.style.setProperty("z-index", "1");
    }

    closeForm(e: React.FormEvent<HTMLButtonElement>) {
        var createForm = document.getElementById("modal") as HTMLDivElement;
        var bkgDiv = document.getElementsByClassName("modal-backdrop")[0] as HTMLDivElement;
        createForm.style.setProperty("z-index", "-1");
        createForm.style.setProperty("display", "none");
        bkgDiv.style.setProperty("display", "none");
        bkgDiv.style.setProperty("z-index", "-1");
    }


    render() {
        var divStyle = {
            display: "none",
        };
        let video = null;
        if (!this.state.hasVideo) {
            video = 
            <div className="relative">
                <video id="video-player" className="video-js" controls preload="auto" poster="//vjs.zencdn.net/v/oceans.png" data-setup='{}'>
                <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source>
                <p className="vjs-no-js">
                    Pour voir cette vidéo veuillez activer JavaScript et considérer mettre
                    à jour vers un navigateur Web
                    <a href="http://videojs.com/html5-video-support/" target="_blank">
                    qui supporte les vidéos HTML5
                    </a>
                </p>
                </video>
            </div>;               
        }
        else {
            video =
            <div>
                <div className="absolute wide">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 absolute">
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

                <div className="modal-dialog relative" id="modal" style={divStyle}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" onClick={ e => this.closeForm(e) } className="close" 
                            data-dismiss="modal">
                                <span aria-hidden="true">&times;</span>
                                <span className="sr-only">Close</span>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">
                                Informations de la vidéo à analyser
                            </h4>
                        </div>
                        
                        <div className="modal-body">
                            <form className="form-horizontal" role="form">
                            <div className="form-group">
                                <label  className="col-sm-2 control-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="email" className="form-control" 
                                    id="inputEmail3" placeholder="Email"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label"
                                    htmlFor="inputPassword3" >Password</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control"
                                        id="inputPassword3" placeholder="Password"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox"/> Remember me
                                    </label>
                                </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                <button type="submit" className="btn btn-default">Sign in</button>
                                </div>
                            </div>
                            </form>
                        </div>
                        
                        <div className="modal-footer">
                            <button type="button" onClick={ e => this.closeForm(e) } className="btn btn-default"
                                    data-dismiss="modal">
                                        Fermer
                            </button>
                            <button type="button" className="btn btn-primary">
                                Sauvegarder
                            </button>
                        </div>
                    </div>
                </div>
                <div className="modal-backdrop fade in" style={divStyle}></div>
        </div>
        }

        return (          
            <div className="column col-sm-12 col-xs-12" id="main">
                {video}
            </div>
        )
    }
}