import dispatcher from "../dispatcher/dispatcher";
import {serverURL} from "config"
import * as axios from 'axios';


export function getJoueur() {
    console.log("okay wtf");
    axios.default.get(serverURL+'/joueur')
    .then(function(response:any){  
        dispatcher.dispatch({ type: "getJoueurEdit", text: response.data  });     
    });  
}
export function getActionsEdit() {   
     axios.default.get(serverURL +'/actions')
    .then(function(response:any){
        dispatcher.dispatch({ type: "GetActionsEdit", text: response.data  });     
    });  
}
export function postAction(stringContenu: string) {
    axios.default.post(serverURL +'/actions', stringContenu)
    .then(function (r: any) {
        dispatcher.dispatch({ type: "postActionEdit", text: stringContenu  });
    }).catch(function (error: string) {   
        dispatcher.dispatch({ type: "postActionEdit", text: "error"  });
    })    
}