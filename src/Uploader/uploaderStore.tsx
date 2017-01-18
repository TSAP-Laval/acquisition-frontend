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
            case "DROP":
                if (!file == null) {
                    console.log('file is here \n' + file);
                }
                this.addAction(action.type);
                this.addAction('OPEN_FORM');
                this.emit("change");
                break;
            case "OPEN_FORM":
                this.addAction('OPEN_FORM');
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
        }
    }
}

const store = new UploadStore;
export default store;
dispatcher.register(store.handleActions.bind(store));