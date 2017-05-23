// tslint:disable:import-spacing
import * as React     from "react";
import * as ReactDOM  from "react-dom";
import Store          from "../stores/EditStore";
import VideoStore     from "../stores/VideoPlayerStore";
import UploaderStore  from "../stores/UploaderStore";
import Header         from "./Header";
import * as Actions   from "../actions/EditAction";
import * as Motion    from "react-motion";
import * as Draggable from "react-draggable";
// tslint:enable:import-spacing

import "../sass/Layout.scss";

// tslint:disable-next-line:no-empty-interface
export interface ILayoutProps {}
export interface ILayoutState {
    _lesJoueurs: any;
    _formState: any;
    _actions: any;
    _receptionsChosen: any;
    _receptions: any ;
    _actionChosen: any;
    _firstClick: any;
    numJoueur?: number;
}

// les variables globales pour avoir le numero du joueur
let x1: number = 0;
let y1: number = 0;
let x2: number = 0;
let y2: number = 0;
let x3: number = 0;
let y3: number = 0;
let idReception: number;
let typeAction = "";
let fleche: [any, any] = [[], []];
let rows: any = [
                    [
                        [], [], [],
                    ],
                    [
                        [], [], [],
                    ],
                    [
                        [], [], [],
                    ],
                ];

let joeursBanc: any = [];

export default class EditTest extends React.Component<ILayoutProps, ILayoutState> {

    constructor(props: any) {
        super(props);

        this.openActionForm = this.openActionForm.bind(this);

        this.state = {
            _actionChosen: "",
            _actions: [],
            _firstClick: true,
            _formState: 0,
            _lesJoueurs: [],
            _receptions: [],
            _receptionsChosen: "",
            numJoueur: 0,
        };
    }

    public componentWillMount = () => {
        // Chargement des données dans le store.
        Actions.getJoueur();
        Actions.getActionsEdit();
        Actions.getReception();

        Store.on("playersLoaded", () => {
            this.setState({
                _actionChosen: this.state._actionChosen,
                _actions: this.state._actions,
                _firstClick: true,
                _formState: this.state._formState,
                _lesJoueurs: Store.GetAllJoueurs(),
                _receptions: this.state._receptions,
                _receptionsChosen: this.state._receptionsChosen,
            });
        });

        Store.on("actionsLoaded", () => {
            this.setState({
                _actionChosen: this.state._actionChosen,
                _actions: Store.GetAllActionsTypes(),
                _firstClick: this.state._firstClick,
                _formState: this.state._formState,
                _lesJoueurs: this.state._lesJoueurs,
            });
        });

        Store.on("receptionLoaded", () => {
            this.setState({
                _actionChosen: this.state._actionChosen,
                _actions: this.state._actions,
                _firstClick: this.state._firstClick,
                _formState: this.state._formState,
                _lesJoueurs: this.state._lesJoueurs,
                _receptions: Store.GetAllReception(),
                _receptionsChosen: this.state._receptionsChosen,
            });
        });

        Store.on("UnChange", () => {
            this.CheckUneAction();
        });
    }

    private CheckUneAction = () => {
        const uneAction = Store.GetUneAction();
        const datastringify = JSON.stringify(uneAction);
        const tabJson = JSON.parse(datastringify);
        if (tabJson.length > 0 ) {
            const data = tabJson[0];
            typeAction = data.TypeAction;
        }
    }

    private  getParameterByName = () => {
        const url = window.location.href;
        const res = url.split("/");
        return res[res.length - 1];
    }

    private demi = () => {
        this.changeTwoLi("def-gauche-list", "off-droite-list");
        this.changeTwoLi("def-droite-list", "off-gauche-list");
        this.changeTwoLi("def-centre-list", "off-centre-list");
        this.changeTwoLi("mid-gauche-list", "mid-droite-list");
    }

    private changeTwoLi = (nom1: string, nom2: string) => {
        // tslint:disable:prefer-const
        let lisPremier = document.getElementById(nom1).getElementsByTagName("li");
        let tempo: any = [];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < lisPremier.length; i++) {
            tempo.push(lisPremier[i]);
        }

        let lisDeuxieme = document.getElementById(nom2).getElementsByTagName("li");
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < lisDeuxieme.length; i++) {
            let premier = document.getElementById(nom1);
            premier.appendChild(lisDeuxieme[i]);
        }

        this.ClearDomElement(nom2);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < tempo.length; i++) {
            let deuxieme = document.getElementById(nom2);
            deuxieme.appendChild(tempo[i]);
        }
    }

    private  ClearDomElement = (nom: string) => {
        let doc = document.getElementById(nom);
        while (doc.hasChildNodes()) {
        doc.removeChild(doc.lastChild);
        }
    }

    // Ouvre le form d'ajout d'action
    private openActionForm(e: React.MouseEvent<HTMLInputElement>, sender: HTMLButtonElement) {
        console.log(e.currentTarget.value);
        const num = parseInt(e.currentTarget.value, 10);
        this.setState({ numJoueur: num});
        Actions.requestActionForm(e, sender, document.getElementsByClassName("Enr")[0] as HTMLDivElement);
    }

    // Ferme le form d'ajout d'action
    private closeActionForm = () => {
        Actions.closeActionForm(document.getElementsByClassName("Enr")[0] as HTMLDivElement);
        /* this.apearPlayeurs(); --> For what? */
    }

    // Envoie du formulaire à l'api
    private sendFormData = (e: React.MouseEvent<HTMLInputElement>) => {
        const doc = document.getElementById("NomActivite");

        // Va rechercher le formulaire
        let form = e.target as HTMLFormElement;

        // Va chercher le resutltat de l'action
        let letvideo = document.getElementById("my-player") as HTMLVideoElement;
        let tempsAction = letvideo.currentTime;
        let letscoreDom = document.getElementById("ScoreDom") as HTMLInputElement;
        let scoreDom = letscoreDom.value;
        let letscoreAway = document.getElementById("ScoreAway") as HTMLInputElement;
        let error = document.getElementById("error") as HTMLLabelElement;
        let scoreAway = letscoreAway.value;
        let video = document.getElementById("my-player") as HTMLVideoElement;
        let TypeAction = 5;
        let homeScoreInt = parseInt(scoreDom, 10);
        let awayScoreInt = parseInt(scoreAway, 10);
        const idGame = parseInt(this.getParameterByName(), 10);

        if ( scoreDom !== "" && scoreAway !== "" && x1 !== 0 && x2 !== 0 && y1 !== 0 && y2 !== 0)
        {
            error.innerHTML = "";
            if (TypeAction !== 0) {
                let text ;
                if ( this.state._firstClick === false && (typeAction === "reception et action"
                    || typeAction === "passe incomplete")) {
                    text = {
                        ActionTypeID : this.state._actionChosen,
                        GameID : idGame,
                        GuestScore: awayScoreInt,
                        HomeScore: homeScoreInt,
                        PlayerID : this.state.numJoueur,
                        ReceptionTypeID: idReception,
                        Time: parseFloat(video.currentTime.toFixed(4)),
                        X1: x1,
                        X2: x2,
                        X3: x3,
                        Y1: y1,
                        Y2: y2,
                        Y3: y3,
                        ZoneID: 1,
                    };

                    if (typeAction === "passe incomplete") {
                        x3 = 0;
                        y3 = 0;
                    }
                }
                else {
                    text = {
                        ActionTypeID : this.state._actionChosen,
                        GameID: idGame,
                        GuestScore: awayScoreInt,
                        HomeScore: homeScoreInt,
                        PlayerID: this.state.numJoueur,
                        ReceptionTypeID : idReception,
                        Time: parseFloat(video.currentTime.toFixed(4)),
                        X1 : x1,
                        X2 : x2,
                        X3: 0,
                        Y1 : y1,
                        Y2 : y2,
                        Y3 : 0,
                        ZoneID: 1,
                    };
                }
                const textJSon = JSON.stringify(text);
                Actions.postAction(textJSon);

                // Fermer le fenetre
                this.returnFirstStateForm();
                this.closeActionForm();
                this.closeActionForm.bind(this);
            }
        }
        else {
            error.innerHTML = "informations manquantes";
        }
    }

    private setTerrainToInfo = () => {
        // Définir l'action finale du joueur.
        this.setState({
            _actionChosen: this.state._actionChosen,
            _actions: this.state._actions,
            _firstClick: this.state._firstClick,
            _formState: 2,
            _lesJoueurs: this.state._lesJoueurs,
            _receptions: this.state._receptions,
            _receptionsChosen: this.state._receptionsChosen,
        });
    }

    private setActionFromInfo = () => {
        let typeSelect = document.getElementsByName("NomActivite")[0] as HTMLInputElement;
        const actionType = parseInt(typeSelect.value, 10);
        let ReceptionSelect = document.getElementsByName("NomReception")[0] as HTMLInputElement;
        idReception = parseInt(ReceptionSelect.value, 10);
        Actions.getActionId(actionType);
        this.setState({
            _actionChosen: actionType,
            _actions: this.state._actions,
            _firstClick: this.state._firstClick,
            _formState: 1,
            _lesJoueurs: this.state._lesJoueurs,
            _receptions: this.state._receptions,
            _receptionsChosen: idReception,
        }, () => {
            if ( x3 !== 0 && y3 !== 0){
                this.receptionPasse();
            }
        });
    }

    private setFromArrow = (e: React.MouseEvent<HTMLDivElement>) => {
        fleche = [[e.nativeEvent.offsetX, e.nativeEvent.offsetY], fleche[1]];
        x2 = e.nativeEvent.offsetX;
        y2 = e.nativeEvent.offsetY;
        // Effacer le canvas
        let canvas = document.getElementById("canvasArrow") as HTMLCanvasElement;
        canvas.width = canvas.width;
    }

    private setToArrow = (e: any) => {
        // Dessiner la flèche
        if (this.state._firstClick === true) {
            x1 = e.nativeEvent.offsetX;
            y1 = e.nativeEvent.offsetY;
            let canvas = document.getElementById("canvasTest") as HTMLCanvasElement;
            let ctx = canvas.getContext("2d");
            let ajustement = 1.8;

            ctx.strokeStyle = "red";
            ctx.fillStyle = "red";
            ctx.lineWidth = 2.5;

            ctx.beginPath();
            ctx.moveTo(x1 / (ajustement - 0.7), y1  / ajustement);
            ctx.lineTo(x1 / (ajustement - 0.7), y1  / ajustement);
            ctx.stroke();
            let endRadians = Math.atan((y1 - x1) / (x1 - x1));
            endRadians += ((x1 > y1) ? 90 : -90) * Math.PI / 180;
            this.drawX(ctx, x1 / (ajustement - 0.7), y1 / ajustement);
            this.setState({
                _actionChosen: this.state._actionChosen,
                _actions: this.state._actions,
                _firstClick: false,
                _formState: 1,
                _lesJoueurs: this.state._lesJoueurs,
                _receptions: this.state._receptions,
                _receptionsChosen: this.state._receptionsChosen,
            });
        } else if (this.state._firstClick === false && x2 === 0 && typeAction !== "balle perdu") {
            x2 = e.nativeEvent.offsetX;
            y2 = e.nativeEvent.offsetY;
            let canvas = document.getElementById("canvasDeuxiemeClick") as HTMLCanvasElement;
            let ctx = canvas.getContext("2d");
            let ajustement = 1.8;

            ctx.strokeStyle = "orange";
            ctx.fillStyle = "orange";
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(x2 / (ajustement - 0.7), y2  / ajustement);
            ctx.lineTo(x2 / (ajustement - 0.7), y2 / ajustement);
            ctx.stroke();
            let endRadians = Math.atan((y2 - x2) / (x2 - x2));
            endRadians += ((x2 > y2) ? 90 : -90) * Math.PI / 180;
            this.drawX(ctx, x2 / (ajustement - 0.7), y2 / ajustement);
        }else if (this.state._firstClick === false && x2 !== 0 &&
                    (typeAction === "reception et action" || typeAction === "passe incomplete") ) {
            fleche =  [fleche[0], [e.nativeEvent.offsetX, e.nativeEvent.offsetY]];
            x3 = e.nativeEvent.offsetX;
            y3 = e.nativeEvent.offsetY;

            let canvasTroisieme = document.getElementById("canvasTroisiemeClick") as HTMLCanvasElement;
            let ctxTroisieme = canvasTroisieme.getContext("2d");
            ctxTroisieme.clearRect(0, 0, canvasTroisieme.width, canvasTroisieme.height);
            let ajustement2 = 1.8;
            ctxTroisieme.strokeStyle = "green";
            ctxTroisieme.fillStyle = "green";
            ctxTroisieme.lineWidth = 2.5;
            ctxTroisieme.beginPath();
            ctxTroisieme.moveTo(x3 / (ajustement2 - 0.7), y3  / ajustement2);
            ctxTroisieme.lineTo(x3 / (ajustement2 - 0.7), y3  / ajustement2);
            ctxTroisieme.stroke();
            let endRadiansTroisieme = Math.atan((y3 - x3) / (x3 - x3));
            endRadiansTroisieme += ((x3 > y3) ? 90 : -90) * Math.PI / 180;
            this.drawX(ctxTroisieme, x3 / (ajustement2 - 0.7), y3 / ajustement2);
            let canvas = document.getElementById("canvasArrow") as HTMLCanvasElement;
            let ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let ajustement = 1.8;

            ctx.strokeStyle = "blue";
            ctx.fillStyle = "blue";
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(x2 / (ajustement - 0.7), y2  / ajustement);
            ctx.lineTo(x3 / (ajustement - 0.7), y3 / ajustement);
            ctx.stroke();

            let endRadians = Math.atan((y3 - y2) / (x3 - x2));
            endRadians += ((x3 > x2) ? 90 : -90) * Math.PI / 180;
            this.drawArrowhead(ctx, x3 / (ajustement - 0.7), y3 / ajustement, endRadians);
        } else if ( this.state._firstClick === false && typeAction === "balle perdu") {
            x3 = 0;
            y3 = 0;
            x2 = e.nativeEvent.offsetX;
            y2 = e.nativeEvent.offsetY;
            let canvas = document.getElementById("canvasArrow") as HTMLCanvasElement;
            let ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let ajustement = 1.8;

            ctx.strokeStyle = "green";
            ctx.fillStyle = "green";
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(x2 / (ajustement - 0.7), y2  / ajustement);
            ctx.lineTo(x2 / (ajustement - 0.7), y2 / ajustement);
            ctx.stroke();
            let endRadians = Math.atan((y2 - x2) / (x2 - x2));
            endRadians += ((x2 > y2) ? 90 : -90) * Math.PI / 180;
            this.drawX(ctx, x2 / (ajustement - 0.7), y2 / ajustement);
            this.setState({
                _actionChosen: this.state._actionChosen,
                _actions: this.state._actions,
                _firstClick: false,
                _formState: 1,
                _lesJoueurs: this.state._lesJoueurs,
                _receptions: this.state._receptions,
                _receptionsChosen: this.state._receptionsChosen,
            });
        }
    }

    private clearCanvas = () => {
        let canvas = document.getElementById("canvasTest") as HTMLCanvasElement;
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        x1 = 0;
        y1 = 0;
        y2 = 0;
        x2 = 0;
        y3 = 0;
        x3 = 0;

        this.setState({
            _actionChosen: this.state._actionChosen,
            _actions: this.state._actions,
            _firstClick: true,
            _formState: 1,
            _lesJoueurs: this.state._lesJoueurs,
            _receptions: this.state._receptions,
            _receptionsChosen: this.state._receptionsChosen,
        });

        let canvasArrow = document.getElementById("canvasArrow") as HTMLCanvasElement;
        let ctx2 = canvasArrow.getContext("2d");
        ctx2.clearRect(0, 0, canvasArrow.width, canvasArrow.height);
        let canvasDeux = document.getElementById("canvasDeuxiemeClick") as HTMLCanvasElement;
        let ctx3 = canvasDeux.getContext("2d");
        ctx3.clearRect(0, 0, canvasDeux.width, canvasDeux.height);
        let canvastrois = document.getElementById("canvasTroisiemeClick") as HTMLCanvasElement;
        let ctx4 = canvastrois.getContext("2d");
        ctx4.clearRect(0, 0, canvastrois.width, canvastrois.height);
    }

    private receptionPasse(){
        let canvas = document.getElementById("canvasTest") as HTMLCanvasElement;
        let ctx = canvas.getContext("2d");
        let ajustement = 1.8;
        x1 = x3;
        y1 = y3;
        x3 = 0;
        y3 = 0;
        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
        ctx.lineWidth = 2.5;

        ctx.beginPath();
        ctx.moveTo(x1 / (ajustement - 0.7), y1  / ajustement);
        ctx.lineTo(x1 / (ajustement - 0.7), y1  / ajustement);
        ctx.stroke();
        let endRadians = Math.atan((y1 - x1) / (x1 - x1));
        endRadians += ((x1 > y1) ? 90 : -90) * Math.PI / 180;
        this.drawX(ctx, x1 / (ajustement - 0.7), y1 / ajustement);
        this.setState({
            _actionChosen: this.state._actionChosen,
            _actions: this.state._actions,
            _firstClick: false,
            _formState: 1,
            _lesJoueurs: this.state._lesJoueurs,
            _receptions: this.state._receptions,
            _receptionsChosen: this.state._receptionsChosen,
        });
    }

    private drawArrowhead = (ctx: CanvasRenderingContext2D, x: number, y: number, radians: number) => {
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.rotate(radians);
        ctx.moveTo(0, 0);
        ctx.lineTo(5, 20);
        ctx.lineTo(-5, 20);
        ctx.closePath();
        ctx.restore();
        ctx.fill();
    }

    private changeReception() {
        const sel = document.getElementById("NomReception") as HTMLSelectElement;
        const opt = sel.options[sel.selectedIndex] as HTMLOptionElement;
        idReception = parseInt(opt.value, 10);
    }

    private drawX = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        ctx.beginPath();

        ctx.moveTo(x - 10, y - 10);
        ctx.lineTo(x + 10, y + 10);

        ctx.moveTo(x + 10, y - 10);
        ctx.lineTo(x - 10, y + 10);
        ctx.stroke();
    }

    private returnFirstStateForm = () => {
        x1 = 0;
        x2 = 0;
        y1 = 0;
        y2 = 0;
        this.setState({
            _actionChosen: this.state._actionChosen,
            _actions: this.state._actions,
            _firstClick: true,
            _formState: 0,
            _lesJoueurs: this.state._lesJoueurs,
            _receptions: this.state._receptions,
            _receptionsChosen: this.state._receptionsChosen,
        });
    }

    private returnSecondStateForm = () => {
        this.setState({
            _actionChosen: this.state._actionChosen,
            _actions: this.state._actions,
            _firstClick: true,
            _formState: 1,
            _lesJoueurs: this.state._lesJoueurs,
            _receptions: this.state._receptions,
            _receptionsChosen: this.state._receptionsChosen,
        }, () => {
            if ( x1 !== 0 && y1 !== 0) {
                this.redessinerTout();
            }
        });
    }

    public redessinerTout(){
        if ( x3 !== 0 && y3 !== 0){
            let canvas = document.getElementById("canvasArrow") as HTMLCanvasElement;
            let ctx = canvas.getContext("2d");
            let ajustement = 1.8;

            ctx.strokeStyle = "blue";
            ctx.fillStyle = "blue";
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(fleche[0][0] / (ajustement - 0.7), fleche[0][1]  / ajustement);
            ctx.lineTo(fleche[1][0] / (ajustement - 0.7), fleche[1][1]  / ajustement);
            ctx.stroke();

            let endRadians = Math.atan((fleche[1][1] - fleche[0][1]) / (fleche[1][0] - fleche[0][0]));
            endRadians += ((fleche[1][0] > fleche[0][0]) ? 90 : -90) * Math.PI / 180;
            this.drawArrowhead(ctx, fleche[1][0] / (ajustement - 0.7), fleche[1][1] / ajustement, endRadians);
        }
        else if ( x2 !== 0 && y2 !== 0 && y3 === 0) {
            let canvas = document.getElementById("canvasArrow") as HTMLCanvasElement;
            let ctx = canvas.getContext("2d");
            let ajustement = 1.8;

            ctx.strokeStyle = "green";
            ctx.fillStyle = "green";
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(x2 / (ajustement - 0.7), y2  / ajustement);
            ctx.lineTo(x2 / (ajustement - 0.7), y2 / ajustement);
            ctx.stroke();
            let endRadians = Math.atan((y2 - x2) / (x2 - x2));
            endRadians += ((x2 > y2) ? 90 : -90) * Math.PI / 180;
            this.drawX(ctx, x2 / (ajustement - 0.7), y2 / ajustement);
        }
        if ( x1 !== 0 && y1 !== 0 )
        {
            let canvas = document.getElementById("canvasTest") as HTMLCanvasElement;
            let ctx = canvas.getContext("2d");
            let ajustement = 1.8;

            ctx.strokeStyle = "red";
            ctx.fillStyle = "red";
            ctx.lineWidth = 2.5;

            ctx.beginPath();
            ctx.moveTo(x1 / (ajustement - 0.7), y1  / ajustement);
            ctx.lineTo(x1 / (ajustement - 0.7), y1  / ajustement);
            ctx.stroke();
            let endRadians = Math.atan((y1 - x1) / (x1 - x1));
            endRadians += ((x1 > y1) ? 90 : -90) * Math.PI / 180;
            this.drawX(ctx, x1 / (ajustement - 0.7), y1 / ajustement);
        }
    }

    public render() {
        rows = [
            [
            [], [], [],
            ],
            [
            [], [], [],
            ],
            [
            [], [], [],
            ],
        ];

        let nbTempo = 0;
        let nbTempo2 = 0;

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i <  this.state._lesJoueurs.length; i++) {
            if (i > 11) {
              joeursBanc.push(
                <li>
                <Draggable>
                  <button
                    className="btn btn-primary draggable-element"
                    // tslint:disable-next-line:no-string-literal
                    value={this.state._lesJoueurs[i]["Number"]}
                    onClick={this.openActionForm.bind(this)}
                  >
                      {/*tslint:disable-next-line:no-string-literal*/}
                      {this.state._lesJoueurs[i]["Number"]}
                  </button>
                </Draggable>
              </li>,
              );
            } else {
              if (nbTempo === 3) {
                nbTempo2++;
                nbTempo = 0;
              }

              /**
               * Obtenir la dernière ligne jouée (défensive, centre ou offensive).
               */
              // let ligne = (this.state._lesJoueurs[i]["LastLignePlayed"] == "def" ?
              // 0 : (this.state._lesJoueurs[i]["LastLignePlayed"] == "cen" ? 1 : 2));
              const ligne = (nbTempo === 0 ? 0 : ( nbTempo === 2 ? 1 : 2));
              /**
               * Obtenir la dernière position jouée (gauche, centre ou droite).
               */
              // let position = (this.state._lesJoueurs[i]["LastPositionPlayed"] == "gau" ? 0
              // : (this.state._lesJoueurs[i]["LastLignePlayed"] == "cen" ? 1 : 2));
              nbTempo++;
              rows[ligne][nbTempo2].push(
                <li>
                  <Draggable handle="i">
                    <div className="draggable-element">
                      <button
                        className="btn btn-primary"
                        // tslint:disable-next-line:no-string-literal
                        value={this.state._lesJoueurs[i]["Number"]}
                        onClick={this.openActionForm.bind(this)}
                      >
                          {/*tslint:disable-next-line:no-string-literal*/}
                          {this.state._lesJoueurs[i]["Number"]}
                      </button>
                      <i className="glyphicon glyphicon-move"/>
                    </div>
                  </Draggable>
                </li>,
                );
            }
        }

        // Actions
        let actions: any = [];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.state._actions.length; i++) {
            const data = this.state._actions[i];
            const selected = (data.ID === this.state._actionChosen ? true : false);
            actions.push(
                <option value={data.ID} selected={selected}>{data.Description}</option>,
            );
        }
        // reception
        let reception: any = [];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.state._receptions.length; i++) {
            const data = this.state._receptions[i];
            const selected = (data.ID === this.state._receptionsChosen ? true : false);
            reception.push(
                <option value={data.ID} selected={selected}>{data.Name}</option>,
            );
        }

        // Définit le form
        let formAction: any;
        if (this.state._formState === 0) {
            formAction = (
                <form>
                <div className="Enr">
                    <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                        onClick={this.closeActionForm.bind(this)}
                    >
                    <span aria-hidden="true">&times;</span>
                    </button>
                    <h3>Première action</h3><hr />
                    <div className="form-group">
                    <label htmlFor="NomReception">type de reception</label>
                    <select
                        id="NomReception"
                        className="form-control"
                        name="NomReception"
                        onChange={this.changeReception.bind(this)}
                    >
                        {reception}
                    </select>
                    <label htmlFor="Nom">Nom de l'action</label>
                    <select id="NomActivite" className="form-control" name="NomActivite">
                        {actions}
                    </select>
                    <br />
                    </div>
                    <hr />
                    <div className="form-group col-xs-4 col-xs-push-6">
                    <input
                        onClick={this.setActionFromInfo.bind(this)}
                        className="btn btn-default"
                        value="Trajectoire"
                    />
                    </div>
                </div>
            </form>);
        } else if (this.state._formState === 1) {
            formAction = (
                <form>
                <div className="Enr">
                <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={this.closeActionForm.bind(this)}
                >
                <span aria-hidden="true">&times;</span>
                </button>
                <h3>Définir la trajectoire</h3><hr />
                <label id="error" />
                <div
                    id="terrain-container-sm"
                    onClick={this.setToArrow.bind(this)}
                >
                    <div id="circle-centre" />
                    <div id="def-container" className="col-xs-12 col-sm-4 terrain-third" />
                    <div id="def-container" className="col-xs-12 col-sm-4 terrain-third" />
                    <div id="def-container" className="col-xs-12 col-sm-4 terrain-third" />
                    <canvas id="canvasArrow" />
                    <canvas id="canvasTest" />
                    <canvas id="canvasDeuxiemeClick" />
                    <canvas id="canvasTroisiemeClick" />
                </div>
                <hr />
                <div className="col-xs-2 no-l-padd">
                    <input onClick={this.returnFirstStateForm.bind(this)} className="btn btn-default" value="Retour" />
                </div>
                <div className="col-xs-6 col-xs-push-4">
                    <input onClick={this.sendFormData.bind(this)} className="btn btn-success" value="Enregistrer" />
                    <input onClick={this.clearCanvas.bind(this)} className="btn reset" value="reset" />
                </div>
                </div>
            </form>
            );
        }

        return (
        <div>
            {formAction}
            <input type="button" onClick={this.demi.bind(rows)} value="Demi"/>

            <form onSubmit={this.sendFormData.bind(this)}>
                <h3>Pointage</h3><br />
                <label htmlFor="ScoreDom">Domicile</label>
                <input type="text" name="ScoreDom" id="ScoreDom" />
                <label htmlFor="ScoreAway">Extérieur</label>
                <input type="text" name="ScoreAway" id="ScoreAway"/>
            </form>
            <div id="banc" className="col-xs-1">
              Banc
              <ul>
                {joeursBanc}
              </ul>
            </div>
            <div id="terrain-container" className="container-fluid col-xs-11">
              <div id="circle-centre" />
              <div id="def-container" className="col-xs-12 col-sm-4 terrain-third">
                <div id="def-gauche" className="terrain-hauteur">
                  <ul className="players-list" id="def-gauche-list">{rows[0][0]}</ul>
                </div>
                <div id="def-centre" className="terrain-hauteur">
                  <ul className="players-list" id="def-centre-list">{rows[0][1]}</ul>
                </div>
                <div id="def-droite" className="terrain-hauteur">
                  <ul className="players-list" id="def-droite-list">{rows[0][2]}</ul>
                </div>
              </div>

              <div id="mid-container" className="col-xs-12 col-sm-4 terrain-third">
                <div id="mid-gauche" className="terrain-hauteur">
                  <ul className="players-list" id="mid-gauche-list">{rows[1][0]}</ul>
                </div>
                <div id="mid-centre" className="terrain-hauteur">
                  <ul className="players-list" id="mid-centre-list">{rows[1][1]}</ul>
                </div>
                <div id="mid-droite" className="terrain-hauteur">
                  <ul className="players-list" id="mid-droite-list">{rows[1][2]}</ul>
                </div>
              </div>

              <div id="off-container" className="col-xs-12 col-sm-4 terrain-third">
                <div id="off-gauche" className="terrain-hauteur">
                  <ul className="players-list" id="off-gauche-list">{rows[2][0]}</ul>
                </div>
                <div id="off-centre" className="terrain-hauteur">
                  <ul className="players-list" id="off-centre-list">{rows[2][1]}</ul>
                </div>
                <div id="off-droite" className="terrain-hauteur">
                  <ul className="players-list" id="off-droite-list">{rows[2][2]}</ul>
                </div>
              </div>
            </div>
          </div>
        );
    }
}
