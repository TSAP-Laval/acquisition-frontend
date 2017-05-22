import { EventEmitter } from "events";
import dispatcher from "../dispatcher/dispatcher";

class VideoPlayerStore extends EventEmitter {
    protected currentTime: number;
    protected step: number;
    protected forwadingStep: number;
    protected timerForHolding: any;
    protected holdingInterval: any;
    protected zoom: {
        height: number,
        width: number,
    };
    protected zoomHeight: number;
    protected zoomWidth: number;

    constructor() {
        super();
        this.currentTime = 0;
        this.step = 5;
        this.zoomHeight = 80;
        this.zoomWidth = 80;
    }

    public getStep = () => {
        return this.step;
    }

    private play = (state: boolean, video: HTMLVideoElement) => {
        if (state) {
            document.getElementById("play-button").classList.remove("glyphicon-pause");
            document.getElementById("play-button").classList.add("glyphicon-play");
            video.pause();
        } else {
            document.getElementById("play-button").classList.remove("glyphicon-play");
            document.getElementById("play-button").classList.add("glyphicon-pause");
            video.play();
        }
    }

    private pause = (state: boolean, video: HTMLVideoElement) => {
        if (state) {
            video.pause();
            document.getElementById("play-button").classList.remove("glyphicon-pause");
            document.getElementById("play-button").classList.add("glyphicon-play");
            this.emit("pausing");
        }
    }

    private stop = (state: boolean, video: HTMLVideoElement) => {
        if (state) {
            video.pause();
            document.getElementById("play-button").classList.remove("glyphicon-pause");
            document.getElementById("play-button").classList.add("glyphicon-play");
            video.currentTime = 0;
            this.emit("pausing");
        }
    }

    private back = (video: HTMLVideoElement) => {
        this.pause(true, video);
        video.currentTime -= this.step;
    }

    private forward = (video: HTMLVideoElement) => {
        this.pause(true, video);
        video.currentTime += this.step;
    }

    private restart = (video: HTMLVideoElement) => {
        video.currentTime = 0;
    }

    private slide = (video: HTMLVideoElement, slider: HTMLInputElement) => {
        video.currentTime = (parseInt(slider.value, 10) / parseFloat(slider.max)) * video.duration;
    }

    private videoPlaying = (video: HTMLVideoElement, slider: HTMLInputElement) => {
        slider.value = ((video.currentTime / video.duration) * parseFloat(slider.max)).toString();
    }

    private restoreDefaultSlowSlider = (slider: HTMLInputElement) => {
        slider.value = (parseFloat(slider.max) / 2).toString();
    }

    private slowSliderSlide = (slider: HTMLInputElement, video: HTMLVideoElement) => {
        const slidingValue = (
            parseFloat(slider.value) - (parseFloat(slider.max) / 2)
            ) / (parseFloat(slider.max) * 0, 75);
        video.currentTime = this.currentTime + slidingValue;
    }

    private setCurrentTime = (time: number) => {
        this.currentTime = time;
    }

    private setStep = (stepInfo: HTMLSpanElement, slider: HTMLInputElement) => {
        this.step = parseFloat(slider.value) / 20;
        stepInfo.innerText = this.step + " sec.";
    }

    private setSliderPaddingBottom = (state: boolean, slider: HTMLInputElement) => {
        if (state) {
            slider.classList.remove("down");
        } else {
            slider.classList.add("down");
        }
    }

    private startDelaying = (waitTime: number, backing: boolean, video: HTMLVideoElement) => {
        this.timerForHolding = setTimeout(this.emit.bind(this,
        (backing ? "holdingBackward" : "holdingForward")), waitTime * 1000);
    }

    private stopHoldingSearch = (video: HTMLVideoElement) => {
        clearTimeout(this.timerForHolding);
        clearInterval(this.holdingInterval);
        this.pause(true, video);
    }

    private playVideoFrameByFrameWithDirection = (
        backing: boolean,
        numberOfFrameBySecond: number,
        video: HTMLVideoElement) => {
        if (backing) {
            this.holdingInterval = setInterval(function() {
                this.back(video);
            }.bind(this), numberOfFrameBySecond * 1000);
        } else {
            this.holdingInterval = setInterval(function() {
                this.forward(video);
            }.bind(this), numberOfFrameBySecond * 1000);
        }
    }

    private modifySliderSpeed = (increase: boolean, slider: HTMLInputElement, text: HTMLSpanElement) => {
        slider.value = (parseInt(slider.value, 10) + (increase ? 5 : -5)).toString();
        this.setStep(text, slider);
    }

    private setZoomOnVideo = (video: HTMLVideoElement, canvas: HTMLCanvasElement, x: number, y: number, mouse: any) => {
        this.pause(true, video);
        const context = canvas.getContext("2d");
        canvas.style.left = mouse.x - (canvas.width / 2.5) + "px";
        canvas.style.top = mouse.y + 50 + "px";
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(video, x, y, this.zoomWidth, this.zoomHeight, 0, 0, canvas.width, canvas.height);
        canvas.classList.remove("hidden");
    }

    private removeZoomOnVideo = (canvas: HTMLCanvasElement) => {
        canvas.classList.add("hidden");
    }

    public handlerActions = (action: any) => {
        switch (action.type) {
            case "VIDEO_PLAYER.PLAY_VIDEO": {
                this.play(action.state, action.video);
                this.emit("stateChanged");
                break;
            }
            case "VIDEO_PLAYER.PAUSE_VIDEO": {
                this.pause(action.state, action.video);
                break;
            }
            case "VIDEO_PLAYER.STOP_VIDEO": {
                this.stop(action.state, action.video);
                break;
            }
            case "VIDEO_PLAYER.BACK_FIVE": {
                this.back(action.video);
                break;
            }
            case "VIDEO_PLAYER.FORWARD_FIVE": {
                this.forward(action.video);
                break;
            }
            case "VIDEO_PLAYER.RESTART": {
                this.restart(action.video);
                break;
            }
            case "VIDEO_PLAYER.SLIDE_TIME": {
                this.slide(action.video, action.slider);
                break;
            }
            case "VIDEO_PLAYER.VIDEO_PLAYING": {
                this.videoPlaying(action.video, action.slider);
                break;
            }
            case "VIDEO_PLAYER.RESTORE_SLOW_SLIDER": {
                this.restoreDefaultSlowSlider(action.slider);
                break;
            }
            case "VIDEO_PLAYER.SLOW_SLIDER_SLIDE": {
                this.slowSliderSlide(action.slider, action.video);
                break;
            }
            case "VIDEO_PLAYER.SET_CURRENT_TIME": {
                this.setCurrentTime(action.time);
                break;
            }
            case "VIDEO_PLAYER.SET_STEP_VALUE" : {
                this.setStep(action.stepInfo, action.slider);
                this.emit("stepChanged");
                break;
            }
            case "VIDEO_PLAYER.SET_RANGE_PADDING_BOTTOM" : {
                this.setSliderPaddingBottom(action.state, action.slider);
                break;
            }
            case "VIDEO_PLAYER.HOLD_BTN_DELAY" : {
                this.startDelaying(1, action.backing, action.video);
                break;
            }
            case "VIDEO_PLAYER.HOLD_STOP" : {
                this.stopHoldingSearch(action.video);
                this.emit("holdingSearchStopped");
                break;
            }
            case "VIDEO_PLAYER.PLAY_FRAME_BY_FRAME_WITH_DIRECTION": {
                this.playVideoFrameByFrameWithDirection(action.backing, action.numberOfFrameBySecond, action.video);
                break;
            }
            case "VIDEO_PLAYER.MODIFY_FINDER_SPEED" : {
                this.modifySliderSpeed(action.increase, action.slider, action.text);
                break;
            }
            case "VIDEO_PLAYER.SET_ZOOM_ON_VIDEO" : {
                this.setZoomOnVideo(action.video, action.canvas, action.x, action.y, action.mouse);
                break;
            }
            case "VIDEO_PLAYER.REMOVE_ZOOM_ON_VIDEO" : {
                this.removeZoomOnVideo(action.canvas);
                break;
            }
            default:
                break;
        }
    }
}

const videoPlayerStore = new VideoPlayerStore();
dispatcher.register(videoPlayerStore.handlerActions.bind(videoPlayerStore));
export default videoPlayerStore;
