import * as React from "react";
import * as Actions from "../actions/VideoPlayerActions";
import Store from "../stores/VideoPlayerStore";
import * as keymaster from "keymaster";

export interface ILayoutProps {
    url: string;
}
export interface ILayoutState {
    holdingSearch: boolean;
    playing: boolean;
    overVideoZooming: boolean;
}

export default class VideoPlayer extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: any) {
        super(props);
        this.state = {
            holdingSearch: false,
            overVideoZooming: false,
            playing: false,
        };
    }

    private componentWillMount = () => {
        Store.on("stateChanged", this.changeState);
        Store.on("pausing", this.pauseVideo);
        Store.on("holdingBackward", this.holdVideoPlayingBackward);
        Store.on("holdingForward", this.holdVideoPlayingForward);
        Store.on("holdingSearchStopped", this.stopHoldingSearch);
    }

    private componentDidMount = () => {
        const slider        = document.getElementById("my-slider") as HTMLInputElement;
        const stepperSlider = document.getElementById("stepRange") as HTMLInputElement;

        slider.value = "0";
        stepperSlider.value = "100";
        keymaster("p", this.onPlay);
        keymaster("s", this.onStop);
        keymaster("r", this.onRestart);
        keymaster("left", this.onBackFive);
        keymaster("right", this.onForwardFive);
        keymaster("a", this.increaseFinderValue);
        keymaster("z", this.decreaseFinderValue);
        keymaster("l", this.setDrawZoom);
    }

    private increaseFinderValue = () => {
        const slider = document.getElementById("stepRange") as HTMLInputElement;
        const stepInfo = document.getElementsByClassName("time-jump")[0] as HTMLSpanElement;
        Actions.modifyFinderValue(true, slider, stepInfo);
    }

    private decreaseFinderValue = () => {
        const slider = document.getElementById("stepRange") as HTMLInputElement;
        const stepInfo = document.getElementsByClassName("time-jump")[0] as HTMLSpanElement;
        Actions.modifyFinderValue(false, slider, stepInfo);
    }

    private changeState = () => {
        this.setState({ playing: !this.state.playing});
    }

    private pauseVideo = () => {
        this.setState({ playing: false});
    }

    private holdVideoPlayingBackward = () => {
        const video = document.getElementById("my-player") as HTMLVideoElement;
        if (this.state.holdingSearch) {
            Actions.playVideoFrameByFrameWithDirection(true, 0.1, video);
        }
    }

    private holdVideoPlayingForward = () => {
        const video = document.getElementById("my-player") as HTMLVideoElement;
        if (this.state.holdingSearch) {
            Actions.playVideoFrameByFrameWithDirection(false, 0.1, video);
        }
    }

    private stopHoldingSearch = () => {
        this.setState({ holdingSearch: false });
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

    private onBackingHold = () => {
        const video = document.getElementById("my-player") as HTMLVideoElement;
        this.setState({ holdingSearch: true });
        Actions.holdDelay(true, video);
    }

    private onForwardingHold = () => {
        const video = document.getElementById("my-player") as HTMLVideoElement;
        this.setState({ holdingSearch: true });
        Actions.holdDelay(false, video);
    }

    private onBackingStop = () => {
        const video = document.getElementById("my-player") as HTMLVideoElement;
        Actions.backingStop(video);
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

    private onKeyPressed = (event: any) => {
        // console.log(event.key);
    }

    private drawZoom = (e: React.MouseEvent<HTMLInputElement>) => {
        const video         = document.getElementById("my-player") as HTMLVideoElement;
        const canvas        = document.getElementById("video-cvs") as HTMLCanvasElement;
        const x             = e.pageX - (
            (window.innerWidth - (video.videoWidth / 1.2)) / (video.videoWidth / video.videoHeight)
            );
        const y             = e.pageY - 40;
        const mouse         = {x: e.pageX, y: e.pageY};
        if (this.state.overVideoZooming) {
            Actions.setZoomOnVideo(video, canvas, x, y, mouse);
        } else {
            Actions.removeZoomOnVideo(canvas);
        }
    }

    private setDrawZoom = () => {
        const canvas = document.getElementById("video-cvs") as HTMLCanvasElement;
        this.setState({overVideoZooming: !this.state.overVideoZooming});
        if (!this.state.overVideoZooming) {
            Actions.removeZoomOnVideo(canvas);
        }
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
                        onMouseDown={this.onPause}
                        onChange={this.onSlide}
                        onMouseOver={this.onVideoMouseOver}
                        onMouseLeave={this.onVideoMouseLeave}
                    />
                </div>
                <video
                    id="my-player"
                    className="video-js"
                    preload="auto"
                    poster=""
                    onTimeUpdate={this.onVideoPlaying}
                    onMouseOver={this.onVideoMouseOver}
                    onMouseLeave={this.onVideoMouseLeave}
                    onMouseMove={this.drawZoom.bind(this)}
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
                <canvas id="video-cvs" className="hidden"/>
                <div
                    className="video-controls-container"
                    onMouseOver={this.onVideoMouseOver}
                    onMouseLeave={this.onVideoMouseLeave}
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
                            onChange={this.onStepSliderSlide}
                            type="range"
                            min="1"
                            step="1"
                            max="200"
                        />
                    </div>
                    <button className="video-controls" onClick={this.onRestart}>
                        <i className="glyphicon glyphicon-fast-backward"/>
                    </button>
                    <button
                        className="video-controls"
                        onClick={this.onBackFive}
                        onMouseDown={this.onBackingHold}
                        onMouseUp={this.onBackingStop}
                    >
                        <i className="glyphicon glyphicon-step-backward"/>
                    </button>
                    <button className="video-controls" onClick={this.onStop}>
                        <i className="glyphicon glyphicon-stop"/>
                    </button>
                    <button className="video-controls" onClick={this.onPlay}>
                        <i id="play-button" className="glyphicon glyphicon-play"/>
                    </button>
                    <button
                        className="video-controls"
                        onClick={this.onForwardFive}
                        onMouseDown={this.onForwardingHold}
                        onMouseUp={this.onBackingStop}
                    >
                        <i className="glyphicon glyphicon-step-forward"/>
                    </button>
                    <button className="video-controls" onClick={this.setDrawZoom}>
                        <i className="glyphicon glyphicon-zoom-in"/>
                    </button>
                    <div id="slowFinder">
                        <div className="slideTrack"/>
                        <label htmlFor="slowRange">Recherche précise:</label>
                        <input
                            id="slowRange"
                            onMouseDown={this.onSlowSliderMouseDown}
                            onMouseUp={this.onSlowSliderMouseUp}
                            onChange={this.onSlowSliderSlide}
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
