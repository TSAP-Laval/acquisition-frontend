import { EventEmitter } from "events";
import dispatcher from "../components/dispatcher";

class VideoPlayerStore extends EventEmitter {
    constructor() {
        super();
    }

    handlerActions = (action: any) => {
        switch(action.type) {
            case "VIDEO_PLAYER.PLAY_VIDEO": {
                this.emit("playing");
                break;
            }
            case "VIDEO_PLAYER.PAUSE_VIDEO": {
                this.emit("pausing");
            }
            case "VIDEO_PLAYER.STOP_VIDEO": {
                this.emit("stoping");
                break;
            }
            case "VIDEO_PLAYER.BACK_FIVE": {
                this.emit("backing");
                break;
            }
            case "VIDEO_PLAYER.FORWARD_FIVE": {
                this.emit("forwarding");
                break;
            }
            case "VIDEO_PLAYER.RESTART": {
                this.emit("restarting");
                break;
            }
            case "VIDEO_PLAYER.SLIDE_TIME": {
                this.emit("sliding");
                break;
            }
            case "VIDEO_PLAYER.VIDEO_PLAYING": {
                this.emit("videoPlaying");
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