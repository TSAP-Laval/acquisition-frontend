import dispatcher from "../dispatcher";
import {serverURL} from "config"
import * as axios from 'axios';

//Va rechercher toutes les Saisons
export function getSaison() {

     axios.get(serverURL + '/saison')
    .then(function(response){

    dispatcher.dispatch({ type: "getActions", text: response.data  });     
    });  
}
//Va rechercher toutes les sports
export function getSport() {
   
     axios.get(serverURL + '/sports')
    .then(function(response){

    dispatcher.dispatch({ type: "getSports", text: response.data  });     
    });  
}
//Va rechercher toutes les sports pour les joueurs
export function getSportJoueur() {
   
     axios.get(serverURL + '/sports')
    .then(function(response){

    dispatcher.dispatch({ type: "getSportJoueur", text: response.data  });     
    });  
}
//Va rechercher toutes les niveaux
export function getNiveau() {
   
     axios.get(serverURL + '/niveau')
    .then(function(response){


    dispatcher.dispatch({ type: "getNiveau", text: response.data  });     
    });  
}
//Va rechercher toutes les niveaux pour les joueurs
export function getNiveauJoueur() {
   
     axios.get(serverURL + '/niveau')
    .then(function(response){


    dispatcher.dispatch({ type: "getNiveauJoueur", text: response.data  });     
    });  
}
//Va rechercher toutes les joueurs
export function getJoueur() {

     axios.get(serverURL + '/joueur')
    .then(function(response){
   
    dispatcher.dispatch({ type: "getJoueur", text: response.data  });     
    });  
}
//Va rechercher toutes les équipes
export function getEquipes() {

     axios.get(serverURL + '/equipes')
    .then(function(response){
     
    dispatcher.dispatch({ type: "getEquipe", text: response.data  });     
    });  
}
//Va rechercher toutes les niveaux
export function getEquipesJoueur() {
    
     axios.get(serverURL + '/equipes')
    .then(function(response){
    
    dispatcher.dispatch({ type: "getEquipesJoueur", text: response.data  });     
    });  
}
//Ajout d'une saison

 export function   PostSaison(stringContenu: string) {

        axios.post(serverURL + '/saison', stringContenu).then(function (r: any) {

            dispatcher.dispatch({ type: "postAction", text: stringContenu  });
        }).catch(function (error: string) {
       
        
            dispatcher.dispatch({ type: "postAction", text: "error"  });
        });
        
}
//ajout d'une équipe
export function   PostTeam(stringContenu: string) {

        axios.post(serverURL + '/equipes', stringContenu).then(function (r: any) {
          
        
            dispatcher.dispatch({ type: "PostTeam", text: stringContenu  });
        }).catch(function (error: string) {
       
        
            dispatcher.dispatch({ type: "PostTeam", text: "error"  });
        });
        
}
//ajout d'un joueur
     export function   PostJoueur(stringContenu: string) {

        axios.post(serverURL + '/joueur', stringContenu).then(function (r: any) {
        
        
            dispatcher.dispatch({ type: "PostJoueur", text: stringContenu  });
        }).catch(function (error: string) {
      
        
            dispatcher.dispatch({ type: "PostJoueur", text: "error"  });
        });
        
    }
    