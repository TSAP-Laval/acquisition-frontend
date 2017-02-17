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
        Store.on("playing", this.changeState);
        Store.on("pausing", this.pauseVideo);
        Store.on("stoping", this.stopVideo);
        Store.on("backing", this.back);
        Store.on("forwarding", this.forward);
        Store.on("restarting", this.restart);
        Store.on("sliding", this.slide);
        Store.on("videoPlaying", this.videoPlaying);
    }

    changeState = () => {
        let video = document.getElementById("my-player") as HTMLVideoElement;
        let playButton = document.getElementById("play-button") as HTMLElement;
        if (this.state.playing) {
            $("#play-button")
                .removeClass("glyphicon-pause")
                .addClass("glyphicon-play");
            video.pause();
        } else {
            $("#play-button")
                .removeClass("glyphicon-play")
                .addClass("glyphicon-pause");
            video.play();
        }
        this.state.playing = !this.state.playing;
    }

    pauseVideo = () => {
        let video = document.getElementById("my-player") as HTMLVideoElement;
        if (this.state.playing) {
            video.pause();
            console.log(video.currentTime);
            this.state.playing = false;
            $("#play-button")
                .removeClass("glyphicon-pause")
                .addClass("glyphicon-play");
        }
    }

    stopVideo = () => {
        let video = document.getElementById("my-player") as HTMLVideoElement;
        if (this.state.playing) {
            video.pause();
            console.log(video.currentTime);
            this.state.playing = false;
            $("#play-button")
                .removeClass("glyphicon-pause")
                .addClass("glyphicon-play");
            video.currentTime = 0; 
        }
    }

    back = () => {
        let video = document.getElementById("my-player") as HTMLVideoElement;
        video.currentTime -= 5;
    }

    forward = () => {
        let video = document.getElementById("my-player") as HTMLVideoElement;
        video.currentTime += 5;
    }

    restart = () => {
        let video = document.getElementById("my-player") as HTMLVideoElement;
        video.currentTime = 0;
    }

    slide = () => {
        let video = document.getElementById("my-player") as HTMLVideoElement;
        let slider = document.getElementById("my-slider") as HTMLInputElement;
        video.currentTime = (parseInt(slider.value) / 300) * video.duration;
    }

    videoPlaying = () => {
        let video = document.getElementById("my-player") as HTMLVideoElement;
        let slider = document.getElementById("my-slider") as HTMLInputElement;
        slider.value = ((video.currentTime / video.duration) * 300).toString();
    }

    componentDidMount = () => {
        let slider = document.getElementById("my-slider") as HTMLInputElement;
        slider.value = "0";
    }

    onPlay = () => {
        Actions.playVideo();
    }

    onPause = () => {
        Actions.pauseVideo();
    }

    onStop = () => {
        Actions.stopVideo();
    }
    
    onBackFive = () => {
        Actions.backFive();
    }

    onForwardFive = () => {
        Actions.forwardFive();
    }

    onRestart = () => {
        Actions.restart();
    }

    onSlide = () => {
        Actions.slideTime();
    }

    onVideoPlaying = () => {
        Actions.videoPlaying();
    }

    render() {
        return (
            <div>
                
                <div className="time-selector">
                    <input type="range" id="my-slider" className="time-range" step="1" min="0" max="300" onMouseDown={this.onPause.bind(this)} onChange={this.onSlide.bind(this)} />
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