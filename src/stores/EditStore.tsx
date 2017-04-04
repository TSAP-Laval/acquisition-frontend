import { EventEmitter } from "events";
import { IAction } from "../interfaces/interfaces";
import dispatcher from "../dispatcher/dispatcher";
import * as axios from "axios";

class EditStore extends EventEmitter {
    // tslint:disable:member-access
    joueurs: string[];
    actions: string[];

    constructor() {
        super();
        this.joueurs = [];
        this.actions = [];
    }

    GetAllJoueurs = () => {
        return this.joueurs;
    }

    GetAllActions = () => {
        return this.actions;
    }

    sendActionForm = (e: React.MouseEvent<HTMLInputElement>, joueur: HTMLButtonElement, form: HTMLDivElement) => {
        $(form)
            .css({
                /**
                 * Si le bouton dépasse le 2/3 de l'écran, le form apparaîtra à la gauche de celui-ci.
                 */
                // tslint:disable-next-line:object-literal-key-quotes
                "left": (e.pageX <= ($(window).width() / 3) * 2 ? (e.pageX - 100) + "px" : (e.pageX - 600) + "px"),
                // tslint:disable-next-line:object-literal-key-quotes
                "top": (e.pageY - $(".video-container").height() - $("#Enr").height()) + "px",
            })
            .toggleClass("form-open");
    }

    closeActionForm = (form: HTMLDivElement) => {
        $(form).toggleClass("form-open");
    }

    handleActions(action: any){
        switch (action.type) {
            case "MATCH_EDIT.GETJOUEURS": {
                // tslint:disable:prefer-for-of
                for (let i = 0; i < action.text.length; i++)
                {
                    this.joueurs.push(action.text[i]);
                }
                this.emit("change");
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
            case "GetActionsEdit" :
                this.actions = [];
                for (let i = 0; i < action.text.length; i++)
                {
                    this.actions.push(action.text[i]);
                }
                this.emit("actionChange");
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
// tslint:disable-next-line:eofline
dispatcher.register(store.handleActions.bind(store));