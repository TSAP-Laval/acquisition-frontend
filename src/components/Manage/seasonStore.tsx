import { EventEmitter } from "events"
import { IAction } from "../interfaces"
import dispatcher from "../dispatcher";
import * as axios from 'axios';

class SeasonStore extends EventEmitter {

    seasons: string[]=[];


    constructor() {
        super();
    }


    GetAllSeasons() {
        return this.seasons;
        
    }



   
    
    handleActions(action: IAction){
       // console.log(action);
        switch(action.type) {
            case "getActions":
            this.seasons=[];
            for(var i=0;i<action.text.length;i++)
            {
                this.seasons.push(action.text[i]);
            }
         this.emit("change");
         
         break;
         case "postAction" :
         if(action.text !="error")
         {
           
             var onTest =JSON.parse(action.text);
             this.seasons.push(onTest);
            this.emit("change");
         }
        
         break;       
        }
        
    }


}





const store = new SeasonStore;
export default store;
dispatcher.register(store.handleActions.bind(store));