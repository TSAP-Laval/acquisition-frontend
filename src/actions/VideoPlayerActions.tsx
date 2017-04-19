import dispatcher from "../dispatcher/dispatcher";

export function playVideo(state: boolean, video: HTMLVideoElement) {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.PLAY_VIDEO",
        state: state,
        video: video,
    });
}

export function pauseVideo(state: boolean, video: HTMLVideoElement) {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.PAUSE_VIDEO",
        state: state,
        video: video,
    });
}

export function restart(video: HTMLVideoElement) {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.RESTART",
        video: video,
    });
}

export function backFive(video: HTMLVideoElement) {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.BACK_FIVE",
        video: video,
    });
}

export function forwardFive(video: HTMLVideoElement) {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.FORWARD_FIVE",
        video: video,
    });
}

export function stopVideo(state: boolean, video: HTMLVideoElement) {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.STOP_VIDEO",
        state: state,
        video: video,
    });
}

export function slideTime(video: HTMLVideoElement, slider: HTMLInputElement) {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.SLIDE_TIME",
        video: video,
        slider: slider,
    });
}

export function videoPlaying(video: HTMLVideoElement, slider: HTMLInputElement) {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.VIDEO_PLAYING",
        video: video,
        slider: slider,
    });
}

export function restoreDefaultSlowSliderValue(slider: HTMLInputElement) {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.RESTORE_SLOW_SLIDER",
        slider: slider,
    });
}

export function slowSliderSlide(slider: HTMLInputElement, video: HTMLVideoElement) {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.SLOW_SLIDER_SLIDE",
        slider: slider,
        video: video,
    });
}

export function setCurrentTime(time: number) {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.SET_CURRENT_TIME",
        time: time,
    });
}

export function setStepValues(stepInfo: HTMLSpanElement, slider: HTMLInputElement) {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.SET_STEP_VALUE",
        stepInfo: stepInfo,
        slider: slider,
    })
}