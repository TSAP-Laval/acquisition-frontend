import * as React from "react"

export interface ILayoutProps {
}
export interface ILayoutState {

}

var FontAwesome = require('react-fontawesome');

export default class VideoPlayer extends React.Component<ILayoutProps, ILayoutState> {
    constructor (props: any) {
        super(props);
    }

    playState = false;

    componentDidMount = () => {
        let _slider = document.getElementById("my-slider") as HTMLInputElement;
        _slider.value = "0";
    }

    getVideoLenght = () => {
        let _video = document.getElementById("my-player") as HTMLVideoElement;
        return _video.duration;
    }

    onPlay = (e: React.MouseEvent<HTMLElement>) => {
        let _video = document.getElementById("my-player") as HTMLVideoElement;
        let _playButton = document.getElementById("play-button");
        if (this.playState == true) {
            _video.pause();
            console.log(_video.currentTime);
            this.playState = false;
        } else {
             _video.play();
             this.playState = true;
        }
        _playButton.setAttribute("name", this.getPlayStateButton());
        _playButton.setAttribute("class", "fa " + "fa-" + this.getPlayStateButton());
    }

    onPause = (e: React.MouseEvent<HTMLElement>) => {
        let _video = document.getElementById("my-player") as HTMLVideoElement;
        let _playButton = document.getElementById("play-button");
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
        let _playButton = document.getElementById("play-button");
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
        let _slider = document.getElementById("my-slider")as HTMLInputElement;
        let _value = parseFloat(_slider.value);
        _video.currentTime = (_value / 300) * _video.duration;
    }

    onVideoRunning = (e: React.FormEvent<HTMLElement>) => {
        let _video = document.getElementById("my-player") as HTMLVideoElement;
        let _slider = document.getElementById("my-slider") as HTMLInputElement;
        let _value = (_video.currentTime / _video.duration) * 300;
        _slider.value = _value.toString();
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
                        <FontAwesome name='fast-backward' />
                    </button>
                    <button className="video-controls" onClick={e => this.onBackFive(e)}>
                        <FontAwesome name='step-backward' /> <span className="time-jump">(5 secondes)</span>
                    </button>
                    <button className="video-controls" onClick={e => this.onStop(e)}>
                        <FontAwesome name='stop' />
                    </button>
                    <button className="video-controls" onClick={e => this.onPlay(e)}>
                        <FontAwesome id="play-button" name={this.getPlayStateButton()} />
                    </button>
                    <button className="video-controls" onClick={e => this.onForwardFive(e)}>
                        <FontAwesome name='step-forward' /> <span className="time-jump">(5 secondes)</span>
                    </button>
                </div>
            </div>
        );
    }
}