import * as React from "react";
import store from "../../Manage/manageStore";
import * as manageActions from "../../Manage/manageActions";

import { Button } from "react-bootstrap";

export interface ILayoutProps {}
export interface ILayoutState {}
var TableauSeason:any = [];
var TableauJoueurs:any=[];
var TableauJoueursId:any=[];


export default class Seasons extends React.Component<ILayoutProps, ILayoutState> {
	componentWillMount(){
		manageActions.getSaison();
	// 	store.on("change",() =>{
	// 	console.log("changing...");
    //   	var allSaison=store.GetAllSeasons();
	//     var datastringify =JSON.stringify(allSaison);
	// 	var tabJson = JSON.parse(datastringify);
		

	// 	//Rentre le id et le nom de l'action dans le tableau correspondant
    //     for(var i = 0; i < tabJson.length; i++) {
	// 	 var data =tabJson[i];
    //      TableauSeason.push(data.Annees);
  	// 	 }
	// 	this.test();
		
    // })

     

}
	sendFormData(e: React.MouseEvent<HTMLInputElement>) {
  e.preventDefault()
  //Va rechercher le formulaire
  var form = e.target as HTMLFormElement
  //Va chercher le type de l'active
  let _Annee = document.getElementById("Annee")as HTMLInputElement
  var annee= _Annee.value

      //Preparation du json que l'on va envoyer au server
        var text = '{'
       +'"Annees" :'+'"'+annee+'"'
       +'}'
manageActions.PostSaison(text);
}
test(){
	
	
	var LstAction = TableauSeason.map(function(leNum){
			 console.log("gogogogo");
			 var doc = document.getElementById("wow");
			 console.log(doc);
			 console.log(leNum);
			 var x = document.createElement("LI");
			 x.innerHTML=leNum;
			 doc.appendChild(x);
              return <li name="TypeAction">{leNum}</li>;
    	})
}
deleteChild(){
	var list = document.getElementById("wow");
	
	for (var i=0;i<list.childNodes.length;i++)
	{
		list.removeChild(list.childNodes[i]);  
	}

}
    render() {
		
	
		
        return (
			
	<div id="test">
	<ul id="wow">
	</ul>
    <form onSubmit={this.sendFormData.bind(this)}>  
      <h3>Creer une nouvelle saison</h3>     
      <label htmlFor="Annee">Année</label>
      <input type="text" id="Annee" name="Annee"/>  			
	  <input type="submit" value="Submit"  />           
	</form> 
</div>
        );
    }
}