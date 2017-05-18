// tslint:disable:import-spacing
import dispatcher    from "../../dispatcher/dispatcher";
import * as axios    from "axios";
import { serverURL } from "config";
import AuthStore            from "../../stores/AuthStore";
// tslint:enable:import-spacing

export function getActionTypes(){
    let source: axios.CancelTokenSource;
         source = axios.default.CancelToken.source();
         
        const config = {
            cancelToken: source.token,
            headers: {
                "Authorization": "Bearer " + AuthStore.getToken(),
            },
           
     };
    axios.default.get(serverURL + "/action/types")
        .then(function(response: axios.AxiosResponse){
            dispatcher.dispatch({
                text: response.data,
                type: "GET_ACTIONTYPE",
            });
        });
}

export function postNewActionType(actionTypeData: any){
    axios.default.post(serverURL + "/action/addactiontype", actionTypeData)
        .then(function(response: axios.AxiosResponse){
            dispatcher.dispatch({type: "POST_ACTIONTYPE", text: actionTypeData});
        }).catch(function(error: axios.AxiosError){
            dispatcher.dispatch({ type: "POST_ACTIONTYPE", text: "error"  });
        });
}

export function getCoachs(){
    axios.default.get(serverURL + "/coachs/coachs")
        .then(function(response: axios.AxiosResponse){
            dispatcher.dispatch({
                text: response.data,
                type: "GET_COACH",
            });
    }).catch(function(error: axios.AxiosError){
            dispatcher.dispatch({ type: "GET_COACH", text: "error"  });
    });
}

export function postCoach(coachData: string){
    axios.default.post(serverURL + "/coachs/addcoach", coachData)
        .then(function(response: axios.AxiosResponse){
                dispatcher.dispatch({type: "POST_COACH", text: coachData});
        }).catch(function(error: axios.AxiosError){
            dispatcher.dispatch({ type: "POST_COACH", text: "error"  });
        });
}

export function getMvmActions(){
    axios.default.get(serverURL + "/action/movementType")
        .then(function(response: axios.AxiosResponse){
            dispatcher.dispatch({
                text: response.data,
                type: "GET_MVMTYPE",
            });
        }).catch(function(error: axios.AxiosError){
            dispatcher.dispatch({ type: "GET_MVMTYPE", text: "error"  });
    });
}

export function getAllTeams(){
    axios.default.get(serverURL + "/equipes")
        .then(function(response: axios.AxiosResponse){
            dispatcher.dispatch({
                text: response.data,
                type: "GET_TEAMS",
            });
        })
        .catch(function(error: axios.AxiosError){
            dispatcher.dispatch({type: "GET_TEAMS", text: "failed to retrieve your teams."});
        });
}

export function getAllSports(){
    axios.default.get(serverURL + "/sports")
        .then(function(response: axios.AxiosResponse){
            dispatcher.dispatch({
                text: response.data,
                type: "GET_SPORTS",
            });
        })
        .catch(function(error: axios.AxiosError){
            dispatcher.dispatch({type: "GET_SPORTS", text: "failed to retrieve your sports."});
        });
}
