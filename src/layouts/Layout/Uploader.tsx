import * as React from "react";

export interface ILayoutProps {
    params: string
}
export interface ILayoutState {
    hasVideo: boolean
}

export default class Layout extends React.Component<ILayoutProps, ILayoutState> {

    constructor(props: any) {
        super(props);
        this.state = {hasVideo: (props.params === 'true')};
        console.log(this.state.hasVideo);
    }

    render() {
        let video = null;
        if (!this.state.hasVideo) {
            video = 
            <div>
                <video
                    id="video-player"
                    className="video-js"
                    controls
                    preload="auto"
                    poster="//vjs.zencdn.net/v/oceans.png"
                    data-setup='{}'>
                <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source>
                <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"></source>
                <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"></source>
                <p className="vjs-no-js">
                    To view this video please enable JavaScript, and consider upgrading to a
                    web browser that
                    <a href="http://videojs.com/html5-video-support/" target="_blank">
                    supports HTML5 video
                    </a>
                </p>
                </video>
            </div>;               
        }
        else {
            video =
            <div>
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
                    <p>Just drag and drop files here</p>
                </div>
            </div>;
        }

        return (            
            <div className="column col-sm-12 col-xs-12" id="main">
                {video}
            </div>
        )
    }
}