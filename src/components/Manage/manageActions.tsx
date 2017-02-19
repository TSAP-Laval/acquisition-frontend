import dispatcher from "../dispatcher";
import * as axios from 'axios';

export function getSaison() {

     axios.get('http://localhost:3000/api/GetSeasons')
    .then(function(response){

    dispatcher.dispatch({ type: "getActions", text: response.data  });     
    });  
}
export function getSport() {
   
     axios.get('http://localhost:3000/api/getSports')
    .then(function(response){

    dispatcher.dispatch({ type: "getSports", text: response.data  });     
    });  
}
export function getSportJoueur() {
   
     axios.get('http://localhost:3000/api/getSports')
    .then(function(response){

    dispatcher.dispatch({ type: "getSportJoueur", text: response.data  });     
    });  
}
export function getNiveau() {
   
     axios.get('http://localhost:3000/api/getNiveau')
    .then(function(response){


    dispatcher.dispatch({ type: "getNiveau", text: response.data  });     
    });  
}
export function getNiveauJoueur() {
   
     axios.get('http://localhost:3000/api/getNiveau')
    .then(function(response){


    dispatcher.dispatch({ type: "getNiveauJoueur", text: response.data  });     
    });  
}
export function getJoueur() {

     axios.get('http://localhost:3000/api/getJoueur')
    .then(function(response){
   
    dispatcher.dispatch({ type: "getJoueur", text: response.data  });     
    });  
}

export function getEquipes() {

     axios.get('http://localhost:3000/api/getEquipe')
    .then(function(response){
     
    dispatcher.dispatch({ type: "getEquipe", text: response.data  });     
    });  
}
export function getEquipesJoueur() {
    
     axios.get('http://localhost:3000/api/getEquipe')
    .then(function(response){
    
    dispatcher.dispatch({ type: "getEquipesJoueur", text: response.data  });     
    });  
}


 export function   PostSaison(stringContenu: string) {

        axios.post('http://localhost:3000/api/PostSaison', stringContenu).then(function (r: any) {
          
        
            dispatcher.dispatch({ type: "postAction", text: stringContenu  });
        }).catch(function (error: string) {
       
        
            dispatcher.dispatch({ type: "postAction", text: "error"  });
        });
        
}
export function   PostTeam(stringContenu: string) {

        axios.post('http://localhost:3000/api/PostTeam', stringContenu).then(function (r: any) {
          
        
            dispatcher.dispatch({ type: "PostTeam", text: stringContenu  });
        }).catch(function (error: string) {
       
        
            dispatcher.dispatch({ type: "PostTeam", text: "error"  });
        });
        
}
     export function   PostJoueur(stringContenu: string) {

        axios.post('http://localhost:3000/api/PostJoueur', stringContenu).then(function (r: any) {
        
        
            dispatcher.dispatch({ type: "PostJoueur", text: stringContenu  });
        }).catch(function (error: string) {
      
        
            dispatcher.dispatch({ type: "PostJoueur", text: "error"  });
        });
        
    }
    