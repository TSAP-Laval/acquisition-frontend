import { EventEmitter} from "events";

import Dispatcher from "../dispatcher/dispatcher";
import {IAction} from "../interfaces/interfaces";

/*************************************
   Auteur : Mehdi Laribi
   Store  : Coachs  
 *************************************/

class CoachStore extends EventEmitter{


/*************************************
   Variables
 *************************************/
lstCoachs: any;
lstTeams:any;  

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



/*************************************
   Public functions
 *************************************/

///
/// Retourne la liste des coachs 
///

    GetAllCoachs(){
        if(this.lstCoachs == null)
        {
            return this.tempo;
        }
        else {
        return this.lstCoachs;
        }
    }

    

///
/// Retourne la liste des équipes disponibles
///

    GetAllTeams(){
        if(this.lstTeams != null){
            return this.lstTeams;
        }
    }    


///
/// Gestion des evenement  (Listener)
///
    handleActions(action: IAction){

        switch (action.type) {
            case "POST_COACH":
            if(action.text !="error")
            {
                var c =JSON.parse(action.text);
                this.lstCoachs.push(c);
                this.emit("change");
            }
                break;
            case "GET_COACH":

            this.lstCoachs= [];
                for(var i=0;i<action.text.length;i++)
                {     
                    this.lstCoachs.push(action.text[i]);  
                }
            this.emit("change");
                break;
                
             case "GET_TEAMS":
                this.lstTeams = [];
                   for(var i=0;i<action.text.length;i++)
                {     
                    this.lstTeams.push(action.text[i]);  
                }
            default:
                break;
        }
}
}


const coachStore = new CoachStore;

export default coachStore;
Dispatcher.register(coachStore.handleActions.bind(coachStore));