import * as React from "react";
import * as ReactDOM from 'react-dom';
import * as $ from "jquery";
import store from "./EditStore";
import * as editActions from "./EditAction";
import Header from "./Header"
import Footer from "./Footer"



require('../sass/Layout.scss');


export interface ILayoutProps {}
export interface ILayoutState {}
  //Variable global pour avoir le numero du joueur
var numJoueur =0;

export default class EditTest extends React.Component<ILayoutProps, ILayoutState> {
  	componentWillMount(){
		editActions.getJoueur();
    editActions.getActionsEdit();
	 	store.on("change",() =>{
			 this.CreerButtons();
       this.RemplirSelect();
		
     })

     

}
CreerButtons(){
  this.ClearDomElement("lstJoueur")
    var alljoueurs= store.GetAllJoueurs();
	
	    var datastringify =JSON.stringify(alljoueurs);
		var tabJson = JSON.parse(datastringify);
		
		//Rentre le id et le nom de l'action dans le tableau correspondant
        for(var i = 0; i < tabJson.length; i++) {
	
		
		 var data =tabJson[i];
		 var doc = document.getElementById("lstJoueur")
     var unli = document.createElement("LI");
			 var x = document.createElement("button") as HTMLButtonElement;
			 x.innerHTML=data.Number;
       x.onclick=this.RightClick.bind(this);
			 x.value=data.ID;
       console.log(unli)
       console.log(x)
       unli.appendChild(x)
			 doc.appendChild(unli);
		}

  

}
RemplirSelect(){
  this.ClearDomElement("NomActivite")
  	var allActions= store.GetAllActions();
	
	    var datastringify =JSON.stringify(allActions);
		var tabJson = JSON.parse(datastringify);
		
		//Rentre le id et le nom de l'action dans le tableau correspondant
        for(var i = 0; i < tabJson.length; i++) {
	
		
		 var data =tabJson[i];
		 var doc = document.getElementById("NomActivite");
			 var x = document.createElement("OPTION") as HTMLInputElement;
			 x.innerHTML=data.Name;
			 x.value=data.ID;
			 doc.appendChild(x);
		}


}
ClearDomElement(nom:string){
        console.log(nom);
        var doc = document.getElementById(nom);
        while (doc.hasChildNodes()) {
        doc.removeChild(doc.lastChild);
        }
 }
  RightClick(e: React.MouseEvent<HTMLInputElement>){
    e.preventDefault()
    let _button = e.target as HTMLInputElement;
    console.log(_button)
    numJoueur = parseInt(_button.value)
    console.log(numJoueur);
    /*
    if(e.target.name == "def")
    {
    e.target.name ='off';
    }
    else if(e.target.name == "off")
    {
    e.target.name ='cent'
    }
    else
    {
    e.target.name ='def'
    }
    */

    //Va set la position du div
    var x = document.getElementById('Enr');
    $(x).css({
      "left": e.pageX + "px",
      "top": (e.pageY - $(".video-container").height() - $(x).height()) + "px"
    })
    $(x).toggleClass("form-open")
  }
//Fermer le div
  closeFormModal(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault()
    var x = document.getElementById('Enr');
    $(x).toggleClass("form-open")
  }
//Envoie du formulaire à l'api 
sendFormData(e: React.MouseEvent<HTMLInputElement>) {
  e.preventDefault()
  //Va rechercher le formulaire
  var form = e.target as HTMLFormElement
  //Va chercher le type de l'active
  let _typeSelect = document.getElementsByName("NomActivite")[0] as HTMLInputElement
  //Va chercher le resutltat de l'action
  let _resultat = document.getElementsByName("resultat")[0] as HTMLInputElement
  let _video = document.getElementById("my-player") as HTMLVideoElement;
  let tempsAction = _video.currentTime;


  var TypeAction=0;

  TypeAction = parseInt(_typeSelect.value)
  var resultatAction = _resultat.value

  if(TypeAction !=0&&resultatAction !="")
  {
      //Preparation du json que l'on va envoyer au server
        var text = '{'
       +'"ActionTypeID" :'+TypeAction+','
       +'"IsPositive" : '+resultatAction + ','
       +'"ZoneID" : 1 ,'
       +'"GameID" : 1 ,'
       +'"X1" : 1 ,'
       +'"Y1" : 1 ,'
       +'"X2" : 1 ,'
       +'"Y2" : 0 ,'
       +'"Time" : 30 ,'
       +'"HomeScore" : 30 ,'
       +'"GuestScore" : 30 ,'
       +'"PlayerID" :'+numJoueur
       +'}'
       editActions.PostAction(text);
  
  //Fermer le fenetre
  this.closeFormModal.bind(this)   
}
}
 
  
    render() {

   
   
    
        
   
 

        return (
          //Retourne html 
            <div>
            
                 <form onSubmit={this.sendFormData.bind(this)}>  
                 <div id="Enr">
                   <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.closeFormModal.bind(this)}><span aria-hidden="true">&times;</span></button>
                    <h3>enregistrer une action</h3><br></br>   
                          
                    <label htmlFor="Type">Type de l'action</label>
                    <input type="radio" name="Type" value="Defensive" /> Défensive
                    <input type="radio" name="Type" value="Offensive"/> Offensive
                    <input type="radio" name="Type" value="Central"/> Central<br></br>
                    <label htmlFor="Nom">Nom de l'action</label>                  
                    <select id="NomActivite" name="NomActivite"></select><br></br>
                    <label htmlFor="resultat">Résultat de l'action</label>
                    <input type="radio" name="resultat" value="true" /> Reussi
                    <input type="radio" name="resultat" value="false"/> Manqué<br></br>
                    <input type="submit" value="Submit"  />    
                   </div>  
                 </form> 
                         
                <div id="LesJoueurs">
                  <ul id="lstJoueur"></ul>
                </div>
                
               
            </div>
        );
    }
}
