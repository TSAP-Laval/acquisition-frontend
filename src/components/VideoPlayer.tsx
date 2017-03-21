import * as React from "react";
import * as Actions from "../actions/VideoPlayerActions";
import Store from "../stores/VideoPlayerStore";

export interface ILayoutProps {
    url: string,
}
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
        Store.on("stepChanged", this.changeStep)
        Store.on("pausing", this.pauseVideo);
    }

    componentDidMount = () => {
        let slider = document.getElementById("my-slider") as HTMLInputElement;
        let stepperSlider = document.getElementById("stepRange") as HTMLInputElement;
        slider.value = "0";
        stepperSlider.value = "100";
    }

    changeState = () => {
        this.setState({ playing: !this.state.playing});
    }

    changeStep = () => {
        console.log(Store.step);
    }

    pauseVideo = () => {
        this.setState({ playing: false});
    }

    onPlay = () => {
        let video = document.getElementById("my-player") as HTMLVideoElement;
        Actions.playVideo(this.state.playing, video);
    }

    onPause = () => {
        let video = document.getElementById("my-player") as HTMLVideoElement;
        Actions.pauseVideo(this.state.playing, video);
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

    onSlowSliderMouseUp = () => {
        let slowSlider = document.getElementById("slowRange") as HTMLInputElement;
        Actions.restoreDefaultSlowSliderValue(slowSlider);
    }

    onSlowSliderSlide = () => {
        let slowSlider = document.getElementById("slowRange") as HTMLInputElement;
        let video = document.getElementById("my-player") as HTMLVideoElement;
        Actions.slowSliderSlide(slowSlider, video);
    }

    onSlowSliderMouseDown = () => {
        let video = document.getElementById("my-player") as HTMLVideoElement;
        Actions.setCurrentTime(video.currentTime);
    }

    onStepSliderSlide = () => {
        let stepInfo = document.getElementsByClassName("time-jump")[0] as HTMLSpanElement;
        let stepSlider = document.getElementById("stepRange") as HTMLInputElement;
        Actions.setStepValues(stepInfo, stepSlider);
    }

    render() {
        return (
            <div>
                <div className="time-selector">
                    <input 
                        type="range" 
                        id="my-slider" 
                        className="time-range" 
                        step="1" 
                        min="0" 
                        max="300" 
                        onMouseDown={this.onPause.bind(this)} 
                        onChange={this.onSlide.bind(this)} />
                </div>
                <video
                    id="my-player"
                    className="video-js"
                    preload="auto"
                    poster="//vjs.zencdn.net/v/oceans.png"
                    onTimeUpdate={this.onVideoPlaying.bind(this)}
                    data-setup='{}'>
                    <source src={this.props.url} type="video/mp4"></source>
                    <p className="vjs-no-js">
                        To view this video please enable JavaScript, and consider upgrading to a
                        web browser that
                        <a href="http://videojs.com/html5-video-support/" target="_blank">
                        supports HTML5 video
                        </a>
                    </p>      
                </video>
                <div className="video-controls-container">
                    <div id="stepSetter">
                        <div className="slideTrack"></div>
                        <label htmlFor="stepRange">Pas: <span className="time-jump">{Store.step} sec.</span></label>
                        <input 
                            id="stepRange" 
                            onChange={this.onStepSliderSlide.bind(this)} 
                            type="range" 
                            min="1" 
                            step="1"
                            max="200" />
                    </div>
                    <button className="video-controls" onClick={this.onRestart.bind(this)}>
                        <i className="glyphicon glyphicon-fast-backward"></i>
                    </button>
                    <button className="video-controls" onClick={this.onBackFive.bind(this)}>
                        <i className="glyphicon glyphicon-step-backward"></i> 
                    </button>
                    <button className="video-controls" onClick={this.onStop.bind(this)}>
                        <i className="glyphicon glyphicon-stop"></i>
                    </button>
                    <button className="video-controls" onClick={this.onPlay.bind(this)}>
                        <i id="play-button" className="glyphicon glyphicon-play"></i>
                    </button>
                    <button className="video-controls" onClick={this.onForwardFive.bind(this)}>
                        <i className="glyphicon glyphicon-step-forward"></i>
                    </button>
                    <div id="slowFinder">
                        <div className="slideTrack"></div>
                        <label htmlFor="slowRange">Recherche précise:</label>
                        <input 
                            id="slowRange" 
                            onMouseDown={this.onSlowSliderMouseDown.bind(this)} 
                            onMouseUp={this.onSlowSliderMouseUp.bind(this)} 
                            onChange={this.onSlowSliderSlide.bind(this)} 
                            type="range" 
                            min="0" 
                            step="1" 
                            max="100" />
                    </div>
                </div>
            </div>
        );
    }
}