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
lstCoachs: any[] = [];
lstTeams:any[] = [];  
lstSports:any[] = [];

TeamTempo:any[] = [];
tempo:any[] = [];  
sportTempo:any[] = [];


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

    this.TeamTempo = [
        {
            ID: 1,
            Name: "Test Lions",
            City: "Quebec"
        },

        {
            ID: 2,
            Name: "Tempo Ligres",
            City: "Trois-Rivières"
        }
    ]

    this.sportTempo = [
        {
            ID: 1,
            Name: "Soccer"
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
        if(this.lstCoachs != null)
        {
            return this.lstCoachs;
        }else  {
            return this.tempo;
        }
    }

    

///
/// Retourne la liste des équipes disponibles
///

    GetAllTeams(){
        if(this.lstTeams != null){
            return this.lstTeams;
        }else  {
            return this.TeamTempo;
        }
    }    


///
/// Retourne la liste des sports disponibles
///

        GetAllSports(){
        if(this.lstSports != null)
        {
            return this.lstSports;
        }else  {
            return this.sportTempo;
        }
    }    


///
/// Retourne la liste des sports disponibles
///
    GetTeamName(id:any [])
    {
        var datastringify =JSON.stringify(this.lstTeams);
		var tabJson = JSON.parse(datastringify);

        var lstIds = JSON.stringify(id);

        var dataRetour= [];
        for(var i=0;i<tabJson.length;i++)
        {
            var data =tabJson[i];   
            for(var j=0;j<lstIds.length;j++)
            { 
                if(data.ID==parseInt(lstIds[j]))
                {
                    dataRetour.push(data.Name);
                }
            }  
        }
        return dataRetour;
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
                this.emit("change");
                break;


            case "GET_SPORTS":
                this.lstSports = [];
                for(var i=0;i<action.text.length;i++)
                {     
                    this.lstSports.push(action.text[i]);  
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