import { EventEmitter } from "events"
import { IAction } from "../interfaces"
import dispatcher from "../dispatcher";
import * as axios from 'axios';

class ManageStore extends EventEmitter {

    actions: string[] = [];
    testJoueurs: string[] = [];
    progress: string[] = [];

    constructor() {
        super();
    }


    GetJoueurs() {
        return this.testJoueurs;
    }

    getActions() {
    console.log("okay");
     axios.get('https://localhost:3000/api/edition/GetJoueurs')
    .then(function(response){
    console.log(response.data); 
    //testJoueurs=response.data;
    console.log(response.status); 
    });  
    this.emit("change");
    }


}

const store = new ManageStore;
export default store;
//dispatcher.register(store.handleActions.bind(store));