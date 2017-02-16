import dispatcher from "../dispatcher";
import * as axios from 'axios';

export function getSaison() {
    console.log("okay1");
     axios.get('http://localhost:3000/api/GetSeasons')
    .then(function(response){
    console.log(response.data);   
    console.log(response.status);   
    dispatcher.dispatch({ type: "getActions", text: response.data  });     
    });  
}
export function getSport() {
    console.log("okay1");
     axios.get('http://localhost:3000/api/getSports')
    .then(function(response){
    console.log(response.data);   
    console.log(response.status);   
    dispatcher.dispatch({ type: "getSports", text: response.data  });     
    });  
}
export function getNiveau() {
    console.log("okay1");
     axios.get('http://localhost:3000/api/getNiveau')
    .then(function(response){
    console.log(response.data);   
    console.log(response.status);   
    dispatcher.dispatch({ type: "getNiveau", text: response.data  });     
    });  
}
export function getJoueur() {
    console.log("okay3");
     axios.get('http://localhost:3000/api/getJoueur')
    .then(function(response){
    console.log(response.data);   
    console.log(response.status);   
    dispatcher.dispatch({ type: "getJoueur", text: response.data  });     
    });  
}
export function getEquipes() {
    console.log("OKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY");
     axios.get('http://localhost:3000/api/getEquipe')
    .then(function(response){
    console.log(response.data);   
    console.log(response.status);   
    dispatcher.dispatch({ type: "getEquipe", text: response.data  });     
    });  
}

 export function   PostSaison(stringContenu: string) {
        console.log(stringContenu);
        axios.post('http://localhost:3000/api/PostSaison', stringContenu).then(function (r: any) {
            console.log("RESULT (XHR): \n" + r.data + "\nSTATUS: " + r.status);
        
            dispatcher.dispatch({ type: "postAction", text: stringContenu  });
        }).catch(function (error: string) {
            console.log("ERROR (XHR): \n" + error);
        
            dispatcher.dispatch({ type: "postAction", text: "error"  });
        });
        
    }
     export function   PostJoueur(stringContenu: string) {
        console.log("wow im good ");
        console.log(stringContenu);
        axios.post('http://localhost:3000/api/PostJoueur', stringContenu).then(function (r: any) {
            console.log("RESULT (XHR): \n" + r.data + "\nSTATUS: " + r.status);
        
            dispatcher.dispatch({ type: "PostJoueur", text: stringContenu  });
        }).catch(function (error: string) {
            console.log("ERROR (XHR): \n" + error);
        
            dispatcher.dispatch({ type: "PostJoueur", text: "error"  });
        });
        
    }
    