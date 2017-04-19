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

    const doc = document.getElementById(nom);
    while (doc.hasChildNodes()) {
        doc.removeChild(doc.lastChild);
    }
}
private RemplirSelect(){
    this.ClearDomElement("Sport");
    const allSport = store.GetAllSports();
    const datastringify = JSON.stringify(allSport);
    const tabJson = JSON.parse(datastringify);
	    // Rentre le id et le nom de l'action dans le tableau correspondant
        // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < tabJson.length; i++) {
        const data = tabJson[i];
        const doc = document.getElementById("Sport");
        const x = document.createElement("OPTION") as HTMLInputElement;
        x.innerHTML = data.Name;
        x.value = data.ID;
        doc.appendChild(x);
        }
}
private LstEquipe()	{
    this.ClearDomElement("tbody");
    const Allequipe = store.GetAllequipe();
    const datastringify = JSON.stringify(Allequipe);
    const tabJson = JSON.parse(datastringify);
	// Rentre le id et le nom de l'action dans le tableau correspondant
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < tabJson.length; i++) {
        const data = tabJson[i];
        const sportNom = store.getSportNom(data.SportID);
        const NiveauNom = store.getNiveauNom(data.CategoryID);
        const doc = document.getElementById("tbody");
        const x = document.createElement("tr");
        const tdBtn =  document.createElement("BUTTON"); ;
        tdBtn.innerHTML = "Ajouter";
        const tdNom = document.createElement("td");
        tdNom.innerHTML = data.Name;
        const tdVille = document.createElement("td");
        tdVille.innerHTML = data.City;
        const tdSportID = document.createElement("td");
        tdSportID.innerHTML = sportNom;
        const tdNiveauID = document.createElement("td");
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
    const allSport = store.GetAllNiveau();
    const datastringify = JSON.stringify(allSport);
    const tabJson = JSON.parse(datastringify);
		// Rentre le id et le nom de l'action dans le tableau correspondant
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < tabJson.length; i++) {
        const data = tabJson[i];
        const doc = document.getElementById("Niveau");
        const x = document.createElement("OPTION") as HTMLInputElement;
        x.innerHTML = data.Name;
        x.value = data.ID;
        doc.appendChild(x);
    }
}
private sendFormData(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault();
	// Va rechercher le formulaire
    const form = e.target as HTMLFormElement;
	// Va chercher le type de l'active
    const letNomTeam = document.getElementById("Nom")as HTMLInputElement;
    const nomTeam = letNomTeam.value;
    const letVilleTeam = document.getElementById("Ville")as HTMLInputElement;
    const VilleTeam = letVilleTeam.value;
    const letsportSelect = document.getElementsByName("Sport")[0] as HTMLSelectElement;
    const optSport = letsportSelect.options[letsportSelect.selectedIndex];
    const letniveauSelect = document.getElementsByName("Niveau")[0] as HTMLSelectElement;
    const niveau = letniveauSelect.options[letniveauSelect.selectedIndex];
	// Preparation du json que l'on va envoyer au server
    const text = "{"
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
}
