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
    manageActions.getSaisonTeam();
    store.on("change", () => {
        this.RemplirSelect();
        this.RemplirNiveau();
        this.RemplirSaison();
        this.LstEquipe();
        if ( store.EnModification() === true){
            this.remplirModif();
        }
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
private RemplirSaison(){
    this.ClearDomElement("Saison");
    const allSaison = store.GetAllSeason();
    const datastringify = JSON.stringify(allSaison);
    const tabJson = JSON.parse(datastringify);
	    // Rentre le id et le nom de l'action dans le tableau correspondant
        // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < tabJson.length; i++) {
        const data = tabJson[i];
        const doc = document.getElementById("Saison");
        const x = document.createElement("OPTION") as HTMLInputElement;
        x.innerHTML = data.Years;
        x.value = data.ID;
        doc.appendChild(x);
        }
}
private ModifTeam(i: any, nom: any){
    manageActions.getUneEquipe(nom);
}
private remplirModif(){
    const lequipe = store.GetUneEquipe();
    const datastringify = JSON.stringify(lequipe);
    const tabJson = JSON.parse(datastringify);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < tabJson.length; i++) {
        const data = tabJson[i];
        const inputNom = document.getElementById("Nom") as HTMLInputElement;
        inputNom.value = data.Name;
        const inputCity = document.getElementById("Ville")as HTMLInputElement;
        inputCity.value = data.City;
        const letsportSelect = document.getElementById("Sport") as HTMLSelectElement;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0 ; i < letsportSelect.options.length; i++)
        {
            if (letsportSelect.options[i].value === data.SportID){
             letsportSelect.options[i].selected = true;
            }
        }
        const letniveauSelect = document.getElementById("Niveau") as HTMLSelectElement;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0 ; i < letniveauSelect.options.length; i++)
        {
            if (letniveauSelect.options[i].value === data.CategoryID){
             letniveauSelect.options[i].selected = true;
            }
        }
        const letSaison = document.getElementById("Saison") as HTMLSelectElement;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0 ; i < letSaison.options.length; i++)
        {
            if (letSaison.options[i].value === data.SeasonID){
             letSaison.options[i].selected = true;
            }
        }
        const lstRadioSexe = document.getElementsByName("Sexe");
        if ( data.Sexe === "M" )
        {
          const leRadio = lstRadioSexe[0] as HTMLInputElement;
          leRadio.checked = true;
        }
        else
        {
          const leRadio = lstRadioSexe[1] as HTMLInputElement;
          leRadio.checked = true;
        }
        const inputID = document.getElementById("ID") as HTMLInputElement;
        inputID.value = data.ID;
        const inputSubmit = document.getElementById("btnSubmit") as HTMLButtonElement;
        inputSubmit.value = "modifier";
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
        tdBtn.innerHTML = "Modifier";
        tdBtn.onclick = this.ModifTeam.bind(this, i, data.Name);
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
    const optSport = letsportSelect.options[letsportSelect.selectedIndex] as HTMLOptionElement;
    const letniveauSelect = document.getElementsByName("Niveau")[0] as HTMLSelectElement;
    const niveau = letniveauSelect.options[letniveauSelect.selectedIndex]as HTMLOptionElement;
    const letSaison = document.getElementsByName("Saison")[0] as HTMLSelectElement;
    const saison = letSaison.options[letSaison.selectedIndex]as HTMLOptionElement;
    const lstRadioSexe = document.getElementsByName("Sexe");
    let SexeValue;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < lstRadioSexe.length; i++){
    const leRadio = lstRadioSexe[i] as HTMLInputElement;
    if (leRadio.checked){
        SexeValue = leRadio.value;
    }
    }
    const inputSubmit = document.getElementById("btnSubmit") as HTMLButtonElement;
    if (inputSubmit.value === "modifier"){
        const inputID = document.getElementById("ID") as HTMLInputElement; ;
        const text = "{"
        + '"ID" :' +  + inputID.value + ","
        + '"Name" :' + '"' + nomTeam + '",'
        + '"City" : ' + '"' + VilleTeam + '",'
        + '"SportID" : ' + optSport.value + ","
        + '"CategoryID" : ' + niveau.value + ","
        + '"SaisonID" : ' + saison.value + ","
        + '"Sexe" : ' + '"' + SexeValue + '"'
        + "}";
        manageActions.putTeam(text, inputID.value);
    }
    else{
	// Preparation du json que l'on va envoyer au server
    const text = "{"
        + '"Name" :' + '"' + nomTeam + '",'
        + '"City" : ' + '"' + VilleTeam + '",'
        + '"SportID" : ' + optSport.value + ","
        + '"CategoryID" : ' + niveau.value + ","
        + '"SaisonID" : ' + saison.value + ","
        + '"Sexe" : ' + '"' + SexeValue + '"'
        + "}";
    manageActions.postTeam(text);
    }
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
                <select id="Sport" name="Sport"/><br />
                <label htmlFor="Niveau">Niveau</label>                  
                <select id="Niveau" name="Niveau"/><br />
                <label htmlFor="Saison">Saison</label>
                <select id="Saison" name="Saison"/><br />
                <label htmlFor="Sexe">Sexe </label>
                <input type="radio" name="Sexe" value="M"/>Masculin
                <input type="radio" name="Sexe" value="F"/>Féminin
                <br/>
                <input type="hidden" id="ID"/> 
                <input type="submit" id="btnSubmit" value="Submit"  />            
                </form> 
                </div>
             </div>
        </div>
        );
    }
}
