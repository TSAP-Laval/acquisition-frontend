import dispatcher from "../dispatcher/dispatcher";

// Met le vidéo en mode lecture.
export function playVideo(state: boolean, video: HTMLVideoElement) {
    dispatcher.dispatch({
        state,
        type: "VIDEO_PLAYER.PLAY_VIDEO",
        video,
    });
}

// Met le vidéo en pause
export function pauseVideo(state: boolean, video: HTMLVideoElement) {
    dispatcher.dispatch({
        state,
        type: "VIDEO_PLAYER.PAUSE_VIDEO",
        video,
    });
}

// Recommence la lecture de la vidéo depuis le début
export function restart(video: HTMLVideoElement) {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.RESTART",
        video,
    });
}

// Recule la lecture de 5 secondes
export function backFive(video: HTMLVideoElement) {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.BACK_FIVE",
        video,
    });
}

// Avance la lecture de 5 secondes
export function forwardFive(video: HTMLVideoElement) {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.FORWARD_FIVE",
        video,
    });
}

// Arrêt de la lecture de la vidéo
export function stopVideo(state: boolean, video: HTMLVideoElement) {
    dispatcher.dispatch({
        state,
        type: "VIDEO_PLAYER.STOP_VIDEO",
        video,
    });
}

// Lecture précise de la vidéo
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

export function setVideoMouseOverSliderPaddingBottom(slider: HTMLInputElement, state: boolean) {
    dispatcher.dispatch({
        slider,
        state,
        type: "VIDEO_PLAYER.SET_RANGE_PADDING_BOTTOM",
    });
}

export function holdDelay(backing: boolean, video: HTMLVideoElement) {
    dispatcher.dispatch({
        backing,
        type: "VIDEO_PLAYER.HOLD_BTN_DELAY",
        video,
    });
}

export function backingStop(video: HTMLVideoElement) {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.HOLD_STOP",
        video,
    });
}

export function playVideoFrameByFrameWithDirection(
    backing: boolean,
    numberOfFrameBySecond: number,
    video: HTMLVideoElement) {
    dispatcher.dispatch({
        backing,
        numberOfFrameBySecond,
        type: "VIDEO_PLAYER.PLAY_FRAME_BY_FRAME_WITH_DIRECTION",
        video,
    });
}

export function modifyFinderValue(increase: boolean, slider: HTMLInputElement, text: HTMLSpanElement) {
    dispatcher.dispatch({
        increase,
        slider,
        text,
        type: "VIDEO_PLAYER.MODIFY_FINDER_SPEED",
    });
}

export function setZoomOnVideo(video: HTMLVideoElement, canvas: HTMLCanvasElement, x: number, y: number, mouse: any) {
    dispatcher.dispatch({
        canvas,
        mouse,
        type: "VIDEO_PLAYER.SET_ZOOM_ON_VIDEO",
        video,
        x,
        y,
    });
}

export function removeZoomOnVideo(canvas: HTMLCanvasElement) {
    dispatcher.dispatch({
        canvas,
        type: "VIDEO_PLAYER.REMOVE_ZOOM_ON_VIDEO",
    });
}
