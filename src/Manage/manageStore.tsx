import { EventEmitter } from "events"
import { IAction } from "../interfaces"
import dispatcher from "../dispatcher";
import * as axios from 'axios';

class ManageStore extends EventEmitter {

    actions: string[] = [];
    niveau: string[] = [];
    equipe: string[] = [];
    testJoueurs: string[] = [];
    seasons: string[]=[];
    sports: string[]=[];
    progress: string[] = [];

    constructor() {
        super();
    }
     addAction(testJoueurs2: string[]) {
       this.testJoueurs=testJoueurs2
    }


    GetAllJoueurs() {
        console.log("wowo2222");
        console.log(this.testJoueurs);
        return this.testJoueurs;
        
    }
     GetAllequipe() {
        return this.equipe;
        
    }
     GetAllSports() {
        return this.sports;
        
    }
    GetAllSeasons() {
        return this.seasons;
        
    }
     GetAllNiveau() {
        return this.niveau;
        
    }


   
    
    
   
    sendEntraineur(stringContenu: string) {
        var test = JSON.parse(stringContenu)
        axios.post('http://localhost:3000/api/PostJoueur', test).then(function (r: any) {
            console.log("RESULT (XHR): \n" + r.data + "\nSTATUS: " + r.status);
                this.addAction(stringContenu);
        }).catch(function (error: string) {
            console.log("ERROR (XHR): \n" + error);
        });
    }
    
    handleActions(action: IAction){
        console.log(action);
        switch(action.type) {
            case "getActions":
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
         case "PostJoueur" :
         if(action.text !="error")
         {
           
             var onTest =JSON.parse(action.text);
             this.testJoueurs.push(onTest);
             console.log("wow omg lets go");
             console.log(onTest);
            this.emit("change");
         }
        
         break;
         case "getSports" :
       
            for(var i=0;i<action.text.length;i++)
            {
                
                
                this.sports.push(action.text[i]);
               
            }
         this.emit("change");
         break;
          case "getJoueur" :
            console.log("omgggggggggg finaly");
            for(var i=0;i<action.text.length;i++)
            {
                
                
                this.testJoueurs.push(action.text[i]);
               
            }
         this.emit("change");
         break;
          case "getNiveau" :
   
            for(var i=0;i<action.text.length;i++)
            {
                
                
                this.niveau.push(action.text[i]);
              ;
            }
         this.emit("change");
         break;
          case "getEquipe" :
         
            for(var i=0;i<action.text.length;i++)
            {
                
            
                this.equipe.push(action.text[i]);
               
            }
         this.emit("change");
         break;
         
         
        }
        
    }


}





const store = new ManageStore;
export default store;
dispatcher.register(store.handleActions.bind(store));