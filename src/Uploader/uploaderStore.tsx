import { EventEmitter } from "events"
import { IAction } from "../interface"
import dispatcher from "../dispatcher";

class UploadStore extends EventEmitter {

    classes: String[];

    constructor() {
        super();
        this.classes = [];
    }

    addAction(action: string) {
        this.classes.push(action);
    }

    getAll() {
        return this.classes;
    }

    handleActions(action: IAction){
        switch(action.type) {
            case "DRAG_OVER":
                this.classes.push(action.type);
                this.emit("change");
        }
    }
}

const store = new UploadStore;

export default store;

dispatcher.register(store.handleActions.bind(store));