import * as React from "react";
import * as manageActions from "../../actions/ManageActions";
import store from "../../stores/TeamStore";

// tslint:disable-next-line:no-empty-interface
export interface ILayoutProps {}
// tslint:disable-next-line:no-empty-interface
export interface ILayoutState {}

export default class Teams extends React.Component<ILayoutProps, ILayoutState> {
private componentWillMount(){
    manageActions.getSport();
    manageActions.getNiveau();
    manageActions.getEquipes();
    store.on("change", () => {
        this.RemplirSelect();
        this.RemplirNiveau();
        this.LstEquipe();

    });
}
private ClearDomElement(nom: string){
    // tslint:disable:prefer-const
    let doc = document.getElementById(nom);
    while (doc.hasChildNodes()) {
        doc.removeChild(doc.lastChild);
    }
}
private RemplirSelect(){
    this.ClearDomElement("Sport");
    let allSport = store.GetAllSports();
    let datastringify = JSON.stringify(allSport);
    let tabJson = JSON.parse(datastringify);
	    // Rentre le id et le nom de l'action dans le tableau correspondant
        // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < tabJson.length; i++) {
        let data = tabJson[i];
        let doc = document.getElementById("Sport");
        let x = document.createElement("OPTION") as HTMLInputElement;
        x.innerHTML = data.Name;
        x.value = data.ID;
        doc.appendChild(x);
        }
}
private LstEquipe()	{
    this.ClearDomElement("tbody");
    let Allequipe = store.GetAllequipe();
    let datastringify = JSON.stringify(Allequipe);
    let tabJson = JSON.parse(datastringify);
	// Rentre le id et le nom de l'action dans le tableau correspondant
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < tabJson.length; i++) {
        let data = tabJson[i];
        let sportNom = store.getSportNom(data.SportID);
        let NiveauNom = store.getNiveauNom(data.CategoryID);
        let doc = document.getElementById("tbody");
        let x = document.createElement("tr");
        let tdBtn =  document.createElement("BUTTON"); ;
        tdBtn.innerHTML = "Ajouter";
        let tdNom = document.createElement("td");
        tdNom.innerHTML = data.Name;
        let tdVille = document.createElement("td");
        tdVille.innerHTML = data.City;
        let tdSportID = document.createElement("td");
        tdSportID.innerHTML = sportNom;
        let tdNiveauID = document.createElement("td");
        tdNiveauID.innerHTML = NiveauNom;
        x.appendChild(tdNom);
        x.appendChild(tdVille);
        x.appendChild(tdSportID);
        x.appendChild(tdNiveauID);
        x.appendChild(tdBtn);
        doc.appendChild(x);
        }
}
private RemplirNiveau(){
    this.ClearDomElement("Niveau");
    let allSport = store.GetAllNiveau();
    let datastringify = JSON.stringify(allSport);
    let tabJson = JSON.parse(datastringify);
		// Rentre le id et le nom de l'action dans le tableau correspondant
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < tabJson.length; i++) {
        let data = tabJson[i];
        let doc = document.getElementById("Niveau");
        let x = document.createElement("OPTION") as HTMLInputElement;
        x.innerHTML = data.Name;
        x.value = data.ID;
        doc.appendChild(x);
    }
}
private sendFormData(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault();
	// Va rechercher le formulaire
    let form = e.target as HTMLFormElement;
	// Va chercher le type de l'active
    let letNomTeam = document.getElementById("Nom")as HTMLInputElement;
    let nomTeam = letNomTeam.value;
    let letVilleTeam = document.getElementById("Ville")as HTMLInputElement;
    let VilleTeam = letVilleTeam.value;
    let letsportSelect = document.getElementsByName("Sport")[0] as HTMLSelectElement;
    let optSport = letsportSelect.options[letsportSelect.selectedIndex];
    let letniveauSelect = document.getElementsByName("Niveau")[0] as HTMLSelectElement;
    let niveau = letniveauSelect.options[letniveauSelect.selectedIndex];
	// Preparation du json que l'on va envoyer au server
    let text = "{"
        + '"Name" :' + '"' + nomTeam + '",'
        + '"City" : ' + '"' + VilleTeam + '",'
        + '"SportID" : ' + optSport + ","
        + '"CategoryID" : ' + niveau + ""
        + "}";
    manageActions.postTeam(text);
}
public render() {
    return (
        <div className="container">
             <div className="row">
                <div className="col-md-6 col-sm-6 col-xs-12">
                <h3>Les équipes :</h3>
                    <div id="TableSelect">
                        <table className="table table-bordered table-hover" id="">
                        <thead>
                            <tr >
                            <th className="text-center">
                                Nom
                            </th>
                            <th className="text-center">
                                Ville
                            </th>
                            <th className="text-center">
                                Sport
                            </th>
                            <th className="text-center">
                                Niveau
                            </th>  
                            <th className="text-center">
                                action
                            </th>                                         
                            </tr>
                        </thead>
                        <tbody id="tbody" />                                       
                    </table>
                    </div>
                <form onSubmit={this.sendFormData.bind(this)} id="nouvTeam">  
                <h3>Creer une nouvelle équipe</h3>     
                <label htmlFor="Nom">Nom</label>
                <input type="text" id="Nom" name="Nom"/> <br />
                <label htmlFor="Ville">Ville</label>
                <input type="text"id="Ville" name="Ville"/><br />	
                <label htmlFor="Sport">Sport</label>                  
                <select id="Sport" name="Sport" /><br />
                <label htmlFor="Niveau">Niveau</label>                  
                <select id="Niveau" name="Niveau"  /><br />
                <input type="submit" value="Submit"  />            
                </form> 
                </div>
             </div>
        </div>
        );
    }
// tslint:disable-next-line:eofline
}