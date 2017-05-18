import dispatcher from "../dispatcher/dispatcher";
import {serverURL} from "config";
import AuthStore            from "../stores/AuthStore";
import * as axios from "axios";


// Va rechercher toutes les Saisons
export function getSaison() {
     axios.default.get(serverURL + "/saisons")
    .then(function(response: any){
        dispatcher.dispatch({ type: "getActions", text: response.data  });
    });
}
export function getSaisonTeam() {
     axios.default.get(serverURL + "/saisons")
    .then(function(response: any){
        dispatcher.dispatch({ type: "getSeasonTeam", text: response.data  });
    });
}
export function getUneEquipe(Nom: any) {
     axios.default.get(serverURL + "/equipes/" + Nom )
    .then(function(response: any){
        dispatcher.dispatch({ type: "getUneEquipe", text: response.data  });
    });
}
// Modif joueur
export function putJoueur(stringContenu: any, id: any) {
     axios.default.put(serverURL + "/joueurs/" + id, stringContenu)
    .then(function(response: any){
        getJoueur();
    });
}
// Delete joueur
export function deleteJoueur( id: any) {
     axios.default.delete(serverURL + "/joueurs/" + id)
    .then(function(response: any){
        getJoueur();
    });
}
// Modif joueur
export function putTeam(stringContenu: any, id: any) {
     axios.default.put(serverURL + "/equipes/" + id, stringContenu)
    .then(function(response: any){
        getEquipes();
    });
}
// Va rechercher toutes les sports
export function getSport() {
     axios.default.get(serverURL + "/sports")
    .then(function(response: any){
        dispatcher.dispatch({ type: "getSports", text: response.data  });

    });
}
// Va rechercher toutes les sports pour les joueurs
export function getSportJoueur() {
     axios.default.get(serverURL + "/sports")
    .then(function(response: any){

    dispatcher.dispatch({ type: "getSportJoueur", text: response.data  });
    });
}
// Va rechercher toutes les niveau
export function getNiveau() {
     axios.default.get(serverURL + "/niveaux")
    .then(function(response: any){
        dispatcher.dispatch({ type: "getNiveau", text: response.data  });
    });
}
// Va rechercher toutes les niveaux pour les joueurs
export function getNiveauJoueur() {
     axios.default.get(serverURL + "/niveaux")
    .then(function(response: any){
        dispatcher.dispatch({ type: "getNiveauJoueur", text: response.data  });
    });
}
// Va rechercher toutes les joueurs
export function getJoueur() {
        let source: axios.CancelTokenSource;
        source = axios.default.CancelToken.source();
        console.log(source);
        const config = {
            cancelToken: source.token,
            headers: {
                "Authorization": "Bearer " + AuthStore.getToken(),
            },
        };
     axios.default.get(serverURL + "/joueurs",config)
    .then(function(response: any){
        dispatcher.dispatch({ type: "getJoueur", text: response.data  });
    });
}
// Va rechercher toutes les équipes
export function getEquipes() {
         let source: axios.CancelTokenSource;
         source = axios.default.CancelToken.source();
         
        const config = {
            cancelToken: source.token,
            headers: {
                "Authorization": "Bearer " + AuthStore.getToken(),
            },
           
        };
     axios.default.get(serverURL + "/equipes",config)
    .then(function(response: any){
        dispatcher.dispatch({ type: "getEquipe", text: response.data  });
    });
}
// Va rechercher toutes les niveaux
export function getEquipesJoueur() {
      let source: axios.CancelTokenSource;
         source = axios.default.CancelToken.source();
         
        const config = {
            cancelToken: source.token,
            headers: {
                "Authorization": "Bearer " + AuthStore.getToken(),
            },
           
        };
     axios.default.get(serverURL + "/equipes",config)
    .then(function(response: any){
        dispatcher.dispatch({ type: "getEquipesJoueur", text: response.data  });
    });
}

// Ajout d'une saison
 export function postSaison(stringContenu: any) {
    axios.default.post(serverURL + "/saisons", stringContenu)
    .then(function(r: any) {
        dispatcher.dispatch({ type: "postAction", text: stringContenu  });
    }).catch(function(error: string) {
        dispatcher.dispatch({ type: "postAction", text: "error"  });
    });
}

// Ajout d'une équipe
export function postTeam(stringContenu: string) {
        axios.default.post(serverURL + "/equipes", stringContenu).then(function(r: any) {
            dispatcher.dispatch({ type: "PostTeam", text: stringContenu  });
        }).catch(function(error: string) {
            dispatcher.dispatch({ type: "PostTeam", text: "error"  });
        });

}
// Ajout d'un joueur
export function postJoueur(stringContenu: any) {
        axios.default.post(serverURL + "/joueurs", stringContenu).then(function(r: any) {
            dispatcher.dispatch({ type: "PostJoueur", text: stringContenu  });
        }).catch(function(error: string) {
            dispatcher.dispatch({ type: "PostJoueur", text: "error"  });
        });
}
