// tslint:disable:import-spacing
import { EventEmitter } from "events";
import * as axios from "axios";
import { IAction } from "../interfaces/interfaces";
import dispatcher from "../dispatcher/dispatcher";
import { serverURL } from "config";
import { IMessages } from "../interfaces/interfaces";
import AuthStore from "./AuthStore";
import { browserHistory } from "react-router";
// tslint:enable:import-spacing

class StackStore extends EventEmitter {

    constructor() {
        super();
    }

    private deleteAction(index: number) {
        const config = {
            headers: { Authorization: "Bearer " + AuthStore.getToken() },
        };
        const url = serverURL + "/actions/" + index;

        axios.default.delete(url, config).then(function(r: axios.AxiosResponse) {
            // console.log("RESULT (XHR): \n %o\nSTATUS: %s", r.data, r.status);
            this.emit("action_deleted");
        }.bind(this)).catch(function(error: axios.AxiosError) {
            // console.log("ERROR (XHR): \n" + error);
            error = typeof error.response === "undefined" ? "UNKNOWN" : error.response.data.error;
            // this.addMessage(true, error);
        }.bind(this));
    }

    public handleActions(action: any) {
        switch (action.type) {
            case "STACK.DELETE_ACTION":
                this.deleteAction(action.index);
                break;
            default:
                break;

        }
    }
}

const store = new StackStore();
export default store;
dispatcher.register(store.handleActions.bind(store));
