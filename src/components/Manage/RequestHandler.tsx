import dispatcher    from "../../dispatcher/dispatcher";
import * as axios    from 'axios';

import { serverURL } from 'config'

export function getActionTypes(){
    axios.default.get(serverURL + "/action/actiontype")
        .then(function(response){
            dispatcher.dispatch({type: "GET_ACTIONTYPE",
                text: response.data});
        });  
}

export function postNewActionType(actionTypeData:string){
    axios.default.post(serverURL + "/action/addactiontype", actionTypeData)
        .then(function(response){
            console.log(response.data);
                dispatcher.dispatch({type: "POST_ACTIONTYPE", text: actionTypeData});
        }).catch(function(error:string){
            dispatcher.dispatch({ type: "POST_ACTIONTYPE", text: "error"  });
        });
}

export function getCoachs(){
    
    axios.default.get(serverURL + "/coachs/coachs")
        .then(function(response){
            dispatcher.dispatch({type: "GET_COACH",
                text: response.data});    
    }).catch(function(error:string){
            dispatcher.dispatch({ type: "GET_COACH", text: "error"  });
    });  
}

export function postCoach(coachData:string){
    axios.default.post(serverURL + "/coachs/addcoach", coachData)
        .then(function(response){
            console.log(response.data);
                dispatcher.dispatch({type: "POST_COACH", text: coachData});
        }).catch(function(error:string){
            dispatcher.dispatch({ type: "POST_COACH", text: "error"  });
        });
}


export function getMvmActions(){
    axios.default.get(serverURL + "/action/movementType")
        .then(function(response){
            dispatcher.dispatch({type: "GET_MVMTYPE",
                text: response.data});    
    }).catch(function(error:string){
            dispatcher.dispatch({ type: "GET_MVMTYPE", text: "error"  });
    });  
}


export function getAllTeams(){
    axios.default.get(serverURL + "/equipes")
        .then(function(response){
            dispatcher.dispatch({type:"GET_TEAMS",
                text: response.data});
        })
        .catch(function(error:string){
            dispatcher.dispatch({type: "GET_TEAMS", text: "failed to retrieve your teams. nt gg wp"});
        });
}



export function getAllSports(){
    axios.default.get(serverURL + "/sports")
        .then(function(response){
            dispatcher.dispatch({type:"GET_SPORTS",
                text: response.data});
        })
        .catch(function(error:string){
            dispatcher.dispatch({type: "GET_SPORTS", text: "failed to retrieve your sports. nt gg wp"});
        });
}

export function GetTeamById(id:any) {
     axios.default.put(serverURL + '/equipes/'+id)
    .then(function(response: any){
        dispatcher.dispatch({type:"GET_TEAMS_NAME",
                text: response.data});
        })
        .catch(function(error:string){
            dispatcher.dispatch({type: "GET_TEAMS_NAME", text: "failed to retrieve your teams. nt gg wp"});
        });
}