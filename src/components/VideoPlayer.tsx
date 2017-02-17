import * as React from "react";
import * as Actions from "../actions/VideoPlayerActions";
import Store from "../stores/VideoPlayerStore";

export interface ILayoutProps {}
export interface ILayoutState {
    playing: boolean,
}

export default class VideoPlayer extends React.Component<ILayoutProps, ILayoutState> {
    constructor (props: any) {
        super(props);
        this.state = {
            playing: false,
        }
    }

    componentWillMount = () => {
        Store.on("stateChanged", this.changeState);
        Store.on("pausing", this.pauseVideo);
    }

    componentDidMount = () => {
        let slider = document.getElementById("my-slider") as HTMLInputElement;
        slider.value = "0";
    }

    changeState = () => {
        this.state.playing = !this.state.playing;
    }

    pauseVideo = () => {
        this.state.playing = false;
    }

    onPlay = () => {
        let video = document.getElementById("my-player") as HTMLVideoElement;
        Actions.playVideo(this.state.playing, video);
    }

    onPause = () => {
        let video = document.getElementById("my-player") as HTMLVideoElement;
        Actions.pauseVideo(this.state.playing, video);
        this.onSliderMouseDown();
    }

    onStop = () => {
        let video = document.getElementById("my-player") as HTMLVideoElement;
        Actions.stopVideo(this.state.playing, video);
    }
    
    onBackFive = () => {
        let video = document.getElementById("my-player") as HTMLVideoElement;
        Actions.backFive(video);
    }

    onForwardFive = () => {
        let video = document.getElementById("my-player") as HTMLVideoElement;
        Actions.forwardFive(video);
    }

    onRestart = () => {
        let video = document.getElementById("my-player") as HTMLVideoElement;
        Actions.restart(video);
    }

    onSlide = () => {
        let video = document.getElementById("my-player") as HTMLVideoElement;
        let slider = document.getElementById("my-slider") as HTMLInputElement;
        Actions.slideTime(video, slider);
    }

    onVideoPlaying = () => {
        let video = document.getElementById("my-player") as HTMLVideoElement;
        let slider = document.getElementById("my-slider") as HTMLInputElement;
        Actions.videoPlaying(video, slider);
    }

    onSliderMouseDown = () => {
        Actions.slideExpend(500);
    }

    onSliderMouseRelease = () => {
        Actions.slideBackToNormalWidth();
    }

    render() {
        return (
            <div>
                
                <div className="time-selector">
                    <input type="range" id="my-slider" className="time-range" step="1" min="0" max="300" onMouseDown={this.onPause.bind(this)} onMouseUp={this.onSliderMouseRelease.bind(this)} onChange={this.onSlide.bind(this)} />
                </div>
                <video
                    id="my-player"
                    className="video-js"
                    preload="auto"
                    poster="//vjs.zencdn.net/v/oceans.png"
                    onTimeUpdate={this.onVideoPlaying.bind(this)}
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
                <div className="video-controls-container">
                    <button className="video-controls" onClick={this.onRestart.bind(this)}>
                        <i className="glyphicon glyphicon-fast-backward"></i>
                    </button>
                    <button className="video-controls" onClick={this.onBackFive.bind(this)}>
                        <i className="glyphicon glyphicon-step-backward"></i> <span className="time-jump">(5 secondes)</span>
                    </button>
                    <button className="video-controls" onClick={this.onStop.bind(this)}>
                        <i className="glyphicon glyphicon-stop"></i>
                    </button>
                    <button className="video-controls" onClick={this.onPlay.bind(this)}>
                        <i id="play-button" className="glyphicon glyphicon-play"></i>
                    </button>
                    <button className="video-controls" onClick={this.onForwardFive.bind(this)}>
                        <i className="glyphicon glyphicon-step-forward"></i> <span className="time-jump">(5 secondes)</span>
                    </button>
                </div>
            </div>
        );
    }
}