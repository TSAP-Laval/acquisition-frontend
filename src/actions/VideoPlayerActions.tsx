import dispatcher from "../components/dispatcher";

export function playVideo() {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.PLAY_VIDEO",
    });
}

export function pauseVideo() {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.PAUSE_VIDEO",
    });
}

export function restart() {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.RESTART",
    });
}

export function backFive() {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.BACK_FIVE",
    });
}

export function forwardFive() {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.FORWARD_FIVE",
    });
}

export function stopVideo() {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.STOP_VIDEO",
    });
}

export function slideTime() {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.SLIDE_TIME",
    });
}

export function videoPlaying() {
    dispatcher.dispatch({
        type: "VIDEO_PLAYER.VIDEO_PLAYING",
    });
}