import { EventEmitter } from "events"
import { IAction } from "../interfaces"
import dispatcher from "../dispatcher";
import * as axios from 'axios';

class teamStore extends EventEmitter {

   
    niveau: string[] = [];
    equipe: string[] = []; 
    sports: string[]=[];

    constructor() {
        super();
    }
    


    
     GetAllequipe() {
        return this.equipe;
        
    }
     GetAllSports() {
        return this.sports;
        
    }
  
     GetAllNiveau() {
        return this.niveau;
        
    }
    getSportNom(id:string)
    {
         var datastringify =JSON.stringify(this.sports);
		var tabJson = JSON.parse(datastringify);
        var dataRetour="";
         for(var i=0;i<tabJson.length;i++)
            {
                var data =tabJson[i];
               
                if(data.ID==parseInt(id))
                {
                    console.log("yes");
                    dataRetour= data.Nom;
                }
                
              
            }
            return dataRetour;


    }
       getNiveauNom(id:string)
    {
         var datastringify =JSON.stringify(this.niveau);
		var tabJson = JSON.parse(datastringify);
        var dataRetour="";
         for(var i=0;i<tabJson.length;i++)
            {
                var data =tabJson[i];
                if(data.ID==parseInt(id))
                {
                   
                    dataRetour= data.Nom;
                }
                
              
            }
            return dataRetour;
    }
   
    
    
    handleActions(action: IAction){
      
        switch(action.type) {
        
         case "getSports" :
            this.sports=[];
            for(var i=0;i<action.text.length;i++)
            {
                
                
                this.sports.push(action.text[i]);
               
            }
         this.emit("change");
         break;
          case "getNiveau" :
          this.niveau=[];
   
            for(var i=0;i<action.text.length;i++)
            {
                
                
                this.niveau.push(action.text[i]);
              
            }
         this.emit("change");
         break;
         
          case "getEquipe" :
          this.equipe=[];
         
            for(var i=0;i<action.text.length;i++)
            {
                
            
                this.equipe.push(action.text[i]);
               
            }
         this.emit("change");
         break;
          case "PostTeam" :
         if(action.text !="error")
         {
             var laTeam =JSON.parse(action.text);
             this.equipe.push(laTeam);
           
         }
         this.emit("change");
         break;
         
         
        }
        
    }


}





const store = new teamStore;
export default store;
dispatcher.register(store.handleActions.bind(store));