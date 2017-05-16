import * as React from "react";

// tslint:disable:no-empty-interface
export interface ILayoutProps {}
export interface ILayoutState {}
// tslint:enable:no-empty-interface

export default class VideoPlayer extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: any) {
        super(props);
    }

    public playState = false;

    public componentDidMount = () => {
        let _slider = document.getElementById("my-slider") as HTMLInputElement;
        _slider.value = "0";
    }

    getVideoLenght = () => {
        let _video = document.getElementById("my-player") as HTMLVideoElement;
        return _video.duration;
    }

    onPlay = (e: React.MouseEvent<HTMLElement>) => {
        let _video = document.getElementById("my-player") as HTMLVideoElement;
        let _playButton = document.getElementById("play-button") as HTMLVideoElement;
        if (this.playState == true) {
            _video.pause();
            console.log(_video.currentTime);
            this.playState = false;
        } else {
             _video.play();
             this.playState = true;
        }
        _playButton.setAttribute("name", this.getPlayStateButton());
        _playButton.setAttribute("class", "glyphicon " + "glyphicon-" + this.getPlayStateButton());
    }

    onPause = (e: React.MouseEvent<HTMLElement>) => {
        let _video = document.getElementById("my-player") as HTMLVideoElement;
        let _playButton = document.getElementById("play-button") as HTMLVideoElement;
        if (this.playState == true) {
            _video.pause();
            console.log(_video.currentTime);
            this.playState = false;
        }
        _playButton.setAttribute("name", this.getPlayStateButton());
        _playButton.setAttribute("class", "fa " + "fa-" + this.getPlayStateButton());
    }

    onStop = (e: React.MouseEvent<HTMLElement>) => {
        let _video = document.getElementById("my-player") as HTMLVideoElement;
        let _playButton = document.getElementById("play-button") as HTMLVideoElement;
        if (this.playState == true) {
            _video.pause();
            console.log(_video.currentTime);
            this.playState = false;
        }
        _playButton.setAttribute("name", this.getPlayStateButton());
        _playButton.setAttribute("class", "fa " + "fa-" + this.getPlayStateButton());
        _video.currentTime = 0; 
    }

    onBackFive = (e: React.MouseEvent<HTMLElement>) => {
        let _video = document.getElementById("my-player") as HTMLVideoElement;
        _video.currentTime -= 5;
    }

    onRestart = (e: React.MouseEvent<HTMLElement>) => {
        let _video = document.getElementById("my-player") as HTMLVideoElement;
        _video.currentTime = 0;
    }

    onForwardFive = (e: React.MouseEvent<HTMLElement>) => {
        let _video = document.getElementById("my-player") as HTMLVideoElement;
        _video.currentTime += 5;
    }

    onSlide = (e: React.FormEvent<HTMLElement>) => {
        let _video = document.getElementById("my-player") as HTMLVideoElement;
        let _slider = document.getElementById("my-slider") as HTMLInputElement;
        _video.currentTime = (parseInt(_slider.value) / 300) * _video.duration;
    }

    onVideoRunning = (e: React.FormEvent<HTMLElement>) => {
        let _video = document.getElementById("my-player") as HTMLVideoElement;
        let _slider = document.getElementById("my-slider") as HTMLInputElement;
        _slider.value = ((_video.currentTime / _video.duration) * 300).toString();
    }

    getPlayStateButton = () => {
        if (this.playState == true) {
            return "pause";
        } else {
            return "play";  
        }
    }

    render() {
        return (
            <div>
                <div className="time-selector">
                    <input type="range" id="my-slider" className="time-range" step="1" min="0" max="300" onMouseDown={e => this.onPause(e)} onChange={e => this.onSlide(e)} />
                </div>
                <video
                    id="my-player"
                    className="video-js"
                    onTimeUpdate={e => this.onVideoRunning(e)}
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
                <div className="video-controls-container">
                    <button className="video-controls" onClick={e => this.onRestart(e)}>
                        <i className="glyphicon glyphicon-fast-backward"></i>
                    </button>
                    <button className="video-controls" onClick={e => this.onBackFive(e)}>
                        <i className="glyphicon glyphicon-step-backward"></i> <span className="time-jump">(5 secondes)</span>
                    </button>
                    <button className="video-controls" onClick={e => this.onStop(e)}>
                        <i className="glyphicon glyphicon-stop"></i>
                    </button>
                    <button className="video-controls" onClick={e => this.onPlay(e)}>
                        <i id="play-button" className="glyphicon glyphicon-play"></i>
                    </button>
                    <button className="video-controls" onClick={e => this.onForwardFive(e)}>
                        <i className="glyphicon glyphicon-step-forward"></i> <span className="time-jump">(5 secondes)</span>
                    </button>
                </div>
            </div>
        );
    }
}