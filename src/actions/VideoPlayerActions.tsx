import dispatcher from "../dispatcher/dispatcher";

// Met le vidéo en mode lecture.
export function playVideo(state: boolean, video: HTMLVideoElement) {
    dispatcher.dispatch({
        state,
        type: "VIDEO_PLAYER.PLAY_VIDEO",
        video,
    });
}

export function pauseVideo(state: boolean, video: HTMLVideoElement) {
    dispatcher.dispatch({
        state,
        type: "VIDEO_PLAYER.PAUSE_VIDEO",
        video,
    });
}

export function restart(video: HTMLVideoElement) {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.RESTART",
        video,
    });
}

export function backFive(video: HTMLVideoElement) {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.BACK_FIVE",
        video,
    });
}

export function forwardFive(video: HTMLVideoElement) {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.FORWARD_FIVE",
        video,
    });
}

export function stopVideo(state: boolean, video: HTMLVideoElement) {
    dispatcher.dispatch({
        state,
        type: "VIDEO_PLAYER.STOP_VIDEO",
        video,
    });
}

export function slideTime(video: HTMLVideoElement, slider: HTMLInputElement) {
    dispatcher.dispatch({
        slider,
        type: "VIDEO_PLAYER.SLIDE_TIME",
        video,
    });
}

export function videoPlaying(video: HTMLVideoElement, slider: HTMLInputElement) {
    dispatcher.dispatch({
        slider,
        type: "VIDEO_PLAYER.VIDEO_PLAYING",
        video,
    });
}

export function restoreDefaultSlowSliderValue(slider: HTMLInputElement) {
    dispatcher.dispatch({
        slider,
        type: "VIDEO_PLAYER.RESTORE_SLOW_SLIDER",
    });
}

export function slowSliderSlide(slider: HTMLInputElement, video: HTMLVideoElement) {
    dispatcher.dispatch({
        slider,
        type: "VIDEO_PLAYER.SLOW_SLIDER_SLIDE",
        video,
    });
}

export function setCurrentTime(time: number) {
    dispatcher.dispatch({
        time,
        type: "VIDEO_PLAYER.SET_CURRENT_TIME",
    });
}

export function setStepValues(stepInfo: HTMLSpanElement, slider: HTMLInputElement) {
    dispatcher.dispatch({
        slider,
        stepInfo,
        type: "VIDEO_PLAYER.SET_STEP_VALUE",
    });
}
