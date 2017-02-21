import { EventEmitter } from "events"
import { IAction } from "../components/interfaces"
import dispatcher from "../components/dispatcher";
import * as axios from 'axios';

class EditStore extends EventEmitter {

   
    joueurs: string[] = [];
    actions: string[] = []; 
    

    constructor() {
        super();
    }
    


    
     GetAllJoueurs() {
        return this.joueurs;
        
    }
     GetAllActions() {
        return this.actions;
        
    }
   
    
    
    handleActions(action: IAction){
      
        switch(action.type) {
        
         case "getJoueurEdit" :
            this.joueurs=[];
            for(var i=0;i<action.text.length;i++)
            {
                
                
                this.joueurs.push(action.text[i]);
               
            }
         this.emit("change");
         break;
          case "GetActionsEdit" :
          this.actions=[];
   
            for(var i=0;i<action.text.length;i++)
            {
                
                
                this.actions.push(action.text[i]);
              
            }
         this.emit("change");
         break;
         
          case "PostAction" :
         if(action.text !="error")
         {
             var laction =JSON.parse(action.text);
             this.actions.push(laction);
           
         }
         this.emit("change");
         break;
         
         
        }
        
    }


}





const store = new EditStore;
export default store;
dispatcher.register(store.handleActions.bind(store));