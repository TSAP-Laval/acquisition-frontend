import { EventEmitter} from "events";
import Dispatcher from "../dispatcher/dispatcher";
import {IAction} from "../interfaces/interfaces";

class CoachStore extends EventEmitter{

    private coaches: any[] = [];
    private sports: any[] = [];
    private teams: any[] = [];

    private teamTempo: any[] = [];
    private tempo: any[] = [];
    private sportTempo: any[] = [];

    constructor(){
        super();

        this.tempo = [
            {
                Email: "m.laribi@hotmail.com",
                Nom: "Ouyous",
                Prenom: "Youssef",
            },
            {
                Email: "m.aribi@homtail.com",
                Nom: "Mehdi",
                Prenom: "laribi",
            },
        ];

        this.teamTempo = [
            {
                City: "Quebec",
                ID: 1,
                Name: "Test Lions",
            },

            {
                City: "Trois-Rivières",
                ID: 2,
                Name: "Tempo Ligres",
            },
        ];

        this.sportTempo = [
            {
                ID: 1,
                Name: "Soccer",
            },
        ];
    }

    // Retourne la liste des coachs
    private getAllCoachs(){
        if (this.coaches != null)
        {
            return this.coaches;
        }else  {
            return this.tempo;
        }
    }

    // Retourne la liste des équipes disponibles
    private getAllTeams(){
        if (this.teams != null){
            return this.teams;
        }else  {
            return this.teamTempo;
        }
    }

    // Retourne la liste des sports disponibles
    private getAllSports(){
        if (this.sports != null)
        {
            return this.sports;
        } else  {
            return this.sportTempo;
        }
    }

    // Gestion des evenement  (Listener)
    public handleActions(action: IAction){

        switch (action.type) {
            case "POST_COACH":
                if (action.text !== "error")
                {
                    const c = JSON.parse(action.text);
                    this.coaches.push(c);
                    this.emit("change");
                }
                break;
            case "GET_COACH":
                this.coaches = [];
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i  < action.text.length; i++)
                {
                    this.coaches.push(action.text[i]);
                }
                this.emit("change");
                break;
             case "GET_TEAMS":
                this.teams = [];
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i <  action.text.length ; i++)
                {
                    this.teams.push(action.text[i]);
                }
                this.emit("change");
                break;
            case "GET_SPORTS":
                this.sports = [];
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < action.text.length; i++)
                {
                    this.sports.push(action.text[i]);
                }
                this.emit("change");
                break;

            default:
                break;
        }
}
}

const coachStore = new CoachStore();

export default coachStore;
Dispatcher.register(coachStore.handleActions.bind(coachStore));
