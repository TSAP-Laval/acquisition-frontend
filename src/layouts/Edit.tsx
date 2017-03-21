import * as React from "react";
import * as ReactDOM from 'react-dom';
import * as $ from "jquery";
import Store from "../stores/EditStore";
import VideoStore from "../stores/VideoPlayerStore";
import UploaderStore from "../stores/UploaderStore";
import * as Actions from "../actions/EditAction";
import Header from "./Header"
import * as Motion from 'react-motion';

require('../sass/Layout.scss');


export interface ILayoutProps {}
export interface ILayoutState {
  _lesJoueurs: any,
  _formState: any
}

// Variable global pour avoir le numero du joueur
var numJoueur = 0;
var fleche: [any, any] = [[], []];
 /**
   * rows représente les joueurs sur le terrain.
   * 
   * Liste des index:
   * 
   *  rows[0] -> Ligne défensive
   *    rows[0][0] -> Gauche
   *    rows[0][1] -> Centre
   *    rows[0][2] -> Droite
   * 
   *  rows[1] -> Ligne de centre
   *    rows[1][0] -> Gauche
   *    rows[1][1] -> Centre
   *    rows[1][2] -> Droite
   * 
   *  rows[2] -> Ligne offensive
   *    rows[2][0] -> Gauche
   *    rows[0][2] -> Centre
   *    rows[0][3] -> Droite
   */
  var rows: any = [
                    [
                      [], [], []
                    ], 
                    [
                      [], [], []
                    ], 
                    [
                      [], [], []
                    ]
                  ];


export default class EditTest extends React.Component<ILayoutProps, ILayoutState> {
  constructor (props: any) {
      super(props);
      this.state = {
        _lesJoueurs: [],
        _formState: 0
      }
  }

  componentWillMount = () => {
    Actions.getJoueur(); // Charge les joueurs dans le store.
    Actions.getActionsEdit();
    
    // Lorsque les joueurs sont chargés.
    Store.on("change", () => {
      this.setState({ 
        _lesJoueurs: Store.GetAllJoueurs(),
        _formState: 0
      });
    });

    Store.on("actionChange", () => {
      this.RemplirSelect();
    });
  }

  RemplirSelect = () => {
    this.ClearDomElement("NomActivite");
    var allActions = Store.GetAllActions();
    var datastringify = JSON.stringify(allActions);
    var tabJson = JSON.parse(datastringify);	

    //Rentre le id et le nom de l'action dans le tableau correspondant
    for (var i = 0; i < tabJson.length; i++) {
      var data =tabJson[i];
      var doc = document.getElementById("NomActivite");
      var x = document.createElement("OPTION") as HTMLInputElement;
      x.innerHTML=data.Name;
      x.value=data.ID;
      doc.appendChild(x);
    }
  }

  changeTwoLi =(nom1:string,nom2:string) =>{
    var lisPremier = document.getElementById(nom1).getElementsByTagName("li");
    var tempo: any = [];
    for(let i=0;i<lisPremier.length;i++)
    {
      tempo.push(lisPremier[i]);
    }
    var lisDeuxieme = document.getElementById(nom2).getElementsByTagName("li");
    for(let i=0;i<lisDeuxieme.length;i++)
    {
      var premier =document.getElementById(nom1)
      premier.appendChild(lisDeuxieme[i]);

    }
    this.ClearDomElement(nom2)
    for(let i=0;i<tempo.length;i++)
    {
      var deuxieme =document.getElementById(nom2)
      deuxieme.appendChild(tempo[i]);

    }
  }

  demi = () => {
    this.changeTwoLi("def-gauche-list","off-droite-list");
    this.changeTwoLi("def-droite-list","off-gauche-list");
    this.changeTwoLi("def-centre-list","off-centre-list");
    this.changeTwoLi("mid-gauche-list","mid-droite-list"); 
  }


  ClearDomElement = (nom:string) => {
    var doc = document.getElementById(nom);
    while (doc.hasChildNodes()) {
      doc.removeChild(doc.lastChild);
    }
  }

  /**
   * Ouvre le form d'ajout d'action
   */
  openActionForm = (e: React.MouseEvent<HTMLInputElement>, sender: HTMLButtonElement) => {
    Actions.requestActionForm(e, sender, document.getElementsByClassName("Enr")[0] as HTMLDivElement);
  }

  /**
   * Ferme le form d'ajout d'action
   */
  closeActionForm = () => {
    Actions.closeActionForm(document.getElementsByClassName("Enr")[0] as HTMLDivElement);
  }
  //Envoie du formulaire à l'api 
  sendFormData(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault();

    //Va rechercher le formulaire
    var form = e.target as HTMLFormElement;

    //Va chercher le type de l'active
    let _typeSelect = document.getElementsByName("NomActivite")[0] as HTMLInputElement;

    //Va chercher le resutltat de l'action
    let _resultat = document.getElementsByName("resultat")[0] as HTMLInputElement;
    let _video = document.getElementById("my-player") as HTMLVideoElement;
    let tempsAction = _video.currentTime;
    let _scoreDom = document.getElementById("ScoreDom") as HTMLInputElement;
    let scoreDom = _scoreDom.value;
    let _scoreAway = document.getElementById("ScoreAway") as HTMLInputElement;
    let scoreAway = _scoreAway.value;    
    let video = document.getElementById("my-player") as HTMLVideoElement;
    var TypeAction = 0;
    TypeAction = parseInt(_typeSelect.value)
    var resultatAction = _resultat.value
    if(TypeAction != 0 && resultatAction != "") {
      //Preparation du json que l'on va envoyer au server
      var text = '{'
        +'"ActionTypeID" :'+TypeAction+','
        +'"IsPositive" : '+resultatAction + ','
        +'"ZoneID" : 1 ,'
        +'"GameID" : 1 ,'
        +'"X1" : ' + fleche[0][0] + ','
        +'"Y1" : ' + fleche[0][1] + ','
        +'"X2" : ' + fleche[1][0] + ','
        +'"Y2" : ' + fleche[1][1] + ','
        +'"Time" : ' + video.currentTime + ','
        +'"HomeScore" : '+scoreDom+','
        +'"GuestScore" : '+scoreAway+','
        +'"PlayerID" :'+numJoueur
        +'}'
      Actions.postAction(text);

      //Fermer le fenetre
      this.closeActionForm.bind(this);
    }
  }

  setTerrainFromInfo = () => {
    // Définir la position initiale du joueur.
  }

  setTerrainToInfo = () => {
    // Définir l'action finale du joueur.
    this.setState({
      _formState: 2,
      _lesJoueurs: this.state._lesJoueurs
    });
  }

  setActionFromInfo = () => {
    // Affiche le terrain.
    this.setState({
      _formState: 1,
      _lesJoueurs: this.state._lesJoueurs
    });
  }

  setFromArrow = (e: React.MouseEvent<HTMLDivElement>) => {
    fleche = [[e.nativeEvent.offsetX, e.nativeEvent.offsetY], fleche[1]];

    // Effacer le canvas
    var canvas = document.getElementById('canvasArrow') as HTMLCanvasElement;
    canvas.width = canvas.width;
  }

  setToArrow = (e: React.MouseEvent<HTMLDivElement>) => {
    fleche =  [fleche[0], [e.nativeEvent.offsetX, e.nativeEvent.offsetY]];

    // Dessiner la flèche
    var canvas = document.getElementById('canvasArrow') as HTMLCanvasElement;
    var ctx = canvas.getContext('2d');

    let ajustement = 1.8;

    ctx.strokeStyle = "blue";
    ctx.fillStyle = "blue";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(fleche[0][0] / (ajustement - 0.7), fleche[0][1]  / ajustement);
    ctx.lineTo(fleche[1][0] / (ajustement - 0.7), fleche[1][1]  / ajustement);
    ctx.stroke();

    var endRadians = Math.atan((fleche[1][1] - fleche[0][1]) / (fleche[1][0] - fleche[0][0]));
    endRadians += ((fleche[1][0] > fleche[0][0]) ? 90 : -90) * Math.PI / 180;
    this.drawArrowhead(ctx, fleche[1][0] / (ajustement - 0.7), fleche[1][1] / ajustement, endRadians);
  }

  drawArrowhead = (ctx: CanvasRenderingContext2D, x: number, y: number, radians: number) => {
      ctx.save();
      ctx.beginPath();
      ctx.translate(x,y);
      ctx.rotate(radians);
      ctx.moveTo(0,0);
      ctx.lineTo(5,20);
      ctx.lineTo(-5,20);
      ctx.closePath();
      ctx.restore();
      ctx.fill();
  }

  returnFirstStateForm = () => {
    this.setState({
      _formState: 0,
      _lesJoueurs: this.state._lesJoueurs
    })
  }

  render() {

    rows = [
        [
          [], [], []
        ], 
        [
          [], [], []
        ], 
        [
          [], [], []
        ]
      ];
   
    var nbTempo =0;
    var nbTempo2=0;
    for (let i = 0; i < this.state._lesJoueurs.length; i++) {  
      if(nbTempo==3)
      {
        nbTempo2++;
        nbTempo=0;
      }    
                                                             
      /**
       * Obtenir la dernière ligne jouée (défensive, centre ou offensive).
       */
      //let ligne = (this.state._lesJoueurs[i]["LastLignePlayed"] == "def" ? 0 : (this.state._lesJoueurs[i]["LastLignePlayed"] == "cen" ? 1 : 2));
      
       let ligne = (nbTempo == 0 ? 0 :( nbTempo == 2 ? 1 : 2));
      /**
       * Obtenir la dernière position jouée (gauche, centre ou droite).
       */
      //let position = (this.state._lesJoueurs[i]["LastPositionPlayed"] == "gau" ? 0 : (this.state._lesJoueurs[i]["LastLignePlayed"] == "cen" ? 1 : 2));
      nbTempo++;
      rows[ligne][nbTempo2].push(<li>
        <button
          className="btn btn-primary"
          value={this.state._lesJoueurs[i]["Number"]} 
          onClick={this.openActionForm.bind(this)}>{this.state._lesJoueurs[i]["Number"]}
        </button></li>);
    } 

    // Définit le form
    var formAction: any;
    if (this.state._formState == 0) {
      formAction = <form onSubmit={this.setActionFromInfo.bind(this)}>  
          <div className="Enr">
            <button 
              type="button" 
              className="close" 
              data-dismiss="alert" 
              aria-label="Close" 
              onClick={this.closeActionForm.bind(this)}>
              <span aria-hidden="true">&times;</span>
            </button>
            <h3>Première action</h3><hr />
            <div className="form-group">          
              <label htmlFor="Nom">Nom de l'action</label>                  
              <select id="NomActivite" className="form-control" name="NomActivite"></select><br></br>
            </div>
            <div className="form-group">
              <label htmlFor="resultat">Résultat de l'action </label> 
              <div className="radio">   
                <label>
                  <input type="radio" id="actionReussi" name="resultat" value="true" /> Reussi
                </label>
              </div>
              <div className="radio">  
                <label>
                  <input type="radio" id="actionManque" name="resultat" value="false"/> Manqué<br></br>
                </label>
              </div>
            </div>
            <hr />
            <div className="form-group col-xs-4 col-xs-push-8">
              <input type="submit" className="btn btn-default" value="Trajectoire" />
            </div>
          </div>  
        </form>;
    } else if (this.state._formState == 1) {
      formAction = <form onSubmit={this.setTerrainFromInfo.bind(this)}>
        <div className="Enr">
          <button 
              type="button" 
              className="close" 
              data-dismiss="alert" 
              aria-label="Close" 
              onClick={this.closeActionForm.bind(this)}>
              <span aria-hidden="true">&times;</span>
          </button>
          <h3>Définir la trajectoire</h3><hr />
          <div id="terrain-container-sm" onMouseDown={this.setFromArrow.bind(this)} onMouseUp={this.setToArrow.bind(this)}> 
            <div id="circle-centre"></div>
            <div id="def-container" className="col-xs-12 col-sm-4 terrain-third"></div>
            <div id="def-container" className="col-xs-12 col-sm-4 terrain-third"></div>
            <div id="def-container" className="col-xs-12 col-sm-4 terrain-third"></div>
            <canvas id="canvasArrow"></canvas>
          </div>
          <hr />
          <div className="col-xs-2 no-l-padd">
            <input onClick={this.returnFirstStateForm.bind(this)} className="btn btn-default" value="Retour" />
          </div>
          <div className="col-xs-6 col-xs-push-4">
            <input onClick={this.setTerrainToInfo.bind(this)} className="btn btn-success" value="Action finale" />
          </div>
        </div>
      </form>
    } else {
      formAction = <form onSubmit={this.setActionFromInfo.bind(this)}>  
          <div className="Enr">
            <button 
              type="button" 
              className="close" 
              data-dismiss="alert" 
              aria-label="Close" 
              onClick={this.closeActionForm.bind(this)}>
              <span aria-hidden="true">&times;</span>
            </button>
            <h3>Action finale</h3><hr />
            <div className="form-group">          
              <label htmlFor="Nom">Nom de l'action</label>                  
              <select id="NomActivite" className="form-control" name="NomActivite"></select><br></br>
            </div>
            <div className="form-group">
              <label htmlFor="resultat">Résultat de l'action </label> 
              <div className="radio">   
                <label>
                  <input type="radio" id="actionReussi" name="resultat" value="true" /> Reussi
                </label>
              </div>
              <div className="radio">  
                <label>
                  <input type="radio" id="actionManque" name="resultat" value="false"/> Manqué<br></br>
                </label>
              </div>
            </div>
            <hr />
            <div className="col-xs-2 no-l-padd">
              <input onClick={this.setActionFromInfo.bind(this)} className="btn btn-default" value="Retour" />
            </div>
            <div className="col-xs-6 col-xs-push-4">
              <input onClick={this.sendFormData.bind(this)} className="btn btn-success" value="Enregistrer" />
            </div>
          </div>  
        </form>;
    }

    return (
      <div>
        {formAction}
        <input type="button" onClick={this.demi.bind(rows)} value="mi-Temps"/>
        <form onSubmit={this.sendFormData.bind(this)}>  
            <h3>Pointage</h3><br></br>               
            <label htmlFor="ScoreDom">Domicile</label>
            <input type="text" name="ScoreDom" id="ScoreDom" />            
            <label htmlFor="ScoreAway">Extérieur</label>
            <input type="text" name="ScoreAway" id="ScoreAway"/>
      </form>              
        <div id="terrain-container" className="container-fluid">
          <div id="circle-centre"></div>
          <div id="def-container" className="col-xs-12 col-sm-4 terrain-third">
            <div id="def-gauche">
              <ul className="players-list" id="def-gauche-list">{rows[0][0]}</ul>
            </div>
            <div id="def-centre">
              <ul className="players-list" id="def-centre-list">{rows[0][1]}</ul>
            </div>
            <div id="def-droite">
              <ul className="players-list" id="def-droite-list">{rows[0][2]}</ul>
            </div>
          </div>

          <div id="mid-container" className="col-xs-12 col-sm-4 terrain-third">
            <div id="mid-gauche">
              <ul className="players-list" id="mid-gauche-list">{rows[1][0]}</ul>
            </div>
            <div id="mid-centre">
              <ul className="players-list" id="mid-centre-list">{rows[1][1]}</ul>
            </div>
            <div id="mid-droite">
              <ul className="players-list" id="mid-droite-list">{rows[1][2]}</ul>
            </div>
          </div>

          <div id="off-container" className="col-xs-12 col-sm-4 terrain-third">
            <div id="off-gauche">
              <ul className="players-list" id="off-gauche-list">{rows[2][0]}</ul>
            </div>
            <div id="off-centre">
              <ul className="players-list" id="off-centre-list">{rows[2][1]}</ul>
            </div>
            <div id="off-droite">
              <ul className="players-list" id="off-droite-list">{rows[2][2]}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
