import * as React from "react";
import * as ReactDOM from 'react-dom';
import * as $ from "jquery";

import Header from "./Header"
import Footer from "./Footer"


require('../../sass/Layout.scss');


export interface ILayoutProps {}
export interface ILayoutState {}
  //Variable global pour avoir le numero du joueur
var numJoueur =0;

export default class EditTest extends React.Component<ILayoutProps, ILayoutState> {
  RightClick(e: React.MouseEvent<HTMLInputElement>){
    e.preventDefault()
    let _button = e.target as HTMLInputElement;
    console.log(_button)
    numJoueur = parseInt(_button.value)
    console.log(numJoueur);
    /*
    if(e.target.name == "def")
    {
    e.target.name ='off';
    }
    else if(e.target.name == "off")
    {
    e.target.name ='cent'
    }
    else
    {
    e.target.name ='def'
    }
    */

    //Va set la position du div
    var x = document.getElementById('Enr');
    $(x).css({
      "left": e.pageX + "px",
      "top": (e.pageY - $(".video-container").height() - $(x).height()) + "px"
    })
    $(x).toggleClass("form-open")
  }
//Fermer le div
  closeFormModal(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault()
    var x = document.getElementById('Enr');
    $(x).toggleClass("form-open")
  }
//Envoie du formulaire à l'api 
sendFormData(e: React.MouseEvent<HTMLInputElement>) {
  e.preventDefault()
  //Va rechercher le formulaire
  var form = e.target as HTMLFormElement
  //Va chercher le type de l'active
  let _typeSelect = document.getElementsByName("NomActivite")[0] as HTMLInputElement
  //Va chercher le resutltat de l'action
  let _resultat = document.getElementsByName("resultat")[0] as HTMLInputElement
  var TypeAction=0;
  TypeAction = parseInt(_typeSelect.value)
  var resultatAction = _resultat.value
  if(TypeAction !=0&&resultatAction !="")
  {
      //Preparation du json que l'on va envoyer au server
        var text = '{'
       +'"TypeActionID" :'+TypeAction+','
       +'"ActionPositive" : '+resultatAction + ','
       +'"ZoneID" : 1 ,'
       +'"PartieID" : 1 ,'
       +'"X1" : 1 ,'
       +'"Y1" : 1 ,'
       +'"X2" : 1 ,'
       +'"Y2" : 0 ,'
       +'"Temps" : 30 ,'
       +'"PointageMaison" : 30 ,'
       +'"PointageAdverse" : 30 ,'
       +'"JoueurID" :'+numJoueur
       +'}'
  
  //Fermer le fenetre
  this.closeFormModal.bind(this)
  //Preparation HTTPRequest
  var xmlhttp = new XMLHttpRequest();
  //Information sur la httpRequest
  xmlhttp.open('POST', 'http://67.205.146.224:3000/api/edition/PostJoueur', true);
  //Set content-type
  xmlhttp.setRequestHeader('Content-type', 'application/json');
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4) {
      //Va rechercher la reponse du server
       var response = xmlhttp.responseText;
    //Si reussi message de confirmation sinon msg d'erreur
      if ( response === "ok") {

        var span = document.getElementById("rep");
        span.innerHTML="L'action a été rajouté avec succès"
      }
      else {
       var span = document.getElementById("rep");
        span.innerHTML="erreur durant l'ajouts"
      }
    }
   
  };
  //Envoi
  xmlhttp.send(text);
  }
  else{

     var span = document.getElementById("rep");
        span.innerHTML="Veuillez rentrer toute les informations sur l'action"
  }
   
}

 
  
    render() {

         
        //Tableau d'id et tableau du numero du joueur
        var TableauNumero = [];
        var TableauID:any = [];
        //Préparation HTTPRequest
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "http://67.205.146.224:3000/api/edition/GetJoueurs", false );
        xmlHttp.send( null );
        //Va rechercher les joueurs
        var data =JSON.parse(xmlHttp.responseText)
       //Rentre le id et le numéro du joueur dans le tableau correspondant
        for(var i = 0; i < data.length; i++) {
          var obj = data[i];
         
          TableauNumero.push(obj.Numero);
          TableauID.push(obj.ID);
          
   }
    
        
   
       //Crée une liste de bouton
        var LstButtonNumero = TableauNumero.map(function(leNum,index){
          console.log()
        return <li><div className="col-xs-3"><button className="player-btn" type="button"  onClick={this.RightClick.bind(this)} name="def" value={TableauID[index]} >Joueur numéro {leNum}</button></div></li>; },this)
                         
          //Tableau d'id et tableau du nom de l'action
         var TableauAction = [];
         var TableauActionID:any = [];
        //Preparation httpRequest      
         var xmlHttp = new XMLHttpRequest();
         xmlHttp.open( "GET", "http://67.205.146.224:3000/api/edition/GetActions", false ); 
         xmlHttp.send( null );
         //Data action
         var dataAction =JSON.parse(xmlHttp.responseText)
         //Rentre le id et le nom de l'action dans le tableau correspondant
        for(var i = 0; i < dataAction.length; i++) {
         var objAction= dataAction[i];
          TableauAction.push(objAction.Nom);
          TableauActionID.push(objAction.ID);
   }

      
       //Crée une liste d'option
        var LstAction = TableauAction.map(function(leNum,index){
              return <option name="TypeAction" value={TableauActionID[index]}>{leNum}</option>;
            })

        return (
          //Retourne html 
            <div>
                 <form onSubmit={this.sendFormData.bind(this)}>  
                 <div id="Enr">
                   <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.closeFormModal.bind(this)}><span aria-hidden="true">&times;</span></button>
                    <h3>enregistrer une action</h3>   
                          
                    <label htmlFor="Type">Type de l'action</label>
                    <input type="radio" name="Type" value="Defensive" /> Défensive
                    <input type="radio" name="Type" value="Offensive"/> Offensive
                    <input type="radio" name="Type" value="Central"/> Central<br></br>
                    <label htmlFor="Nom">Nom de l'action</label>                  
                    <select id="NomActivite" name="NomActivite">{ LstAction }</select><br></br>
                    <label htmlFor="resultat">Résultat de l'action</label>
                    <input type="radio" name="resultat" value="true" /> Reussi
                    <input type="radio" name="resultat" value="false"/> Manqué<br></br>
                    <input type="submit" value="Submit"  />
                  
                    
                   </div>  
                 </form> 
                         
                <div id="Les joueurs">
                  <ul>{ LstButtonNumero }</ul>
                </div>
                
               
            </div>
        );
    }
}
