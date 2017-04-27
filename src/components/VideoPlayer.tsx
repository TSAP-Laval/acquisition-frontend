import * as React from "react";
import * as Actions from "../actions/VideoPlayerActions";
import Store from "../stores/VideoPlayerStore";

export interface ILayoutProps {
    url: string;
    id_partie: string;
}
export interface ILayoutState {
    playing: boolean;
}

export default class VideoPlayer extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: any) {
        super(props);
        this.state = {
            playing: false,
        };
    }

    private componentWillMount = () => {
        Store.on("stateChanged", this.changeState);
        Store.on("pausing", this.pauseVideo);
        this.props.url = "/api/parties/" + this.props.id_partie + "/videos/1"
    }

    private componentDidMount = () => {
        const slider = document.getElementById("my-slider") as HTMLInputElement;
        const stepperSlider = document.getElementById("stepRange") as HTMLInputElement;
        slider.value = "0";
        stepperSlider.value = "100";
    }

    private changeState = () => {
        this.setState({ playing: !this.state.playing});
    }

    private pauseVideo = () => {
        this.setState({ playing: false});
    }

    private onPlay = () => {
        const video = document.getElementById("my-player") as HTMLVideoElement;
        Actions.playVideo(this.state.playing, video);
    }

    private onPause = () => {
        const video = document.getElementById("my-player") as HTMLVideoElement;
        Actions.pauseVideo(this.state.playing, video);
    }

    private onStop = () => {
        const video = document.getElementById("my-player") as HTMLVideoElement;
        Actions.stopVideo(this.state.playing, video);
    }

    private onBackFive = () => {
        const video = document.getElementById("my-player") as HTMLVideoElement;
        Actions.backFive(video);
    }

    private onForwardFive = () => {
        const video = document.getElementById("my-player") as HTMLVideoElement;
        Actions.forwardFive(video);
    }

    private onRestart = () => {
        const video = document.getElementById("my-player") as HTMLVideoElement;
        Actions.restart(video);
    }

    private onSlide = () => {
        const video = document.getElementById("my-player") as HTMLVideoElement;
        const slider = document.getElementById("my-slider") as HTMLInputElement;
        Actions.slideTime(video, slider);
    }

    private onVideoPlaying = () => {
        const video = document.getElementById("my-player") as HTMLVideoElement;
        const slider = document.getElementById("my-slider") as HTMLInputElement;
        Actions.videoPlaying(video, slider);
    }

    private onSlowSliderMouseUp = () => {
        const slowSlider = document.getElementById("slowRange") as HTMLInputElement;
        Actions.restoreDefaultSlowSliderValue(slowSlider);
    }

    private onSlowSliderSlide = () => {
        const slowSlider = document.getElementById("slowRange") as HTMLInputElement;
        const video = document.getElementById("my-player") as HTMLVideoElement;
        Actions.slowSliderSlide(slowSlider, video);
    }

    private onSlowSliderMouseDown = () => {
        const video = document.getElementById("my-player") as HTMLVideoElement;
        Actions.setCurrentTime(video.currentTime);
    }

    private onStepSliderSlide = () => {
        const stepInfo = document.getElementsByClassName("time-jump")[0] as HTMLSpanElement;
        const stepSlider = document.getElementById("stepRange") as HTMLInputElement;
        Actions.setStepValues(stepInfo, stepSlider);
    }

    private onVideoMouseOver = () => {
        const slider = document.getElementById("my-slider") as HTMLInputElement;
        Actions.setVideoMouseOverSliderPaddingBottom(slider, true);
    }

    private onVideoMouseLeave = () => {
        const slider = document.getElementById("my-slider") as HTMLInputElement;
        Actions.setVideoMouseOverSliderPaddingBottom(slider, false);
    }

    public render() {
        return (
            <div>
                <div className="time-selector">
                    <input
                        type="range"
                        id="my-slider"
                        className="time-range down"
                        step="1"
                        min="0"
                        max="300"
                        onMouseDown={this.onPause.bind(this)}
                        onChange={this.onSlide.bind(this)}
                        onMouseOver={this.onVideoMouseOver.bind(this)}
                        onMouseLeave={this.onVideoMouseLeave.bind(this)}
                    />
                </div>
                <video
                    id="my-player"
                    className="video-js"
                    preload="auto"
                    poster="//vjs.zencdn.net/v/oceans.png"
                    onTimeUpdate={this.onVideoPlaying.bind(this)}
                    onMouseOver={this.onVideoMouseOver.bind(this)}
                    onMouseLeave={this.onVideoMouseLeave.bind(this)}
                    data-setup="{}"
                >
                    <source
                        src={this.props.url}
                        type="video/mp4"
                    />
                    <p className="vjs-no-js">
                        To view this video please enable JavaScript, and consider upgrading to a
                        web browser that
                        <a href="http://videojs.com/html5-video-support/" target="_blank">
                            supports HTML5 video
                        </a>
                    </p>      
                </video>
                <div
                    className="video-controls-container"
                    onMouseOver={this.onVideoMouseOver.bind(this)}
                    onMouseLeave={this.onVideoMouseLeave.bind(this)}
                >
                    <div id="stepSetter">
                        <div className="slideTrack"/>
                        <label
                            htmlFor="stepRange"
                        >
                            Pas: <span className="time-jump">{Store.getStep()} sec.</span>
                        </label>
                        <input
                            id="stepRange"
                            onChange={this.onStepSliderSlide.bind(this)}
                            type="range"
                            min="1"
                            step="1"
                            max="200"
                        />
                    </div>
                    <button className="video-controls" onClick={this.onRestart.bind(this)}>
                        <i className="glyphicon glyphicon-fast-backward"/>
                    </button>
                    <button className="video-controls" onClick={this.onBackFive.bind(this)}>
                        <i className="glyphicon glyphicon-step-backward"/> 
                    </button>
                    <button className="video-controls" onClick={this.onStop.bind(this)}>
                        <i className="glyphicon glyphicon-stop"/>
                    </button>
                    <button className="video-controls" onClick={this.onPlay.bind(this)}>
                        <i id="play-button" className="glyphicon glyphicon-play"/>
                    </button>
                    <button className="video-controls" onClick={this.onForwardFive.bind(this)}>
                        <i className="glyphicon glyphicon-step-forward"/>
                    </button>
                    <div id="slowFinder">
                        <div className="slideTrack"/>
                        <label htmlFor="slowRange">Recherche précise:</label>
                        <input
                            id="slowRange"
                            onMouseDown={this.onSlowSliderMouseDown.bind(this)}
                            onMouseUp={this.onSlowSliderMouseUp.bind(this)}
                            onChange={this.onSlowSliderSlide.bind(this)}
                            type="range"
                            min="0"
                            step="1"
                            max="100"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
