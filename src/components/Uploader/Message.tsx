import * as React   from "react";
import * as Actions from "../../actions/UploadActions"
import Store        from "../../stores/UploaderStore"
import { IMessages } from "../../interfaces/interfaces"

export interface ILayoutProps {
        message: IMessages
}
export interface ILayoutState {}

export default class Message extends React.Component<ILayoutProps, ILayoutState> {
    
    constructor(props: any) {
        super(props);
        this.state = { message: this.props.message };
    }

    render() {
        var msg = null;
        var style = "";
        
        switch (this.props.message.message) {
            case "FORMAT":
                msg = "Le fichier choisi n'est pas dans un format vidéo reconnu"
                break;
            case "TOO_MANY":
                msg = "Veuillez ne sélectionner qu'un seul fichier"
                break;
            case "NO_FILE":
                msg = "Veuillez sélectionner un fichier à ajouter"
            case "EXIST":
                msg = "Un fichier de même nom existe déjà dans notre base de donnée.\n Veuillez choisir un fichier de nom différent"
                break;
            case "UPLOAD_SUCCESS":
                msg = "Le fichier a bel et bien été envoyé sur le serveur"
                break;
            case "CANCEL":
                msg = "Importation annulée avec succès!"
                break;
            case "SAVE":
                msg = "Les informations sur la partie en cours ont bel et bien été sauvegardées"
                break;
        }

        if (this.props.message.message != null)
            style = this.props.message.isError ? "error" : "success";

        return (
            <div className={style}>
                    {msg}
            </div>
        );
    }
}