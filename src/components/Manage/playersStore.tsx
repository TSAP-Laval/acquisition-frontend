import { EventEmitter } from "events"
import { IAction } from "../interfaces"
import dispatcher from "../dispatcher";
import * as axios from 'axios';

class playersStore extends EventEmitter {


    niveau: string[] = [];
    equipeJoueur: string[] = [];
    lesJoueurs: string[] = [];
    sports: string[]=[];

    constructor() {
        super();
    }



    GetAllJoueurs() {
        return this.lesJoueurs;
        
    }
     GetAllequipeJoueur() {
        return this.equipeJoueur;
        
    }
     GetAllSports() {
        return this.sports;
        
    }

     GetAllNiveau() {
        return this.niveau;
        
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
                   
                    dataRetour= data.Name;
                }
                
              
            }
            return dataRetour;
    }
   
       getEquipeSelonID(id:string)
    {
         var datastringify =JSON.stringify(this.equipeJoueur);
		var tabJson = JSON.parse(datastringify);
        var dataRetour="";
         for(var i=0;i<tabJson.length;i++)
            {
                var data =tabJson[i];
                if(data.ID==parseInt(id))
                {
                   
                    dataRetour= data;
                }
                
              
            }
            return dataRetour;
    }


   
    
    

    
    handleActions(action: IAction){
        switch(action.type) {
         case "PostJoueur" :
         if(action.text !="error")
         {
           
             var leJoueur =JSON.parse(action.text);
             this.lesJoueurs.push(leJoueur);
            this.emit("change");
         }
        
         break;
         case "getSportJoueur" :
            this.sports=[];
            for(var i=0;i<action.text.length;i++)
            {
                
                
                this.sports.push(action.text[i]);
               
            }
         this.emit("change");
         break;
          case "getJoueur" :
          this.lesJoueurs=[];      
            for(var i=0;i<action.text.length;i++)
            {
                
                
                this.lesJoueurs.push(action.text[i]);
               
            }
         this.emit("change");
         break;
          case "getNiveauJoueur" :
          this.niveau=[];
   
            for(var i=0;i<action.text.length;i++)
            {
                
                
                this.niveau.push(action.text[i]);
              ;
            }
         this.emit("change");
         break;
          case "getEquipesJoueur" :
          this.equipeJoueur=[];
         
            for(var i=0;i<action.text.length;i++)
            {
                
            
                this.equipeJoueur.push(action.text[i]);
               
            }
         this.emit("change");
         break;
         
         
        }
        
    }


}





const store = new playersStore;
export default store;
dispatcher.register(store.handleActions.bind(store));