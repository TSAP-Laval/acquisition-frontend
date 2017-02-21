import dispatcher from "../components/dispatcher";
import * as axios from 'axios';


export function getJoueur() {
    

     axios.get('http://localhost:3000/api/Joueur')
    .then(function(response){
   
    dispatcher.dispatch({ type: "getJoueurEdit", text: response.data  });     
    });  
}

export function getActionsEdit() {
    
     axios.get('http://localhost:3000/api/Actions')
    .then(function(response){
    
    dispatcher.dispatch({ type: "GetActionsEdit", text: response.data  });     
    });  
}


 export function   PostAction(stringContenu: string) {

        axios.post('http://localhost:3000/api/Actions', stringContenu).then(function (r: any) {
          console.log("wow");
          console.log(r.data);
        
            dispatcher.dispatch({ type: "postActionEdit", text: stringContenu  });
        }).catch(function (error: string) {
       
        
            dispatcher.dispatch({ type: "postActionEdit", text: "error"  });
        });
        
}
