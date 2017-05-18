import { EventEmitter } from "events";
import { IAction } from "../interfaces/interfaces";
import dispatcher from "../dispatcher/dispatcher";
import * as axios from "axios";

class EditStore extends EventEmitter {

    private joueurs: string[];
    private actions: string[];
    private uneAction: string[];
    private reception: string[];

    constructor() {
        super();
        this.joueurs = [];
        this.actions = [];
    }

    public GetAllJoueurs = () => {
        return this.joueurs;
    }
    public GetAllReception = () => {
        return this.reception;
    }
    public GetUneAction = () => {
        return this.uneAction;
    }

    public GetAllActions = () => {
        return this.actions;
    }

    // tslint:disable-next-line:max-line-length
    public sendActionForm = ( e: React.MouseEvent<HTMLInputElement>, joueur: HTMLButtonElement, form: HTMLDivElement) => {
        $(form)
            .css({
                 // Si le bouton dépasse le 2/3 de l'écran, le form apparaîtra à la gauche de celui-ci.
                // tslint:disable-next-line:object-literal-key-quotes
                "left": (e.pageX <= ($(window).width() / 3) * 2 ? (e.pageX - 100) + "px" : (e.pageX - 600) + "px"),
                // tslint:disable-next-line:object-literal-key-quotes
                "top": (e.pageY - $(".video-container").height() - $("#Enr").height()) + "px",
            })
            .toggleClass("form-open");
    }

    public closeActionForm = (form: HTMLDivElement) => {
        $(form).toggleClass("form-open");
    }

    public handleActions(action: any){
        switch (action.type) {
            case "MATCH_EDIT.GETJOUEURS": {
                // tslint:disable:prefer-for-of
                for (let i = 0; i < action.text.length; i++)
                {
                    this.joueurs.push(action.text[i]);
                }
                this.emit("playersLoaded");
                break;
            }
            case "MATCH_EDIT.REQUEST_ACTION_FORM": {
                this.sendActionForm(action.e, action.joueur, action.form);
                break;
            }
            case "MATCH_EDIT.CLOSE_ACTION_FORM": {
                this.closeActionForm(action.form);
                break;
            }
            case "GetUneAction":
            this.uneAction = [];
            this.uneAction.push(action.text);
            console.log(this.uneAction)
            this.emit("UnChange");
            break;
            case "getReception" :
            this.reception = [];
            for (let i = 0; i < action.text.length; i++)
            {
                    this.reception.push(action.text[i]);
            }
            this.emit("receptionLoaded");
            break;
            case "GetActionsEdit" :
                for (let i = 0; i < action.text.length; i++)
                {
                    this.actions.push(action.text[i]);
                }
                this.emit("actionsLoaded");
                break;
            case "PostAction" :
                if (action.text !== "error")
                {
                    const laction = JSON.parse(action.text);
                    this.actions.push(laction);
                }
                this.emit("actionChange");
                break;
            default:
            break;
        }
    }
}

const store = new EditStore();
export default store;
dispatcher.register(store.handleActions.bind(store));
