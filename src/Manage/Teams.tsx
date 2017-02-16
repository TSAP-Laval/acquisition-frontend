import * as React from "react";
import store from "./manageStore";
import * as manageActions from "./manageActions";
export interface ILayoutProps {}
export interface ILayoutState {}
var TableauSport:any=[];
var TableauSportID:any=[];
var TableauNiveau:any=[];
var TableauNiveauID:any=[];
var TableauEquipe:any=[];
var TableauEquipeID:any=[];
export default class Teams extends React.Component<ILayoutProps, ILayoutState> {
	componentWillMount(){
		manageActions.getSport();
		manageActions.getNiveau();
		manageActions.getEquipes();
	/*	store.on("change",() =>{
		this.RemplirSelect();
		this.RemplirNiveau();
		this.LstEquipe();
		
    })*/
	}

	RemplirSelect()
	{
		
      	var allSport= store.GetAllSports();
	
	    var datastringify =JSON.stringify(allSport);
		var tabJson = JSON.parse(datastringify);
		
		//Rentre le id et le nom de l'action dans le tableau correspondant
        for(var i = 0; i < tabJson.length; i++) {
	
		
		 var data =tabJson[i];
         TableauSport.push(data.Nom);
		 TableauSportID.push(data.ID);
		}

		 var LstAction = TableauSport.map(function(leNum,index){
			var doc = document.getElementById("Sport");
			 var x = document.createElement("OPTION");
			 x.innerHTML=leNum;
			 x.nodeValue=TableauSportID[index];
			 doc.appendChild(x);
              return;
            });	
	}
	LstEquipe()
	{
      	var Allequipe= store.GetAllequipe();
	    var datastringify =JSON.stringify(Allequipe);
		var tabJson = JSON.parse(datastringify);
		
		//Rentre le id et le nom de l'action dans le tableau correspondant
        for(var i = 0; i < tabJson.length; i++) {
	
		
		 var data =tabJson[i];
         TableauEquipe.push(data.Nom);
		 TableauEquipeID.push(data.ID);
		}

		 var LstAction = TableauEquipe.map(function(leNum,index){
			var doc = document.getElementById("tempo");

			 var x = document.createElement("Li");
			 x.innerHTML=leNum;
			 x.nodeValue=TableauEquipeID[index];
			 doc.appendChild(x);
              return;
            });	
	}
	RemplirNiveau()
	{
      	var allSport= store.GetAllNiveau();
	    var datastringify =JSON.stringify(allSport);
		var tabJson = JSON.parse(datastringify);
		
		//Rentre le id et le nom de l'action dans le tableau correspondant
        for(var i = 0; i < tabJson.length; i++) {
	
		
		 var data =tabJson[i];
         TableauNiveau.push(data.Nom);
		 TableauNiveauID.push(data.ID);
		}

		 var LstAction = TableauNiveau.map(function(leNum,index){
			var doc = document.getElementById("Niveau");
			 var x = document.createElement("OPTION");
			 x.innerHTML=leNum;
			 x.nodeValue=TableauNiveauID[index];
			 doc.appendChild(x);
              return;
            });	
	}
	sendFormData(e: React.MouseEvent<HTMLInputElement>) {
  e.preventDefault()
  //Va rechercher le formulaire
  /*var form = e.target as HTMLFormElement
  //Va chercher le type de l'active
  let _NomJoueur = document.getElementById("Nom")as HTMLInputElement
  var nomjoueur= _NomJoueur.value
  let _PrenomJoueur = document.getElementById("Prenom")as HTMLInputElement
  var prenomjoueur= _PrenomJoueur.value
  let _NumeroJoueur = document.getElementById("Prenom")as HTMLInputElement
  var numerojoueur= _NumeroJoueur.value
  let _EmailJoueur = document.getElementById("Email")as HTMLInputElement
  var emailJoueur= _EmailJoueur.value

      //Preparation du json que l'on va envoyer au server
        var text = '{'
       +'"Nom" :'+nomjoueur+','
       +'"Prenom" : '+prenomjoueur + ','
	   +'"Numero" : '+numerojoueur + ','
	   +'"Email" : '+emailJoueur + ','
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
       +'}'*/
}

    render() {
		 

        return (
	<div id="test">
    
	<h1> Teams :</h1>
	<ul id = "tempo">
	</ul>
	<form onSubmit={this.sendFormData.bind(this)}>  
     <h3>Creer une nouvelle équipe</h3>     
     <label htmlFor="Nom">Nom</label>
     <input type="text" id="Nom" name="Nom"/> 
	 <label htmlFor="Ville">Ville</label>
     <input type="text"id="Ville" name="Ville"/>	
	 <label htmlFor="Sport">Sport</label>                  
    <select id="Sport" name="Sport"></select><br></br>
	 <label htmlFor="Niveau">Niveau</label>                  
    <select id="Niveau" name="Niveau"></select><br></br>	
     <input type="submit" value="Submit"  />            
    </form> 
</div>

        );
    }
}