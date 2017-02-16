import * as React from "react";
import * as ReactDOM from "react-dom";
import store from "./manageStore";
import * as manageActions from "./manageActions";

import {Button, ButtonToolbar} from "react-bootstrap";


export interface ILayoutProps {}
export interface ILayoutState {}
var numJoueur ="";
var TableauJoueurs:any=[];
var TableauJoueursId:any=[];


export default class Players extends React.Component<ILayoutProps, ILayoutState> {

componentWillMount(){
		manageActions.getSport();
        manageActions.getJoueur();
		manageActions.getNiveau();
		manageActions.getEquipes();
		store.on("change",() =>{
		this.LstJoueurs();
        this.RemplirSelect();
		
    })
    
	}
    LstJoueurs()
	{
      	var AllJoueurs= store.GetAllJoueurs();
	    var datastringify =JSON.stringify(AllJoueurs);
		var tabJson = JSON.parse(datastringify);
		
		//Rentre le id et le nom de l'action dans le tableau correspondant
        for(var i = 0; i < tabJson.length; i++) {
		var doc = document.getElementById("tempo");
        var data =tabJson[i];
            console.log("wowoowwaaaddd");
            console.log(data);
        	 
			 var x = document.createElement("Li");
			 x.innerHTML=data.Nom;
			 x.nodeValue=data.ID;
			 doc.appendChild(x);
		}
	}
    RemplirSelect()
	{
		
      	var allSport= store.GetAllequipe();
	
	    var datastringify =JSON.stringify(allSport);
		var tabJson = JSON.parse(datastringify);
		
		//Rentre le id et le nom de l'action dans le tableau correspondant
        for(var i = 0; i < tabJson.length; i++) {
             var data =tabJson[i];
            var doc = document.getElementById("equipe");
			 var x = document.createElement("OPTION");
			 x.innerHTML=data.Nom;
			 x.nodeValue=data.ID;
			 doc.appendChild(x);
		}

	}
sendFormData(e: React.MouseEvent<HTMLInputElement>) {
  e.preventDefault()
  //Va rechercher le formulaire
  var form = e.target as HTMLFormElement
  //Va chercher le type de l'active
  let _NomJoueur = document.getElementById("Nom")as HTMLInputElement
  var nomjoueur= _NomJoueur.value
  let _PrenomJoueur = document.getElementById("Prenom")as HTMLInputElement
  var prenomjoueur= _PrenomJoueur.value
  let _NumeroJoueur = document.getElementById("Numero")as HTMLInputElement
  var numerojoueur= _NumeroJoueur.value
  console.log("le num " + numerojoueur)
  let _EmailJoueur = document.getElementById("Email")as HTMLInputElement
  var emailJoueur= _EmailJoueur.value

      //Preparation du json que l'on va envoyer au server
      
        var text = '{'
       +'"Nom" :'+ '"'+ nomjoueur+'",'
       +'"Prenom" :'+ '"'+prenomjoueur + '",'
	   +'"Numero" : '+numerojoueur + ','
	   +'"Email" : '+ '"'+emailJoueur + '",'
       +'"PassHash" : "test22" ,'
       +'"TokenInvitation" : "test" ,'
       +'"TokenReinitialisation" : "test ",'
       +'"TokenConnexion" : "test"'
       +'}'
       console.log("text" + text);
       manageActions.PostJoueur(text);
}

    render() {
        return (

			<div id="test">
				<h2> test</h2>
                <ul id = "tempo">
	            </ul>
			 <form onSubmit={this.sendFormData.bind(this)}>  
                    <h3>Creer un nouveaux joueur</h3>     
                    <label htmlFor="Nom">Nom</label>
                    <input type="text" id="Nom" name="Nom"/> 
					<label htmlFor="Prenom">Prenom</label>
                    <input type="text"id="Prenom" name="Prenom"/>
					<label htmlFor="Numero">Numero</label>
                    <input type="text"id="Numero" name="Numero"/> 
					<label htmlFor="Email">Email</label>
                    <input type="text"id="Email" name="Email"/> 			
                    <label htmlFor="equipe">Sport</label>                  
                     <select id="equipe" name="equipe"></select><br></br>    
                    <input type="submit" value="Submit"  />  
                             
                 </form> 
			</div>
        );
    }
}

