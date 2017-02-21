import { EventEmitter} from "events";

import Dispatcher from "../../dispatcher";
import {IAction} from "../../interfaces";

class CoachStore extends EventEmitter{

lstCoachs: any;
    tempo:any;
constructor(){
    super();

    this.tempo = [
            {
                Nom: "Ouyous",
                Prenom: "Youssef",
                Email: "m.laribi@hotmail.com"
            },
            {
                Nom: "Mehdi",
                Prenom: "laribi",
                Email: "m.aribi@homtail.com"  
    }
    
    ]
}


    GetAllCoachs(){
        if(this.lstCoachs == null)
        {
            return this.tempo;
        }
        else {
        return this.lstCoachs;
        }
    }


    handleActions(action: IAction){

        switch (action.type) {
            case "POST_COACH":

               this.emit("change");
                break;
            case "GET_COACH":

            this.lstCoachs= [];
                for(var i=0;i<action.text.length;i++)
                {     
                    this.lstCoachs.push(action.text[i]);  
                }
            this.emit("change");
                break;

            default:
                break;
        }
}
}


const coachStore = new CoachStore;

export default coachStore;
Dispatcher.register(coachStore.handleActions.bind(coachStore));