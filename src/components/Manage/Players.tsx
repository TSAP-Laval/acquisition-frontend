import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button, Alert, Modal } from "react-bootstrap";
import * as manageActions from "../../actions/ManageActions";
import store from "../../stores/PlayersStore";


// tslint:disable-next-line:no-empty-interface
export interface ILayoutProps {}
// tslint:disable-next-line:no-empty-interface
export interface ILayoutState {}

var numJoueur ="";
var TableauJoueurs: any=[];
var TableauJoueursId: any=[];



export default class Players extends React.Component<ILayoutProps, ILayoutState> {
private componentWillMount(){
    manageActions.getSportJoueur();
    manageActions.getJoueur();
    manageActions.getNiveauJoueur();
    manageActions.getEquipesJoueur();
    store.on("change",() =>{
        this.LstJoueurs();
        this.RemplirSelect();
    })  
}
private LstJoueurs(){
    this.ClearDomElement("tbody");
    var AllJoueurs= store.GetAllJoueurs();
    var datastringify =JSON.stringify(AllJoueurs);
    var tabJson = JSON.parse(datastringify);		
        // Rentre le id et le nom de l'action dans le tableau correspondant
        for(var i = 0; i < tabJson.length; i++) {	
            var data =tabJson[i];        	 
            var doc = document.getElementById("tbody");
            var x = document.createElement("tr");
            var tdNom = document.createElement("td");
            tdNom.innerHTML=data.Lname;
            var tdPrenom = document.createElement("td");
            tdPrenom.innerHTML=data.Fname;
            var tdNumero = document.createElement("td");
            tdNumero.innerHTML=data.Number;
            var tdEmail = document.createElement("td");
            tdEmail.innerHTML=data.Email;
            var btnModifier = document.createElement("button") as HTMLButtonElement;
            btnModifier.innerHTML="modifier";
            btnModifier.onclick=this.ModifJoueur.bind(this,i,data.ID);
            x.appendChild(tdNom);
            x.appendChild(tdPrenom);
            x.appendChild(tdNumero);
            x.appendChild(tdEmail);
            x.appendChild(btnModifier);
            doc.appendChild(x);
        }
}
private ModifJoueur(i: any, id: any){
    /*var doc = document.getElementById("action_table") as HTMLTableElement;
    var t = doc.rows[i+1];
    var nomjoueur= t.cells[0].innerHTML;
    var inputNom = document.getElementById("Nom") as HTMLInputElement;
    inputNom.value=nomjoueur;
    var prenomjoueur= t.cells[1].innerHTML;
    var inputPrenom = document.getElementById("Prenom") as HTMLInputElement;
    inputPrenom.value=prenomjoueur;
    var numeroJoueur= t.cells[2].innerHTML;
    var inputNumero = document.getElementById("Numero") as HTMLInputElement;
    inputNumero.value=numeroJoueur;
    var emailJoueur= t.cells[3].innerHTML;
    var inputEmail = document.getElementById("Email") as HTMLInputElement;
    inputEmail.value=emailJoueur;
    var btnSubmit = document.getElementById("btnSubmit") as HTMLButtonElement;
    btnSubmit.value="Modifier";
    var inputID = document.getElementById("ID") as HTMLInputElement;
    inputID.value=id;*/
    
}
private ClearDomElement(nom:string){
    var doc = document.getElementById(nom);
    while (doc.hasChildNodes()) {
    doc.removeChild(doc.lastChild);
    }
}
private RemplirSelect(){
    this.ClearDomElement("equipe");
    var allSport= store.GetAllequipeJoueur();
    var datastringify =JSON.stringify(allSport);
    var tabJson = JSON.parse(datastringify);		
        // Rentre le id et le nom de l'action dans le tableau correspondant
        // tslint:disable-next-line:prefer-for-of
        for(var i = 0; i < tabJson.length; i++) {
        var data =tabJson[i];
        var leNiv= store.getNiveauNom(data.CategoryID)
        var doc = document.getElementById("equipe");
        var x = document.createElement("OPTION") as HTMLInputElement;
        x.innerHTML=data.Name + "  "+ leNiv;
        x.value=data.ID;
        doc.appendChild(x);
        }
}
private sendFormData(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault()
    // Va rechercher le formulaire
    var form = e.target as HTMLFormElement
    // Va chercher le type de l'active
    let letNomJoueur = document.getElementById("Nom")as HTMLInputElement
    var nomjoueur= letNomJoueur.value
    let letPrenomJoueur = document.getElementById("Prenom")as HTMLInputElement
    var prenomjoueur= letPrenomJoueur.value
    let letNumeroJoueur = document.getElementById("Numero")as HTMLInputElement
    var numerojoueur= letNumeroJoueur.value
    let letEmailJoueur = document.getElementById("Email")as HTMLInputElement
    var emailJoueur= letEmailJoueur.value
    let letEquipeSelect = document.getElementsByName("equipe")[0] as HTMLSelectElement
    var optEquipe = letEquipeSelect.options[_EquipeSelect.selectedIndex];
    // Preparation du json que l'on va envoyer au server
    var btnSubmit = document.getElementById("btnSubmit") as HTMLButtonElement;
    if( btnSubmit.value==="Modifier")
    {
         var inputID = document.getElementById("ID") as HTMLInputElement;
        var IdJoueur= inputID.value;
        var text = '{'
        +'"ID" :'+ '"'+ IdJoueur+'",'
        +'"Lname" :'+ '"'+ nomjoueur+'",'
        +'"Fname" :'+ '"'+prenomjoueur + '",'
        +'"Number" : '+numerojoueur + ','
        +'"Email" : '+ '"'+emailJoueur + '",'
        +'"PassHash" : "test22" ,'
        +'"TokenInvitation" : "test" ,'
        +'"TokenReinitialisation" : "test ",'
        +'"TokenConnexion" : "test",'
        +'"EquipeID" : '+ '"'+ optEquipe + '"'
        +'}'
         manageActions.putJoueur(text,IdJoueur);
    }
    else
    {
        // tslint:disable-next-line:no-shadowed-variable
        var text = '{'
        +'"Lname" :'+ '"'+ nomjoueur+'",'
        +'"Fname" :'+ '"'+prenomjoueur + '",'
        +'"Number" : '+numerojoueur + ','
        +'"Email" : '+ '"'+emailJoueur + '",'
        +'"PassHash" : "test22" ,'
        +'"TokenInvitation" : "test" ,'
        +'"TokenReinitialisation" : "test ",'
        +'"TokenConnexion" : "test",'
        +'"EquipeID" : '+ '"'+ optEquipe + '"'
        +'}'
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
                {/*tslint:disable-next-line:jsx-boolean-value*/}
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

