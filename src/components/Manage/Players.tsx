import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button, Alert, Modal } from "react-bootstrap";
import * as manageActions from "../../actions/ManageActions";
import store from "../../stores/PlayersStore";
// tslint:disable-next-line:no-empty-interface
export interface ILayoutProps {}
// tslint:disable-next-line:no-empty-interface
export interface ILayoutState {}

export default class Players extends React.Component<ILayoutProps, ILayoutState> {
private componentWillMount(){
    manageActions.getSportJoueur();
    manageActions.getJoueur();
    manageActions.getNiveauJoueur();
    manageActions.getEquipesJoueur();
    store.on("change", () => {
        this.LstJoueurs();
        this.RemplirSelect();
    });
}
private LstJoueurs(){
    this.ClearDomElement("tbody");
    const AllJoueurs = store.GetAllJoueurs();
    const datastringify = JSON.stringify(AllJoueurs);
    const tabJson = JSON.parse(datastringify);
        // Rentre le id et le nom de l'action dans le tableau correspondant
    for ( let i = 0; i < tabJson.length; i++) {
            const data = tabJson[i];
            const doc = document.getElementById("tbody");
            const x = document.createElement("tr");
            const tdNom = document.createElement("td");
            tdNom.innerHTML = data.Lname;
            const tdPrenom = document.createElement("td");
            tdPrenom.innerHTML = data.Fname;
            const tdNumero = document.createElement("td");
            tdNumero.innerHTML = data.Number;
            const tdEmail = document.createElement("td");
            tdEmail.innerHTML = data.Email;
            const btnModifier = document.createElement("button") as HTMLButtonElement;
            btnModifier.innerHTML = "modifier";
            btnModifier.onclick = this.ModifJoueur.bind(this, i, data.ID);
            x.appendChild(tdNom);
            x.appendChild(tdPrenom);
            x.appendChild(tdNumero);
            x.appendChild(tdEmail);
            x.appendChild(btnModifier);
            doc.appendChild(x);
        }
}
private ModifJoueur(i: any, id: any){
    /*let doc = document.getElementById("action_table") as HTMLTableElement;
    let t = doc.rows[i+1];
    let nomjoueur= t.cells[0].innerHTML;
    let inputNom = document.getElementById("Nom") as HTMLInputElement;
    inputNom.value=nomjoueur;
    let prenomjoueur= t.cells[1].innerHTML;
    let inputPrenom = document.getElementById("Prenom") as HTMLInputElement;
    inputPrenom.value=prenomjoueur;
    let numeroJoueur= t.cells[2].innerHTML;
    let inputNumero = document.getElementById("Numero") as HTMLInputElement;
    inputNumero.value=numeroJoueur;
    let emailJoueur= t.cells[3].innerHTML;
    let inputEmail = document.getElementById("Email") as HTMLInputElement;
    inputEmail.value=emailJoueur;
    let btnSubmit = document.getElementById("btnSubmit") as HTMLButtonElement;
    btnSubmit.value="Modifier";
    let inputID = document.getElementById("ID") as HTMLInputElement;
    inputID.value=id;*/

}
private ClearDomElement(nom: string){
    const doc = document.getElementById(nom);
    while (doc.hasChildNodes()) {
    doc.removeChild(doc.lastChild);
    }
}
private RemplirSelect(){
    this.ClearDomElement("equipe");
    const allSport = store.GetAllequipeJoueur();
    const datastringify = JSON.stringify(allSport);
    const tabJson = JSON.parse(datastringify);
        // Rentre le id et le nom de l'action dans le tableau correspondant
        // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < tabJson.length; i++) {
        const data = tabJson[i];
        const leNiv = store.getNiveauNom(data.CategoryID);
        const doc = document.getElementById("equipe");
        const x = document.createElement("OPTION") as HTMLInputElement;
        x.innerHTML = data.Name + "  " + leNiv;
        x.value = data.ID;
        doc.appendChild(x);
        }
}
private sendFormData(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault();
    // Va rechercher le formulaire
    const form = e.target as HTMLFormElement;
    // Va chercher le type de l'active
    const letNomJoueur = document.getElementById("Nom")as HTMLInputElement;
    const nomjoueur = letNomJoueur.value;
    const letPrenomJoueur = document.getElementById("Prenom")as HTMLInputElement;
    const prenomjoueur = letPrenomJoueur.value;
    const letNumeroJoueur = document.getElementById("Numero")as HTMLInputElement;
    const numerojoueur = letNumeroJoueur.value;
    const letEmailJoueur = document.getElementById("Email")as HTMLInputElement;
    const emailJoueur = letEmailJoueur.value;
    const letEquipeSelect = document.getElementsByName("equipe")[0] as HTMLSelectElement;
    const optEquipe = letEquipeSelect.options[letEquipeSelect.selectedIndex];
    // Preparation du json que l'on va envoyer au server
    const btnSubmit = document.getElementById("btnSubmit") as HTMLButtonElement;
    if ( btnSubmit.value === "Modifier")
    {
         const inputID = document.getElementById("ID") as HTMLInputElement;
         const IdJoueur = inputID.value;
         const text = {
            ID : IdJoueur,
            Lname: nomjoueur,
            // tslint:disable-next-line:object-literal-sort-keys
            Fname: prenomjoueur,
            Number: numerojoueur,
            Email: emailJoueur,
            EquipeID: optEquipe,
        };
         manageActions.putJoueur(text, IdJoueur);
    }
    else
    {
         const text = {
            Lname: nomjoueur,
            // tslint:disable-next-line:object-literal-sort-keys
            Fname: prenomjoueur,
            Number: numerojoueur,
            Email: emailJoueur,
            EquipeID: optEquipe,
        };
         manageActions.postJoueur(text);
    }

}
public render() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 col-sm-6 col-xs-12">
                    <h3>Les joueurs :</h3>
                        <div id="TableSelect">
                        <table className="table table-bordered table-hover" id="action_table">
                            <thead>
                                    <tr >
                                        <th className="text-center">
                                        Nom
                                    </th>
                                    <th className="text-center">
                                        Prenom
                                    </th>
                                    <th className="text-center">
                                        Numero
                                    </th>
                                    <th className="text-center">
                                        Email
                                    </th> 
                                     <th className="text-center">
                                        Action
                                    </th>                                                                               
                                    </tr>
                            </thead>
                            <tbody id="tbody"  />
                        </table>
            </div>		
            <form onSubmit={this.sendFormData.bind(this)} id="nouvJoueur">  
                <h3>Creer un nouveau joueur</h3>     
                <label className="control-label" htmlFor="Nom">Nom</label>
                <input  type="text" id="Nom" name="Nom"/> 
                <label className="control-label" htmlFor="Prenom">Prenom</label>
                <input type="text"id="Prenom" name="Prenom"/>
                <label className="control-label" htmlFor="Numero" >Numero</label>
                {/*tslint:disable-next-line:jsx-boolean-value */}
                <input type="text"id="Numero" name="Numero" required/> 
                <label className="control-label" htmlFor="Email">Email</label>
                <input type="text"id="Email" name="Email"/> 			
                <label className="control-label" htmlFor="equipe">Équipe</label>                  
                <select id="equipe" name="equipe"/><br />   
                <input type="hidden" id="ID"/> 
                <input type="submit" value="Ajouter" id="btnSubmit"  />                
            </form>
            </div>
        </div> 
        </div>

        );
    }
}
