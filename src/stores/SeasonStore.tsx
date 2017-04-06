import { EventEmitter } from "events";
import { IAction } from "../interfaces/interfaces";
import dispatcher from "../dispatcher/dispatcher";
// tslint:disable-next-line:quotemark
import * as axios from 'axios';

class SeasonStore extends EventEmitter {

    private seasons: string[]= [];
    constructor() {
        super();
    }
    public GetAllSeasons() {
        return this.seasons;
    }
    public handleActions(action: IAction){
        switch ( action.type) {
            case "getActions":
                this.seasons = [];
                // tslint:disable-next-line:prefer-for-of
                for ( let i = 0; i < action.text.length; i++)
                {
                    this.seasons.push(action.text[i]);
                }
                this.emit("change");
            break;
            case "postAction" :
                if (action.text !== "error")
                {
                    const laction = JSON.parse(action.text);
                    this.seasons.push(laction);
                    this.emit("change");
                }
            break;
            default:
            break;
        }

    }

}
const store = new SeasonStore();
export default store;
dispatcher.register(store.handleActions.bind(store));
