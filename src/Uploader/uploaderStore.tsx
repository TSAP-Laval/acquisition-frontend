import { EventEmitter } from "events"
import { IAction } from "../interfaces"
import dispatcher from "../dispatcher";
import * as axios from 'axios';

class UploadStore extends EventEmitter {

    actions: string[];

    constructor() {
        super();
        this.actions = [];
    }

    addAction(action: string) {
        if (this.actions.indexOf(action) === -1)
            this.actions.push(action);
    }

    removeAction(action: string) {
        var index = this.actions.indexOf(action)
        if (index !== -1)
            this.actions.splice(index, 1);
    }

    getAll() {
        return this.actions;
    }

    sendVideo(file: File) {
        axios.post('http://localhost:3000/api/video', {
            file: file
        },
        {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(function (r: any) {
            console.log("RESULT: \n" + r.data + "\nSTATUS: " + r.status);
        }).catch(function (error: string) {
            console.log("ERROR: \n" + error);
        });
    }

    handleActions(action: IAction){
        console.log('TYPE' + action.type);
        console.log('TEXTE' + action.text);
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