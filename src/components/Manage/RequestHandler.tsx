import dispatcher from "../../dispatcher/dispatcher";
import * as axios from "axios";

import { serverURL } from "config";

export function getActionTypes(){
    axios.default.get(serverURL + "/action/actiontype")
        .then(function(response){
            dispatcher.dispatch({type: "GET_ACTIONTYPE",
                // tslint:disable-next-line:object-literal-sort-keys
                text: response.data});
        });
}

export function postNewActionType(actionTypeData: string){
    axios.default.post(serverURL + "/action/addactiontype", actionTypeData)
        .then(function(response){
                dispatcher.dispatch({type: "POST_ACTIONTYPE", text: actionTypeData});
        }).catch(function(error: string){
            dispatcher.dispatch({ type: "POST_ACTIONTYPE", text: "error"  });
        });
}

export function getCoachs(){
    axios.default.get(serverURL + "/coaches")
        .then(function(response){
            dispatcher.dispatch({type: "GET_COACH",
            // tslint:disable-next-line:object-literal-sort-keys
                text: response.data});
    }).catch(function(error: string){
            dispatcher.dispatch({ type: "GET_COACH", text: "error"  });
    });
}

export function postCoach(coachData: string){
    axios.default.post(serverURL + "/coaches/addcoach", coachData)
        .then(function(response){
                dispatcher.dispatch({type: "POST_COACH", text: coachData});
        }).catch(function(error: string){
            dispatcher.dispatch({ type: "POST_COACH", text: "error"  });
        });
}

export function getMvmActions(){
    axios.default.get(serverURL + "/action/movementType")
        .then(function(response){
            dispatcher.dispatch({type: "GET_MVMTYPE",
            // tslint:disable-next-line:object-literal-sort-keys
                text: response.data});
    }).catch(function(error: string){
            dispatcher.dispatch({ type: "GET_MVMTYPE", text: "error"  });
    });
}

export function getAllTeams(){
    axios.default.get(serverURL + "/equipes" )
        .then(function(response){
            dispatcher.dispatch({type: "GET_TEAMS",
            // tslint:disable-next-line:object-literal-sort-keys
                text: response.data});
        })
        .catch(function(error: string){
            dispatcher.dispatch({type: "GET_TEAMS", text: "failed to retrieve your teams."});
        });
}

export function getAllSports(){
    axios.default.get(serverURL + "/sports")
        .then(function(response){
            dispatcher.dispatch({type: "GET_SPORTS",
            // tslint:disable-next-line:object-literal-sort-keys
                text: response.data});
        })
        .catch(function(error: string){
            dispatcher.dispatch({type: "GET_SPORTS", text: "failed to retrieve your sports."});
        });
}

export function putCoach(id: any, stringContenu: string){
    axios.default.put(serverURL + "/coaches/editcoach/" + id, stringContenu)
    .then(function(response: any){
            dispatcher.dispatch({type: "PUT_COACH",
            // tslint:disable-next-line:object-literal-sort-keys
                text: response.data});
        })
        .catch(function(error: string){
            dispatcher.dispatch({type: "PUT_COACH", text: "failed to edit the coach."});
        });
}
