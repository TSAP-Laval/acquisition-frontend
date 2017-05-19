// tslint:disable:import-spacing
import * as React       from "react";

import * as Actions     from "../../actions/UploadActions";
import Store            from "../../stores/UploaderStore";
import { IMessages }    from "../../interfaces/interfaces";
// tslint:enable:import-spacing

export interface ILayoutProps {
        message: IMessages;
}
// tslint:disable-next-line:no-empty-interface
export interface ILayoutState {}

export default class Message extends React.Component<ILayoutProps, ILayoutState> {

    constructor(props: any) {
        super(props);
        this.state = { message: this.props.message };
    }
    public render() {
        let msg = null;
        let style = "invisible";

        switch (this.props.message.message) {
            case "FORMAT":
                msg = "Le fichier choisi n'est pas dans un format vidéo reconnu";
                break;
            case "TOO_MANY":
                msg = "Veuillez ne sélectionner qu'un maximum de 10 fichiers";
                break;
            case "NO_FILE":
                msg = "Veuillez sélectionner un fichier à ajouter";
                break;
            case "EXIST":
                msg = "Un fichier de même nom existe déjà dans notre base de donnée.\n" +
                    "Veuillez choisir un fichier de nom différent";
                break;
            case "UPLOAD_SUCCESS":
                msg = "Le fichier a bel et bien été envoyé sur le serveur";
                break;
            case "CANCEL_UPLOAD":
                msg = "Importation annulée avec succès!";
                break;
            case "CANCEL":
                msg = "Analyse annulée avec succès!";
                break;
            case "SAVE":
                msg = "Les informations sur la partie en cours ont bel et bien été sauvegardées";
                break;
            case "UNKNOWN":
                msg = "Une erreur inconnue est survenue !" +
                " Veuillez contacter l'administrateur pour plus de soutient";
                break;
            case "":
                msg = "";
            default:
                msg = this.props.message.message;
                break;
        }

        if (this.props.message.message !== "") {
            style = this.props.message.isError ? "error" : "success";
        } else {
            style = "";
        }

        return (
            <div className={style}>
                {msg}
            </div>
        );
    }
}
