import dispatcher from "../components/dispatcher";
import * as axios from 'axios';


export function getJoueur() {
    

     axios.default.get('http://localhost:3000/api/joueur')
    .then(function(response:any){
   
    dispatcher.dispatch({ type: "getJoueurEdit", text: response.data  });     
    });  
}

export function getActionsEdit() {
    
     axios.default.get('http://localhost:3000/api/actions')
    .then(function(response:any){
    
    dispatcher.dispatch({ type: "GetActionsEdit", text: response.data  });     
    });  
}


 export function   PostAction(stringContenu: string) {

        axios.default.post('http://localhost:3000/api/actions', stringContenu).then(function (r: any) {
          console.log("wow");
          console.log(r.data);
        
            dispatcher.dispatch({ type: "postActionEdit", text: stringContenu  });
        }).catch(function (error: string) {
       
        
            dispatcher.dispatch({ type: "postActionEdit", text: "error"  });
        });
        
}
