// Dispatcher global
import * as Dispatcher from "../../dispatcher";
import * as VideoPlayerActionType from "../Constants/VideoPlayerActionTypes";

var ActionTypes = require("../constants").ActionTypes

export const VideoPlayerActions = {
    videoPlay: (video: HTMLVideoElement, pausePlayButton: HTMLInputElement) => {
        Dispatcher.handleViewAction({
            type: ActionTypes.ON_START,
            video: video,
            button: pausePlayButton
        })
    }
}