import { EventEmitter } from "events";
import { IAction } from "../interfaces/interfaces";
import dispatcher from "../dispatcher/dispatcher";
// tslint:disable-next-line:quotemark
import * as axios from 'axios';

// tslint:disable-next-line:class-name
class playersStore extends EventEmitter {
    private niveau: string[] = [];
    private equipeJoueur: string[] = [];
    private lesJoueurs: string[] = [];
    private sports: string[]= [];

    constructor() {
        super();
    }
    public GetAllJoueurs() {
        return this.lesJoueurs;
    }
    public GetAllequipeJoueur() {
        return this.equipeJoueur;
    }
    public GetAllSports() {
        return this.sports;
    }

    public GetAllNiveau() {
        return this.niveau;

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

    public getEquipeSelonID(id: string)
    {
        const datastringify = JSON.stringify(this.equipeJoueur);
        const tabJson = JSON.parse(datastringify);
        let dataRetour = "";
         // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < tabJson.length; i++)
            {
                const data = tabJson[i];
                // tslint:disable-next-line:radix
                if (data.ID === parseInt(id))
                {

                    dataRetour = data;
                }

            }
        return dataRetour;
    }
    public handleActions(action: IAction){
        switch (action.type) {
         case "PostJoueur" :
         if (action.text !== "error")
         {

             const leJoueur = JSON.parse(action.text);
             this.lesJoueurs.push(leJoueur);
             this.emit("change");
         }

         break;
         case "getSportJoueur" :
            this.sports = [];
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < action.text.length; i++)
            {

                this.sports.push(action.text[i]);

            }
         this.emit("change");
         break;
          case "getJoueur" :
          this.lesJoueurs = [];
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < action.text.length; i++)
            {

                this.lesJoueurs.push(action.text[i]);

            }
         this.emit("change");
         break;
          case "getNiveauJoueur" :
          this.niveau = [];

            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < action.text.length; i++)
            {

                this.niveau.push(action.text[i]);
                ;
            }
         this.emit("change");
         break;
          case "getEquipesJoueur" :
          this.equipeJoueur = [];
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < action.text.length; i++)
            {

                this.equipeJoueur.push(action.text[i]);

            }
         this.emit("change");
         break;
         default:
         break;

        }

    }

}

const store = new playersStore();
export default store;
dispatcher.register(store.handleActions.bind(store));
