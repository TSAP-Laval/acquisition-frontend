import * as React from "react";

export interface ILayoutProps {}
export interface ILayoutState {}

export default class Layout extends React.Component<ILayoutProps, ILayoutState> {
    render() {
        return (
            <div className="column col-sm-9 col-xs-11" id="main">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 absolute">
                            <form action='http://localhost.com:3000/receive' method='POST'>
                                <label className="file-upload btn btn-primary btn-file">
                                    Upload 
                                    <input type='file' id="file" name='file' className="upload" />
                                </label>
                            </form>
                        </div>
                        <div className="drag-name">
                            <h4>Or drag and drop files below</h4>
                        </div>
                    </div>
                </div>
                <div className="upload-drop-zone" id="drop-zone">
                    Just drag and drop files here
                </div>
            </div>
        )
    }
}