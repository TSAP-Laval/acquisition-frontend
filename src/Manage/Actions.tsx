import * as React from "react";

import {Button} from "react-bootstrap";

//require("bootstrap-sass/assets/stylesheets/_bootstrap.scss");

export interface ILayoutProps {}
export interface ILayoutState {}


export default class Actions extends React.Component<ILayoutProps, ILayoutState> {
    render() {
        return (

                <div className="bootstrap-iso">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <form method="post" title="Actions :">
                                    <div className="form-group ">
                                        <label className="control-label requiredField" htmlFor="action_name">
                                        Nom de l'action :
                                        <span className="asteriskField">
                                            *
                                        </span>
                                        </label>
                                        <input className="form-control" id="action_name" name="action_name" type="text"/>
                                    </div>
                                    <div className="form-group ">
                                        <label className="control-label " htmlFor="action_desc">
                                        Description :
                                        </label>
                                        <textarea className="form-control" cols={40} id="action_desc" name="action_desc" rows={10}></textarea>
                                    </div>
                                        <div className="form-group ">
                                        <label className="control-label requiredField" htmlFor="mov_type">
                                        Type de mouvement :
                                        <span className="asteriskField">
                                            *
                                        </span>
                                        </label>
                                        <select className="select form-control" id="mov_type" name="mov_type">
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div>
                                        <Button bsStyle="primary">
                                            Submit
                                        </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}