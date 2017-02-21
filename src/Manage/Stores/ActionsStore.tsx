import { EventEmitter} from "events";

import Dispatcher from '../../dispatcher';
import { IAction } from "../../interfaces"
class ActionStore extends EventEmitter{

    actionsType: object[] = [];
    todo: any;
    constructor(){
        super()
        
        //this.todo.push('[{"Nom": Passe, "Description": Desc }]' );
                
        this.todo = [
            {
                Nom: "Tes",
                Description: "descrit"
            },
            {
                Nom: "Testt1111",
                Description: "descru"  
            }
        ]
        this.actionsType = this.getAllActions();
    }

    getAllActions() :any{
            var http = new XMLHttpRequest();
            var url = "http://localhost:3000/api/GetActionType";

            http.open("GET", url, true);
            http.setRequestHeader('Content-type', 'application/json');
            http.send(null);
            var data = null;
            http.onreadystatechange = function() {
                if (http.readyState === 4) {
                data = JSON.parse(http.responseText);
                }
            }
            return data;
        }

    getAll(){
        return this.todo;
    }


    CreateAction(actionObj:Object){
        //
    }


    handleActions(action: IAction){

        switch (action.type) {
            case "POST_ACTIONTYPE":
               
                break;
            case "GET_ACTIONTYPE":
             this.getAll();
                break;

            default:
                break;
        }

    }

}

const actionStore = new ActionStore;
Dispatcher.register(actionStore.handleActions.bind(actionStore));

export default actionStore;