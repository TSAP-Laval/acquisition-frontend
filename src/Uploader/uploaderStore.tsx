import { EventEmitter } from "events"
import { IAction } from "../interface"
import dispatcher from "../dispatcher";

class UploadStore extends EventEmitter {

    classes: string[];

    constructor() {
        super();
        this.classes = [];
    }

    addAction(action: string) {
        console.log('index : ' + this.classes.indexOf(action));
        if (this.classes.indexOf(action) === -1)
            this.classes.push(action);
    }

    removeAction(action: string) {
        var index = this.classes.indexOf(action)
        this.classes.splice(index, 1);
    }

    getAll() {
        return this.classes;
    }

    handleActions(action: IAction, file: File){
        switch(action.type) {
            case "dragenter":
                this.addAction(action.type);
                this.emit("change");
                break;
            case "dragleave":
                this.removeAction(action.type);
                this.emit("change");
                break;
            case "drop":
                if (!file == null) {
                    console.log('file is here \n' + file);
                }
                this.removeAction("dragenter");
                this.addAction(action.type);
                this.emit("change");
                break;

        }
    }
}

const store = new UploadStore;

export default store;

dispatcher.register(store.handleActions.bind(store));