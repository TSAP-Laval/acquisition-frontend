import { EventEmitter } from "events";
import { IAction } from "../interfaces/interfaces";
import dispatcher from "../dispatcher/dispatcher";
// tslint:disable-next-line:quotemark
import * as axios from 'axios';

// tslint:disable-next-line:class-name
class teamStore extends EventEmitter {

    private niveau: string[] = [];
    private equipe: string[] = [];
    private uneEquipe: string[] = [];
    private sports: string[]= [];
    private saison: string[]= [];
    private enModif: boolean = false;
    constructor() {
        super();
    }
    public GetAllequipe() {
        return this.equipe;
    }
    public GetUneEquipe() {
        this.enModif = false;
        return this.uneEquipe;
    }
    public EnModification(){
        return this.enModif;
    }
     public GetAllSeason() {
        return this.saison;
    }
     public GetAllSports() {
        return this.sports;
    }
    public GetAllNiveau() {
        return this.niveau;
    }

    public getSportNom(id: string)
    {
        const datastringify = JSON.stringify(this.sports);
        const tabJson = JSON.parse(datastringify);
        let dataRetour = "";
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < tabJson.length; i++)
        {
            const data = tabJson[i];
            // tslint:disable-next-line:radix
            if (data.ID === parseInt(id))
            {
                dataRetour = data.Name;
            }
        }
        return dataRetour;
    }
    public getNiveauNom(id: string)
    {
        const datastringify = JSON.stringify(this.niveau);
        const tabJson = JSON.parse(datastringify);
        let dataRetour = "";
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < tabJson.length; i++)
        {
            const data = tabJson[i];
            // tslint:disable-next-line:radix
            if (data.ID === parseInt(id))
            {
                dataRetour = data.Name;
            }
        }
        return dataRetour;
    }
    public handleActions(action: IAction){
        switch (action.type) {
            case "getSports" :
                this.sports = [];
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < action.text.length; i++)
                {
                    this.sports.push(action.text[i]);

                }
            this.emit("change");
            break;
            case "getNiveau" :
                this.niveau = [];
                    // tslint:disable-next-line:prefer-for-of
                    for (let i = 0; i < action.text.length; i++)
                    {
                        this.niveau.push(action.text[i]);
                    }
                this.emit("change");
            break;
            case "getEquipe" :
                this.equipe = [];

                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < action.text.length; i++)
                {
                    this.equipe.push(action.text[i]);
                }
                this.emit("change");
            break;
            case "getSeasonTeam" :
                this.saison = [];

                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < action.text.length; i++)
                {
                    this.saison.push(action.text[i]);
                }
                this.emit("change");
            break;
             case "getUneEquipe" :
                this.uneEquipe = [];
                this.enModif = true;
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < action.text.length; i++)
                {
                    this.uneEquipe.push(action.text[i]);
                }
                this.emit("change");
            break;
            case "PostTeam" :
                if (action.text !== "error")
                {
                    const laTeam = JSON.parse(action.text);
                    this.equipe.push(laTeam);
                }
                this.emit("change");
            break;
            default:
            break;
        }
    }
}
const store = new teamStore();
export default store;
dispatcher.register(store.handleActions.bind(store));
