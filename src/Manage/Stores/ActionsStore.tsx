import { EventEmitter} from "events";

import Dispatcher from '../../dispatcher';
import { IAction } from "../../interfaces"


class ActionStore extends EventEmitter{

    actionsType: any;
    todo: any;
    constructor(){
        super()
                
        this.todo = [
            {
                Nom: "Tes",
                Description: "descrit",
                TypeControl: "Negative",
                TypeMouvement : "Acquisition"
            },
            {
                Nom: "Testt1111",
                Description: "descru",
                TypeControl: "Positive",
                TypeMouvement : "Acquisition"
            }
        ]
    }

    getAllActions(){
        if(this.actionsType == null)
        {
            return this.todo;
        }
        else {
            return this.actionsType;
            }
        }


    handleActions(action: IAction){

        switch (action.type) {
            case "POST_ACTIONTYPE":
               this.emit("change");
                break;
            case "GET_ACTIONTYPE":

            this.actionsType= [];
                for(var i=0;i<action.text.length;i++)
                {     
                    this.actionsType.push(action.text[i]);  
                }
            this.emit("change");
                break;

            default:
                break;
        }

    }

}

const actionStore = new ActionStore;
Dispatcher.register(actionStore.handleActions.bind(actionStore));
export default actionStore;