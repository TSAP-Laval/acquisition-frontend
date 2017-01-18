import * as React from "react";

export interface ILayoutProps {}
export interface ILayoutState {}

export default class Form extends React.Component<ILayoutProps, ILayoutState> {
    constructor () {
        super();
    }
    
    render() {
        return (
            <div>
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
        );
    }
}