import { EventEmitter} from "events";

import Dispatcher from '../dispatcher/dispatcher';
import { IAction } from "../interfaces/interfaces"


/*************************************
   Auteur : Mehdi Laribi
   Store  : Actions
 *************************************/
class ActionStore extends EventEmitter{


/*************************************
   Variables
 *************************************/

    actionsType: any[] = [];
    mvmActions: any[]=[];
    constructor(){
        super()
    }




/*************************************
   Public functions
 *************************************/

///
/// Retourne la liste des actions 
///

    getAllActions(){
        if(this.actionsType != null)
        {
            return this.actionsType;
        }
        }

///
/// Gestion des evenement  (Listener)
///
    handleActions(action: IAction){

        switch (action.type) {
            case "POST_ACTIONTYPE":
            if(action.text !="error")
         {
             var a =JSON.parse(action.text);
             this.actionsType.push(a);
         }
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
            
            case "GET_MVMTYPE":
                this.mvmActions = [];
                for(var i=0;i<action.text.length;i++)
                {     
                    this.mvmActions.push(action.text[i]);  
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