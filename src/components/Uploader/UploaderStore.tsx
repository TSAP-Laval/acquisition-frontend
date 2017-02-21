import { EventEmitter } from "events"
import * as axios       from 'axios';

import { IAction }      from "../interfaces"
import dispatcher       from "../dispatcher";
import { serverURL }    from "config"

class UploadStore extends EventEmitter {

    actions: string[] = [];
    progress: string[] = [];

    constructor() {
        super();
    }

    addAction(action: string) {
        var index = this.actions.indexOf(action);
        if (index === -1)
            this.actions.push(action);
    }

    removeAction(action: string) {
        var index = this.actions.indexOf(action);
        if (index !== -1)
            this.actions.splice(index, 1);
    }

    addProgress(text: string) {
        this.progress.pop();
        this.progress.push(text);
    }

    getActions() {
        return this.actions;
    }

    getProgress() {
        return this.progress;
    }

    onProgress(progressEvent: any) {
        var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
        
        this.addProgress(percentCompleted.toString());
        
        if (percentCompleted == 100) {
            this.addAction('MESSAGE');
            this.addAction('UPLOAD_SUCCESS');
            this.removeAction('DROP');
        }
        
        this.emit("CHANGE");
    }

    sendVideo(file: File) {
        var boundary = Math.random().toString().substr(2);

        var config = {
            onUploadProgress: this.onProgress.bind(this),
            headers: {'Content-Type': "multipart/form-data; filename=" + 
            file.name + "; boundary=------------------------" + boundary}
        };

        var form = new FormData()
        form.append('file', file, file.name);

        axios.post(serverURL + '/video', form, config).then(function (r: any) {
            console.log("RESULT (XHR): \n" + r.data + "\nSTATUS: " + r.status);
            if (r.data === 'Exist')
                this.addAction('EXIST');
        }).catch(function (error: string) {
            console.log("ERROR (XHR): \n" + error);
        });
    }

    handleActions(action: IAction){
        switch(action.type) {
            case "DROP":
                this.addAction(action.type);
                this.addAction('OPEN_FORM');
                this.removeAction('ERROR');
                this.sendVideo(action.video);
                this.emit("CHANGE");
                break;
            case "SAVE":
                this.removeAction('OPEN_FORM');
                this.removeAction('OPEN_CONFIRM_FORM');
                this.removeAction('MESSAGE');
                this.emit("CHANGE");
                break;
            case "CLOSE_FORM":
                this.removeAction('OPEN_FORM');
                this.removeAction('DROP');
                this.removeAction('OPEN_CONFIRM_FORM');
                this.removeAction('MESSAGE');
                this.emit("CHANGE");
                break;
            case "OPEN_CONFIRM_FORM":
                this.addAction('OPEN_CONFIRM_FORM');
                this.emit("CHANGE");
                break;
            case "CLOSE_CONFIRM_FORM":
                this.removeAction('OPEN_CONFIRM_FORM');
                this.removeAction('MESSAGE');
                this.emit("CHANGE");
                break;
            case "OPEN_ERROR":
                this.addAction('MESSAGE');
                this.addAction(action.text)
                this.emit("CHANGE");
                break;
        }
    }
}

const store = new UploadStore;
export default store;
dispatcher.register(store.handleActions.bind(store));