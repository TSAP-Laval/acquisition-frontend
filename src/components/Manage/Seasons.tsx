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
    store.on("change", () => {
    this.RemplirSaison();
});
}
private RemplirSaison(){
    this.ClearDomElement("tbody");
    // tslint:disable:prefer-const
    let allSaison = store.GetAllSeasons();
    let datastringify = JSON.stringify(allSaison);
    let tabJson = JSON.parse(datastringify);
	// Rentre le id et le nom de l'action dans le tableau correspondant
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < tabJson.length; i++) {
       let data = tabJson[i];
       let doc = document.getElementById("tbody");
       let x = document.createElement("tr");
       let tdAnnnee = document.createElement("td");
       tdAnnnee.innerHTML = data.Years;
       let td =  document.createElement("BUTTON");
       td.innerHTML = "Modifier";
       x.appendChild(tdAnnnee);
       x.appendChild(td);
       doc.appendChild(x);
    }

}
private sendFormData(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault();
	// Va rechercher le formulaire
    let form = e.target as HTMLFormElement;
	// Va chercher le type de l'active
    let letAnnee = document.getElementById("Annee")as HTMLInputElement;
    let annee = letAnnee.value;
	// Preparation du json que l'on va envoyer au server
    // tslint:disable-next-line:quotemark
    let text = '{'
        + '"Years" :' + '"' + annee + '"'
        + "}";
    manageActions.postSaison(text);
}
private ClearDomElement(nom: string){
    let doc = document.getElementById(nom);
    while (doc.hasChildNodes()) {
        doc.removeChild(doc.lastChild);
    }
 }
private deleteChild(){
    let list = document.getElementById("wow");
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < list.childNodes.length; i++)
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
                    {/*tslint:disable-next-line:jsx-boolean-value*/}
                    <input type="text" id="Annee" name="Annee"required/>  		
                    <input type="submit" value="Ajouter"  />           
                </form> 
                </div>
            </div>
        </div>

        );
    }
// tslint:disable-next-line:eofline
}