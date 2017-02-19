import * as React from "react";
import store from "./seasonStore";
import * as manageActions from "./manageActions";

import { Button } from "react-bootstrap";

export interface ILayoutProps {}
export interface ILayoutState {}


export default class Seasons extends React.Component<ILayoutProps, ILayoutState> {
	componentWillMount(){
		manageActions.getSaison();
	 	store.on("change",() =>{
			 this.RemplirSaison();
		
     })

     

}
RemplirSaison(){
	this.ClearDomElement("tbody")
	var allSaison=store.GetAllSeasons();
	     var datastringify =JSON.stringify(allSaison);
 	var tabJson = JSON.parse(datastringify);
	//Rentre le id et le nom de l'action dans le tableau correspondant
    for(var i = 0; i < tabJson.length; i++) {
	 	 var data =tabJson[i];
		  	  var doc = document.getElementById("tbody");
			  var x = document.createElement("tr");
			  
			  var tdAnnnee = document.createElement("td");
			  tdAnnnee.innerHTML=data.Annees;
              var td =  document.createElement("BUTTON");;
			  td.innerHTML= "Modifier"
			  x.appendChild(tdAnnnee);
              x.appendChild(td);
			  console.log(x);
			  doc.appendChild(x);
         
	}
	 	
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
  ClearDomElement(nom:string){
        console.log(nom);
        var doc = document.getElementById(nom);
        console.log("YEPPP");
        while (doc.hasChildNodes()) {
        doc.removeChild(doc.lastChild);
        }
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
			

	     <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-sm-6 col-xs-12">

                                <h3>Les saisons :</h3>
								<div id="TableSelect">
                                <table className="table table-bordered table-hover" >
                                    <thead>
                                        <tr >
                                        
                                            <th className="text-center">
                                                Annee
                                            </th>
                                           <th className="text-center">
                                               action
                                            </th>
                                           
                                        </tr>
                                    </thead>
                                    <tbody id="tbody">
                                    </tbody>
                                </table>
								</div>
    <form onSubmit={this.sendFormData.bind(this)} id="nouvSaison">   
      <h3>Creer une nouvelle saison</h3>     
      <label htmlFor="Annee">Année</label>
      <input type="text" id="Annee" name="Annee"/>  		
	  <input type="submit" value="Ajouter"  />           
	</form> 
	</div>
	</div>
	</div>

        );
    }
}