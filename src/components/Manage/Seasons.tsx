import * as React from "react";
import * as manageActions from "../../actions/ManageActions";
import store from "../../stores/SeasonStore";


import { Button } from "react-bootstrap";

// tslint:disable-next-line:no-empty-interface
export interface ILayoutProps {}
// tslint:disable-next-line:no-empty-interface
export interface ILayoutState {}

export default class Seasons extends React.Component<ILayoutProps, ILayoutState> {
private componentWillMount(){
    manageActions.getSaison();
    store.on("change",() =>{
    this.RemplirSaison();	
})
}
private RemplirSaison(){
    this.ClearDomElement("tbody")
    var allSaison=store.GetAllSeasons();
    var datastringify =JSON.stringify(allSaison);
    var tabJson = JSON.parse(datastringify);
	// Rentre le id et le nom de l'action dans le tableau correspondant
    // tslint:disable-next-line:prefer-for-of
    for (var i = 0; i < tabJson.length; i++) {
       var data =tabJson[i];
       var doc = document.getElementById("tbody");
       var x = document.createElement("tr");  
       var tdAnnnee = document.createElement("td");
       tdAnnnee.innerHTML=data.Years;
       var td =  document.createElement("BUTTON");
       td.innerHTML= "Modifier"
       x.appendChild(tdAnnnee);
       x.appendChild(td);
       doc.appendChild(x);     
    }
	 	
}
private sendFormData(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault()
	// Va rechercher le formulaire
    var form = e.target as HTMLFormElement
	// Va chercher le type de l'active
    let letAnnee = document.getElementById("Annee")as HTMLInputElement
    var annee= letAnnee.value
	// Preparation du json que l'on va envoyer au server
    var text = '{'
        +'"Years" :'+'"'+annee+'"'
        +'}'
    manageActions.postSaison(text);
}  
private ClearDomElement(nom:string){
    var doc = document.getElementById(nom);
    while (doc.hasChildNodes()) {
        doc.removeChild(doc.lastChild);
    }
 }
private deleteChild(){
    var list = document.getElementById("wow");
    // tslint:disable-next-line:prefer-for-of
    for (var i=0;i<list.childNodes.length;i++)
    {
        list.removeChild(list.childNodes[i]);  
    }

}
public render() {
    return (	
        <div className="container">
            <div className="row">
                <div className="col-md-6 col-sm-6 col-xs-12">
                <h3>Les saisons :</h3>
                <div id="TableSelect">
                    <table className="table table-bordered table-hover" >
                        <thead>
                            <tr>       
                            <th className="text-center">
                                 Annee
                            </th>
                            <th className="text-center">
                                 action
                            </th>                                         
                            </tr>
                        </thead>
                    <tbody id="tbody"/>
                    </table>
                </div>
                <form onSubmit={this.sendFormData.bind(this)} id="nouvSaison">   
                    <h3>Creer une nouvelle saison</h3>     
                    <label htmlFor="Annee">Année</label>
                    <input type="text" id="Annee" name="Annee"required/>  		
                    <input type="submit" value="Ajouter"  />           
                </form> 
                </div>
            </div>
        </div>

        );
    }
}