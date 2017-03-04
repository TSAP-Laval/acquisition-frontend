import dispatcher from "../dispatcher";
import {serverURL} from "config"
import * as axios from 'axios';

//Va rechercher toutes les Saisons
export function getSaison() {
     axios.default.get(serverURL + '/saison')
    .then(function(response: any){
        dispatcher.dispatch({ type: "getActions", text: response.data  });     
    });  
}

//Va rechercher toutes les sports
export function getSport() {
     axios.default.get(serverURL + '/sports')
    .then(function(response: any){
        dispatcher.dispatch({ type: "getSports", text: response.data  });     
    });  
}

//Va rechercher toutes les sports pour les joueurs
export function getSportJoueur() {
     axios.default.get(serverURL + '/sports')
    .then(function(response: any){
        dispatcher.dispatch({ type: "getSportJoueur", text: response.data  });     
    });  
}

//Va rechercher toutes les niveaux
export function getNiveau() {
     axios.default.get(serverURL + '/niveau')
    .then(function(response: any){
        dispatcher.dispatch({ type: "getNiveau", text: response.data  });     
    });  
}

//Va rechercher toutes les niveaux pour les joueurs
export function getNiveauJoueur() {
     axios.default.get(serverURL + '/niveau')
    .then(function(response: any){
        dispatcher.dispatch({ type: "getNiveauJoueur", text: response.data  });     
    });  
}

//Va rechercher toutes les joueurs
export function getJoueur() {
     axios.default.get(serverURL + '/joueur')
    .then(function(response: any){
        dispatcher.dispatch({ type: "getJoueur", text: response.data  });     
    });  
}
//Va rechercher toutes les équipes
export function getEquipes() {
     axios.default.get(serverURL + '/equipes')
    .then(function(response: any){ 
        dispatcher.dispatch({ type: "getEquipe", text: response.data  });     
    });  
}

//Va rechercher toutes les niveaux
export function getEquipesJoueur() {
     axios.default.get(serverURL + '/equipes')
     .then(function(response: any){
        dispatcher.dispatch({ type: "getEquipesJoueur", text: response.data  });     
    });  
}

//Ajout d'une saison
 export function postSaison(stringContenu: string) {
    axios.default.post(serverURL + '/saison', stringContenu).then(function (r: any) {
        dispatcher.dispatch({ type: "postAction", text: stringContenu  });
    }).catch(function (error: string) {
        dispatcher.dispatch({ type: "postAction", text: "error"  });
    });
}
//Ajout d'une équipe
export function postTeam(stringContenu: string) {
    axios.default.post(serverURL + '/equipes', stringContenu).then(function (r: any) {
        dispatcher.dispatch({ type: "PostTeam", text: stringContenu  });
    }).catch(function (error: string) {
        dispatcher.dispatch({ type: "PostTeam", text: "error"  });
    });
}

//Ajout d'un joueur
export function postJoueur(stringContenu: string) {
    axios.default.post(serverURL + '/joueur', stringContenu).then(function (r: any) {
        dispatcher.dispatch({ type: "PostJoueur", text: stringContenu  });
    }).catch(function (error: string) {
        dispatcher.dispatch({ type: "PostJoueur", text: "error"  });
    });
}
    