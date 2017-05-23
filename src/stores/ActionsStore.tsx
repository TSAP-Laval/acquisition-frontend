// tslint:disable:import-spacing
import { EventEmitter}  from "events";
import Dispatcher       from "../dispatcher/dispatcher";
import { IAction }      from "../interfaces/interfaces";
// tslint:enable:import-spacing

class ActionStore extends EventEmitter{

    private actionsType: any[] = [];
    private mvmActions: any[]= [];

    public constructor(){
        super();
    }

    // Liste des actions
    public getAllActions(){
        if (this.actionsType != null) {
            return this.actionsType;
        }
    }

    public handleActions(action: IAction){
        switch (action.type) {
            case "POST_ACTIONTYPE":
                if (action.text !== "error")
                {
                    const a = JSON.parse(action.text);
                    this.actionsType.push(a);
                }
                this.emit("change");
                this.emit("action_added");
                break;
            case "GET_ACTIONTYPE":
                this.actionsType = [];
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < action.text.length; i++) {
                    this.actionsType.push(action.text[i]);
                }
                this.emit("change");
                break;
            case "GET_MVMTYPE":
                this.mvmActions = [];
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < action.text.length; i++) {
                    this.mvmActions.push(action.text[i]);
                }
                this.emit("change");
                break;
            default:
                break;
        }
    }
}

const actionStore = new ActionStore();
Dispatcher.register(actionStore.handleActions.bind(actionStore));
export default actionStore;
