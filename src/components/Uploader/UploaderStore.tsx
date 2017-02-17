import { EventEmitter } from "events"
import * as axios       from 'axios';

import { IAction }      from "../interfaces"
import dispatcher       from "../dispatcher";
import { serverURL }    from "config"

class UploadStore extends EventEmitter {

    actions: string[] = [];
    progress: string[] = [];
    source: axios.CancelTokenSource

    constructor() {
        super();
        // Cancellation
        this.source = axios.default.CancelToken.source();
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
            file.name + "; boundary=------------------------" + boundary},
            cancelToken: this.source.token
        };

        var form = new FormData()
        form.append('file', file, file.name);

        axios.default.post(serverURL + '/video', form, config).then(function (r: any) {
            console.log("RESULT (XHR): \n" + r.data + "\nSTATUS: " + r.status);
            if (r.data === 'Exist')
                this.addAction('EXIST');
        }).catch(function (error: string) {
            console.log("ERROR (XHR): \n" + error);
        });
    }

    cancelUpload() {
        // We re-initialize the progress counter to 0 to
        // avoid problem in further execution
        this.addProgress("0");
        this.source.cancel('Operation has been canceled.');
        this.addAction('MESSAGE');
        this.addAction('CANCEL');
        this.removeAction('DROP');
        this.source = axios.default.CancelToken.source();
    }

    handleActions(action: IAction){
        switch(action.type) {
            case "DROP":
                this.addAction(action.type);
                this.addAction('OPEN_FORM');
                this.removeAction('ERROR');
                this.removeAction('CANCEL');
                this.removeAction('MESSAGE');
                this.sendVideo(action.video);
                this.emit("CHANGE");
                break;
            case "CANCEL":
                this.cancelUpload()
                this.emit("CANCEL");
                break;
            case "SAVE":
                this.removeAction('OPEN_FORM');
                this.removeAction('OPEN_CONFIRM_FORM');
                this.addAction('MESSAGE');
                this.addAction("SAVE")
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