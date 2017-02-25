import { EventEmitter } from "events";
import dispatcher from "../components/dispatcher";

class VideoPlayerStore extends EventEmitter {
    currentTime: number;

    constructor() {
        super();
        this.currentTime = 0;
    }

    play = (state: boolean, video: HTMLVideoElement) => {
        if (state) {
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
    }

    pause = (state: boolean, video: HTMLVideoElement) => {
        if (state) {
            video.pause();
            console.log(video.currentTime);
            $("#play-button")
                .removeClass("glyphicon-pause")
                .addClass("glyphicon-play");
            this.emit("pausing");
        }
    }

    stop = (state: boolean, video: HTMLVideoElement) => {
        if (state) {
            video.pause();
            $("#play-button")
                .removeClass("glyphicon-pause")
                .addClass("glyphicon-play");
            video.currentTime = 0; 
            this.emit("pausing");
        }
    }

    back = (video: HTMLVideoElement) => {
        video.currentTime -= 5;
    }

    forward = (video: HTMLVideoElement) => {
        video.currentTime += 5;
    }

    restart = (video: HTMLVideoElement) => {
        video.currentTime = 0;
    }

    slide = (video: HTMLVideoElement, slider: HTMLInputElement) => {
        video.currentTime = (parseInt(slider.value) / parseFloat(slider.max)) * video.duration;
    }

    videoPlaying = (video: HTMLVideoElement, slider: HTMLInputElement) => {
        slider.value = ((video.currentTime / video.duration) * parseFloat(slider.max)).toString();
    }

    restoreDefaultSlowSlider = (slider: HTMLInputElement) => {
        slider.value = (parseFloat(slider.max) / 2).toString();
    }

    slowSliderSlide = (slider: HTMLInputElement, video: HTMLVideoElement) => {
        let slidingValue = (parseFloat(slider.value) - (parseFloat(slider.max) / 2)) / (parseFloat(slider.max) * 0,75);
        video.currentTime = this.currentTime + slidingValue;
    }

    setCurrentTime = (time: number) => {
        this.currentTime = time;
    }

    handlerActions = (action: any) => {
        switch(action.type) {
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
            default:
                break;
        }
    }
}

const videoPlayerStore = new VideoPlayerStore();
dispatcher.register(videoPlayerStore.handlerActions.bind(videoPlayerStore));
export default videoPlayerStore;