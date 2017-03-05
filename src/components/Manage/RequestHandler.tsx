import dispatcher    from "../../dispatcher/dispatcher";
import * as axios    from 'axios';

import { serverURL } from 'config'

export function getActionTypes(){
    axios.default.get(serverURL + "/GetActionType")
        .then(function(response){
            dispatcher.dispatch({type: "GET_ACTIONTYPE",
                text: response.data});
        });  
}

export function postNewActionType(actionTypeData:string){
    axios.default.post(serverURL + "PostActionType", actionTypeData)
        .then(function(response){
            console.log(response.data);
                dispatcher.dispatch({type: "POST_ACTIONTYPE", text: actionTypeData});
        }).catch(function(error:string){
            dispatcher.dispatch({ type: "POST_ACTIONTYPE", text: "error"  });
        });
}

export function getCoachs(){
    axios.default.get(serverURL + "coachs/getAllCoachs")
        .then(function(response){
            dispatcher.dispatch({type: "GET_COACH",
                text: response.data});    
    }).catch(function(error:string){
            dispatcher.dispatch({ type: "GET_COACH", text: "error"  });
    });  
}

export function postCoach(coachData:string){
    axios.default.post(serverURL + "/coachs/postCoach", coachData)
        .then(function(response){
            console.log(response.data);
                dispatcher.dispatch({type: "POST_COACH", text: coachData});
        }).catch(function(error:string){
            dispatcher.dispatch({ type: "POST_COACH", text: "error"  });
        });
}
