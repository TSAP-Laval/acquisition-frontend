import dispatcher from "../dispatcher/dispatcher";
import {serverURL} from "config"
import * as axios from 'axios';

export function getJoueur() {
    axios.default.get(serverURL+'/api/joueur')
    .then(function(response:any){  
        dispatcher.dispatch({ type: "getJoueurEdit", text: response.data  });     
    });  
}
export function getActionsEdit() {   
     axios.default.get(serverURL +'/api/actions')
    .then(function(response:any){
        dispatcher.dispatch({ type: "GetActionsEdit", text: response.data  });     
    });  
}
export function postAction(stringContenu: string) {
    axios.default.post(serverURL +'/api/actions', stringContenu)
    .then(function (r: any) {
        dispatcher.dispatch({ type: "postActionEdit", text: stringContenu  });
    }).catch(function (error: string) {   
        dispatcher.dispatch({ type: "postActionEdit", text: "error"  });
    })    
}