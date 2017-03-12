import * as React                from "react";
import * as ReactDOM             from "react-dom";
import { Button, ButtonToolbar } from "react-bootstrap";
import * as manageActions        from "../../actions/ManageActions";
import store                     from "../../stores/PlayersStore";



export interface ILayoutProps {}
export interface ILayoutState {}

var numJoueur ="";
var TableauJoueurs:any=[];
var TableauJoueursId:any=[];



export default class Players extends React.Component<ILayoutProps, ILayoutState> {
componentWillMount(){
    manageActions.getSportJoueur();
    manageActions.getJoueur();
    manageActions.getNiveauJoueur();
    manageActions.getEquipesJoueur();
    store.on("change",() =>{
        this.LstJoueurs();
        this.RemplirSelect();
    })  
}
LstJoueurs(){
    this.ClearDomElement("tbody");
    var AllJoueurs= store.GetAllJoueurs();
    var datastringify =JSON.stringify(AllJoueurs);
    var tabJson = JSON.parse(datastringify);		
        //Rentre le id et le nom de l'action dans le tableau correspondant
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
            //btnModifier.onclick=this.RightClick.bind(this);
            btnModifier.value=data.ID;
            x.appendChild(tdNom);
            x.appendChild(tdPrenom);
            x.appendChild(tdNumero);
            x.appendChild(tdEmail);
            x.appendChild(btnModifier);
            doc.appendChild(x);
        }
}
ClearDomElement(nom:string){
    var doc = document.getElementById(nom);
    while (doc.hasChildNodes()) {
    doc.removeChild(doc.lastChild);
    }
}
RemplirSelect(){
    this.ClearDomElement("equipe");
    var allSport= store.GetAllequipeJoueur();
    var datastringify =JSON.stringify(allSport);
    var tabJson = JSON.parse(datastringify);		
        //Rentre le id et le nom de l'action dans le tableau correspondant
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
sendFormData(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault()
    //Va rechercher le formulaire
    var form = e.target as HTMLFormElement
    //Va chercher le type de l'active
    let _NomJoueur = document.getElementById("Nom")as HTMLInputElement
    var nomjoueur= _NomJoueur.value
    let _PrenomJoueur = document.getElementById("Prenom")as HTMLInputElement
    var prenomjoueur= _PrenomJoueur.value
    let _NumeroJoueur = document.getElementById("Numero")as HTMLInputElement
    var numerojoueur= _NumeroJoueur.value
    let _EmailJoueur = document.getElementById("Email")as HTMLInputElement
    var emailJoueur= _EmailJoueur.value
    let _EquipeSelect = document.getElementsByName("equipe")[0] as HTMLSelectElement
    var optEquipe = _EquipeSelect.options[_EquipeSelect.selectedIndex];

      //Preparation du json que l'on va envoyer au server
      
    var text = '{'
        +'"Lname" :'+ '"'+ nomjoueur+'",'
        +'"Fname" :'+ '"'+prenomjoueur + '",'
        +'"Number" : '+numerojoueur + ','
        +'"Email" : '+ '"'+emailJoueur + '",'
        +'"PassHash" : "test22" ,'
        +'"TokenInvitation" : "test" ,'
        +'"TokenReinitialisation" : "test ",'
        +'"TokenConnexion" : "test",'
        +'"EquipeID" : '+ '"'+ optEquipe.value + '"'
        +'}'

        manageActions.postJoueur(text);

}
render() {
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
                            <tbody id="tbody">
                            </tbody>
                        </table>
            </div>		
            <form onSubmit={this.sendFormData.bind(this)} id="nouvJoueur">  
                <h3>Creer un nouveau joueur</h3>     
                <label htmlFor="Nom">Nom</label>
                <input type="text" id="Nom" name="Nom"/> 
                <label htmlFor="Prenom">Prenom</label>
                <input type="text"id="Prenom" name="Prenom"/>
                <label htmlFor="Numero">Numero</label>
                <input type="text"id="Numero" name="Numero"/> 
                <label htmlFor="Email">Email</label>
                <input type="text"id="Email" name="Email"/> 			
                <label htmlFor="equipe">Équipe</label>                  
                <select id="equipe" name="equipe"></select><br></br>    
                <input type="submit" value="Submit"  />                
            </form>
            </div>
        </div> 
        </div>
            
        );
    }
}

