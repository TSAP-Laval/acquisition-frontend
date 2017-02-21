import dispatcher from "../dispatcher";
import * as axios from 'axios';

//Va rechercher toutes les Saisons
export function getSaison() {

     axios.get('http://localhost:3000/api/seasons')
    .then(function(response){

    dispatcher.dispatch({ type: "getActions", text: response.data  });     
    });  
}
//Va rechercher toutes les sports
export function getSport() {
   
     axios.get('http://localhost:3000/api/sports')
    .then(function(response){

    dispatcher.dispatch({ type: "getSports", text: response.data  });     
    });  
}
//Va rechercher toutes les sports pour les joueurs
export function getSportJoueur() {
   
     axios.get('http://localhost:3000/api/sports')
    .then(function(response){

    dispatcher.dispatch({ type: "getSportJoueur", text: response.data  });     
    });  
}
//Va rechercher toutes les niveaux
export function getNiveau() {
   
     axios.get('http://localhost:3000/api/niveau')
    .then(function(response){


    dispatcher.dispatch({ type: "getNiveau", text: response.data  });     
    });  
}
//Va rechercher toutes les niveaux pour les joueurs
export function getNiveauJoueur() {
   
     axios.get('http://localhost:3000/api/niveau')
    .then(function(response){


    dispatcher.dispatch({ type: "getNiveauJoueur", text: response.data  });     
    });  
}
//Va rechercher toutes les joueurs
export function getJoueur() {

     axios.get('http://localhost:3000/api/joueur')
    .then(function(response){
   
    dispatcher.dispatch({ type: "getJoueur", text: response.data  });     
    });  
}
//Va rechercher toutes les équipes
export function getEquipes() {

     axios.get('http://localhost:3000/api/equipes')
    .then(function(response){
     
    dispatcher.dispatch({ type: "getEquipe", text: response.data  });     
    });  
}
//Va rechercher toutes les niveaux
export function getEquipesJoueur() {
    
     axios.get('http://localhost:3000/api/equipes')
    .then(function(response){
    
    dispatcher.dispatch({ type: "getEquipesJoueur", text: response.data  });     
    });  
}
//Ajout d'une saison

 export function   PostSaison(stringContenu: string) {

        axios.post('http://localhost:3000/api/seasons', stringContenu).then(function (r: any) {

            dispatcher.dispatch({ type: "postAction", text: stringContenu  });
        }).catch(function (error: string) {
       
        
            dispatcher.dispatch({ type: "postAction", text: "error"  });
        });
        
}
//ajout d'une équipe
export function   PostTeam(stringContenu: string) {

        axios.post('http://localhost:3000/api/team', stringContenu).then(function (r: any) {
          
        
            dispatcher.dispatch({ type: "PostTeam", text: stringContenu  });
        }).catch(function (error: string) {
       
        
            dispatcher.dispatch({ type: "PostTeam", text: "error"  });
        });
        
}
//ajout d'un joueur
     export function   PostJoueur(stringContenu: string) {

        axios.post('http://localhost:3000/api/joueur', stringContenu).then(function (r: any) {
        
        
            dispatcher.dispatch({ type: "PostJoueur", text: stringContenu  });
        }).catch(function (error: string) {
      
        
            dispatcher.dispatch({ type: "PostJoueur", text: "error"  });
        });
        
    }
    