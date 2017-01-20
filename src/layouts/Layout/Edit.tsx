import * as React from "react";
import * as ReactDOM from 'react-dom';
import * as $ from "jquery";

import Header from "./Header"
import Footer from "./Footer"


require('../../sass/Layout.scss');
export interface ILayoutProps {}
export interface ILayoutState {}
var numJoueur = 0;
var TypeAction = 0;

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
    var x = document.getElementById('Enr');
    $(x).css({
      "left": e.pageX + "px",
      "top": (e.pageY - $(".video-container").height() - $(x).height()) + "px"
    })
    $(x).toggleClass("form-open")
  }

  closeFormModal(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault()
    var x = document.getElementById('Enr');
    $(x).toggleClass("form-open")
  }

sendFormData(e: React.MouseEvent<HTMLInputElement>) {
  e.preventDefault()
  var form = e.target as HTMLFormElement
  let _typeSelect = document.getElementsByName("NomActivite")[0] as HTMLInputElement
  let _resultat = document.getElementsByName("resultat")[0] as HTMLInputElement
  TypeAction = parseInt(_typeSelect.value)
  var resultatAction = _resultat.value
  if(TypeAction !=0&&resultatAction !="")
  {
    console.log(TypeAction)

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
  
  console.log(text);
  var data = JSON.parse(text);
  console.log(data);
  this.RightClick.bind(this)

  var xmlhttp = new XMLHttpRequest();
  var _this = this;
  console.log(_this);
 
  xmlhttp.open('POST', 'http://localhost:3000/api/edition/PostJoueur', true);
  xmlhttp.setRequestHeader('Content-type', 'application/json');
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4) {
       var response = xmlhttp.responseText;
       console.log(response)
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
  xmlhttp.send(text);
  }
  else{
     console.log(TypeAction)
     console.log(resultatAction)

     var span = document.getElementById("rep");
        span.innerHTML="Veuillez rentrer toute les informations sur l'action"
  }
   
}

 
  
    render() {

         
      //tableau qui contiendra tout les numéros des joueurs
       
        //Remplis le tableau
        var TableauNumero = [];
        var TableauID:any = [];
        console.log("yeee")
        var xmlhttp = new XMLHttpRequest();
        var _this = this;
        console.log(_this);
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "http://localhost:3000/api/edition/GetJoueurs", false ); // false for synchronous request
        xmlHttp.send( null );
        var data =JSON.parse(xmlHttp.responseText)
        console.log(xmlHttp.responseText)
        for(var i = 0; i < data.length; i++) {
          var obj = data[i];
         
          TableauNumero.push(obj.Numero);
          TableauID.push(obj.ID);
          
   }
    
        
   
       //Crée une liste de bouton
        var LstButtonNumero = TableauNumero.map(function(leNum,index){
          console.log()
        return <li><div className="col-xs-3"><button className="player-btn" type="button"  onClick={this.RightClick.bind(this)} name="def" value={TableauID[index]} >Joueur numéro {leNum}</button></div></li>; },this)
                         
      //tableau qui contiendra tout les numéros des joueurs
       
         var TableauAction = [];
         var TableauActionID:any = [];
         var xmlhttp = new XMLHttpRequest();
         var _this = this;
         console.log(_this);
         var xmlHttp = new XMLHttpRequest();
         xmlHttp.open( "GET", "http://localhost:3000/api/edition/GetActions", false ); // false for synchronous request
         xmlHttp.send( null );
         var dataAction =JSON.parse(xmlHttp.responseText)
         console.log(xmlHttp.responseText)
        for(var i = 0; i < dataAction.length; i++) {
         var objAction= dataAction[i];
         console.log(objAction.Nom)
          console.log("test" + objAction.ID)
          TableauAction.push(objAction.Nom);
          TableauActionID.push(objAction.ID);
   }

      
       //Crée une liste de bouton
        var LstAction = TableauAction.map(function(leNum,index){
              return <option name="TypeAction" value={TableauActionID[index]}>{leNum}</option>;
            })

        return (
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
