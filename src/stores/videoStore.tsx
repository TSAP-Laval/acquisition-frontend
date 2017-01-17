import { EventEmitter } from "events"

class VideoStore extends EventEmitter {

    videos = Array();

    constructor() {
        super();
        this.videos = [
            {id: 1},
            {path: "video/video.mp4"},
            {team: 1}
        ]
    }

    createVideo(path: string, team: number) {
        this.videos.push(
            [
                {"id": this.videos[this.videos.length - 1]["id"] + 1},
                {"path": path},
                {"team": team}
            ]
        );

        this.emit('change');
    }

    getAll() {
        return this.videos;
    }
}

const videoStore = new VideoStore;

export default videoStore;