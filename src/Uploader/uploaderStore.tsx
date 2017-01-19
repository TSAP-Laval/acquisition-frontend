import { EventEmitter } from "events"
import { IAction } from "../interfaces"
import dispatcher from "../dispatcher";
import * as axios from 'axios';

interface Dict {
    [key: string]: string;
}

class UploadStore extends EventEmitter {

    actions: {[key: string]: string} = { };

    constructor() {
        super();
    }

    addAction(action: string, text: string = null) {
        this.actions[action]
        var index = this.actions[action];
        if (index === null)
            this.actions[action] = text;
    }

    removeAction(action: string) {
        var index = this.actions[action];
        if (index !== null)
            delete this.actions[action];
    }

    getAll() {
        return this.actions;
    }

    onProgress(progressEvent: any) {
        var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
        console.log(percentCompleted);
        //this.removeAction("PROGRESS:" + percentCompleted);
        this.addAction("PROGRESS:", percentCompleted.toString());
    }

    sendVideo(file: File) {

        var config = {
            onUploadProgress: this.onProgress.bind(this),
            headers: {'Content-Type': "multipart/form-data; boundary=------------------------" + boundary}
        };


        var form = new FormData()
        form.append('file', file, file.name);

        var boundary = Math.random().toString().substr(2);

        console.log(file);
        axios.post('http://localhost:3000/api/video', form, config).then(function (r: any) {
            console.log("RESULT: \n" + r.data + "\nSTATUS: " + r.status);
        }).catch(function (error: string) {
            console.log("ERROR: \n" + error);
        });
    }

    handleActions(action: IAction){
        switch(action.type) {
            case "DROP":
                this.addAction(action.type);
                this.addAction('OPEN_FORM');
                this.removeAction('ERROR');
                this.sendVideo(action.video);
                this.emit("change");
                break;
            case "CLOSE_FORM":
                this.removeAction('OPEN_FORM');
                this.removeAction('DROP');
                this.emit("change");
                break;
            case "OPEN_CONFIRM_FORM":
                this.addAction('OPEN_CONFIRM_FORM');
                this.emit("change");
                break;
            case "CLOSE_CONFIRM_FORM":
                this.removeAction('OPEN_CONFIRM_FORM');
                this.emit("change");
                break;
            case "OPEN_ERROR":
                this.addAction('ERROR');
                this.addAction(action.text)
                this.emit("change");
                break;
        }
    }
}

const store = new UploadStore;
export default store;
dispatcher.register(store.handleActions.bind(store));