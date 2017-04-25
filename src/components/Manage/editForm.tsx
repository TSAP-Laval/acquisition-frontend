import * as React   from "react";
import * as Select  from "react-select";
require('../../sass/react-select.scss');
import { ICoaches } from "../../interfaces/interfaces"
//Coach Store
import CoachStore from "../../stores/CoachStore";
import * as RequestHandler from "./RequestHandler";
import {Button, Alert, Modal} from "react-bootstrap";


export interface ILayoutProps {}
export interface ILayoutState {
    coachEdit?: ICoaches;

}


export default class EditForm extends React.Component<ILayoutProps, ILayoutState>{

    constructor(){
        super();

        this.OnFnameInput = this.OnFnameInput.bind(this);
        this.OnLnameInput = this.OnLnameInput.bind(this);
        this.OnMailInput = this.OnMailInput.bind(this);        

        this.state = {
            coachEdit: {
                ID: 0,
                Fname: "",
                Lname: "",
                Email: "",
                Teams: null,
                TeamsIDs: [],
                Actif: true,
                PassHash:     "",
                TokenRequest: "",
                TokenReset:   "",
                TokenLogin:   "",
                Season: null
            }
        }
    }

    shouldComponentUpdate(nextState: ILayoutState) {
        this.setState(nextState);
        return true;
    }
   
    OnLnameInput(e: any){
        this.state.coachEdit.Lname = (e.target as HTMLInputElement).value.trim();
        //this.shouldComponentUpdate(this.state);
    }

     OnFnameInput(e: any){
        this.state.coachEdit.Fname = (e.target as HTMLInputElement).value.trim();
        //this.shouldComponentUpdate(this.state);
    }

     OnMailInput(e: any){
        this.state.coachEdit.Email = (e.target as HTMLInputElement).value.trim();
        //this.shouldComponentUpdate(this.state);
    }

     SportChanged(event: any){

        this.shouldComponentUpdate(this.state);
        console.log(String(event.target.value));
        this.ListTeams(String(event.target.value));
    }


    ListTeams(sportId: string){
       
        var listTeams = CoachStore.GetAllTeams();
        var dataTeam = JSON.stringify(listTeams);
        var jsonT = JSON.parse(dataTeam);
        var teamGr : any[] = [];
        if(sportId != "-1"){
            for(var i=0; i < jsonT.length; i++ )
            {
                var dataT = jsonT[i];
                if(dataT["SportID"] == sportId){
                var option = document.createElement("option");
                option.text = dataT['Name'];
                option.value = dataT['ID'];
                teamGr.push({label : dataT['Name'], value: dataT['ID'] });
                }
            }
        }
        //this.setState({coachEdit.teams : teamGr});
        
    }


    OnSave(){

    }

    render(){
        return(
            
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">

                        <div className="modal" id="editModal" tabIndex={-1}>
                            <div className="modal-dialog">
                                <div className="modal-content">

                                    <div className="modal-header">
                                        <button className="close" data-dismiss="modal">&times;</button>
                                        <h4>Modifier les équipes</h4>
                                    </div>
                                    
                                    <div className="modal-body">
                                <form method="post" title="Entraineur :" id="coachForm">
                                    <div className="form-group ">
                                        <label className="control-label" htmlFor="coach_name">
                                        Nom de l'entraineur :
                                        <span className="asteriskField">
                                            *
                                        </span>
                                        </label>
                                        <input onInput={e => this.OnLnameInput(e) } className="form-control requiredField" id="coach_name" name="Nom" type="text" required/>
                                    </div>

                                    <div className="form-group ">
                                        <label className="control-label" htmlFor="coach_prenom">
                                        Prenom de l'entraineur :
                                        <span className="asteriskField">
                                            *
                                        </span>
                                        </label>
                                        <input onInput={e => this.OnFnameInput(e) } className="form-control requiredField" id="coach_prenom" name="Prenom" type="text" required/>
                                    </div>

                                    <div className="form-group ">
                                        <label className="control-label" htmlFor="coach_mail">
                                        Email de l'entraineur :
                                        <span className="asteriskField">
                                            *
                                        </span>
                                        </label>
                                        <input onInput={e => this.OnMailInput(e) } className="form-control requiredField" id="coach_mail" name="Email" type="email" required/>
                                    </div>

                                    <div className="form-group">
                                                                        
                                            <label className="control-label" htmlFor="season_select">
                                                Saison :
                                                <span className="asteriskField">
                                                    *
                                                </span>
                                            </label>
                                                <select className="select form-control" name="season_select" id="season_select">
                                                </select>
                                        </div>

                                    <div className="form-group">
                                                                        
                                            <label className="control-label" htmlFor="sport_select">
                                                Sport :
                                                <span className="asteriskField">
                                                    *
                                                </span>
                                            </label>
                                                <select onChange={this.SportChanged} className="select form-control" name="sport_select" id="sport_select">
                                                </select>
                                        </div>

                                        <div className="form-group">
                                                                        
                                            <label className="control-label" htmlFor="teams_multi">
                                                Équipes Disponibles :
                                                <span className="asteriskField">
                                                    *
                                                </span>
                                            </label>
                                                {/*<Select multi joinValues options={this.state.teams}
                                                onChange={ this.SelectedTeams} value={this.state.selectedValues}
                                                placeholder="Sélectionner les équipes"
                                              />*/}
                                        </div>

                                </form>

                                <Button bsStyle="primary" onClick={this.OnSave}>
                                            Soumettre
                                </Button>
                                <Button bsStyle="primary" >
                                            test
                                </Button>
                                        
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}