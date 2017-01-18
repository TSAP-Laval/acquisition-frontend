import * as React from "react"
import * as VideoPlayerActions from "../Actions/VideoPlayerActions";

export interface ILayoutProps {}
export interface ILayoutState {}

var FontAwesome = require('react-fontawesome');

export default class VideoPlayer extends React.Component<ILayoutProps, ILayoutState> {
    onPlay = () => {
        VideoPlayerActions.videoPlay()
    }

    render() {
        return (
            <button className="video-controls" onClick={this.onPlay.bind()}>
                <FontAwesome id="play-button" />
            </button>
        )
    }
}