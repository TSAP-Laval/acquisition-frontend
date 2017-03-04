import dispatcher from "../dispatcher";
import * as axios from 'axios';


export function getActionTypes(){

    axios.get("http://localhost:3000/api/GetActionType")
        .then(function(response){
            dispatcher.dispatch({type: "GET_ACTIONTYPE",
                text: response.data});
        });  
}


export function PostNewActionType(actionTypeData:string){
    axios.post("http://localhost:3000/api/PostActionType", actionTypeData)
        .then(function(response){
            console.log(response.data);

                dispatcher.dispatch({type: "POST_ACTIONTYPE", text: actionTypeData});

        }).catch(function(error:string){
            dispatcher.dispatch({ type: "POST_ACTIONTYPE", text: "error"  });
        });
}


export function GetCoachs(){

    axios.get("http://localhost:3000/api/coachs/getAllCoachs")
        .then(function(response){
            dispatcher.dispatch({type: "GET_COACH",
                text: response.data});    
    }).catch(function(error:string){
            dispatcher.dispatch({ type: "GET_COACH", text: "error"  });
    });  
}


export function PostCoach(coachData:string){
    axios.post("http://localhost:3000/api/coachs/postCoach", coachData)
        .then(function(response){
            console.log(response.data);
                dispatcher.dispatch({type: "POST_COACH", text: coachData});
        }).catch(function(error:string){
            dispatcher.dispatch({ type: "POST_COACH", text: "error"  });
        });
}
