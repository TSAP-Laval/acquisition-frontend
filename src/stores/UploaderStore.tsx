// tslint:disable:import-spacing
import { EventEmitter }     from "events";
import * as axios           from "axios";
import { IAction }          from "../interfaces/interfaces";
import dispatcher           from "../dispatcher/dispatcher";
import { serverURL }        from "config";
import { IMessages }        from "../interfaces/interfaces";
// tslint:enable:import-spacing

class UploadStore extends EventEmitter {

    private progress: string[] = [];
    private teams: any[] = [];
    private fields: any[] = [];
    private message: IMessages;
    private source: axios.CancelTokenSource;
    private uploading: boolean = false;
    // tslint:disable-next-line:ban-types
    private response: Object = null;
    private gameID: number;

    constructor() {
        super();
        // Cancellation token
        this.source = axios.default.CancelToken.source();
    }

    private  addProgress(text: string) {
        this.progress.pop();
        this.progress.push(text);
    }

    private addTeams(teams: any[]) {
        this.teams = teams;
    }

    private addFields(fields: any[]) {
        this.fields = fields;
    }

    public getMessage() {
        return this.message;
    }

    public getProgress() {
        return this.progress;
    }

    public getTeams() {
        return this.teams;
    }

    public getGameID() {
        return this.gameID;
    }

    public getFields() {
        return this.fields;
    }

    private onProgress(progressEvent: any) {
        const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );

        this.addProgress(percentCompleted.toString());

        if (percentCompleted === 100) {
            this.addMessage(false, "UPLOAD_SUCCESS");

            this.emit("upload_ended");
        }
        else {
            // Only if it is still uploading. If the Operation
            // is canceled, it wont update...
            if (this.uploading) {
                this.emit("uploading");
            }
        }
    }

    // tslint:disable:no-string-literal
    private sendVideo(files: File[]) {
        this.uploading = true;

        const boundary = Math.random().toString().substr(2);

        const config = {
            cancelToken: this.source.token,
            headers: {"Content-Type": "multipart/form-data; filename=" +
            files[0].name + "; boundary=------------------------" + boundary},
            onUploadProgress: this.onProgress.bind(this),
        };

        const form = new FormData();
        files.forEach((file) => {
            form.append("file", file, file.name);
        });

        axios.default.post(serverURL + "/upload", form, config).then(function(r: axios.AxiosResponse) {
            // console.log("RESULT (XHR): \n %o\nSTATUS: %s", r.data, r.status);
            if (r.data["exist"] === "true") {
                this.addMessage(true, "EXIST");
                this.emit("close_form");
                this.emit("upload_ended");
            } else {
                this.gameID = r.data["game_id"];
            }
        }.bind(this)).catch(function(error: axios.AxiosError) {
            // console.log("ERROR (XHR): %o", error.response.data);

            // Only if it's not the cancel actions that cause the error
            // toString() to make sure it's really converted to a string.
            // Cause an error if removed...
            if (error.toString().toLowerCase().indexOf("cancel") === -1) {
                this.addMessage(true, error.response.data["error"]);
                this.emit("close_form");
                this.emit("upload_ended");
            }
        }.bind(this));
    }

    private searchTeam(text: string) {
        const config = {
            headers: {"Content-Type": "application/json;"},
        };
        const url = text === "" ? serverURL + "/equipes" : serverURL + "/equipes/" + text;

        axios.default.get(url, config).then(function(r: axios.AxiosResponse) {
            // console.log("RESULT (XHR): \n %o\nSTATUS: %s", r.data, r.status);
            this.addTeams(r.data);
        }.bind(this)).catch(function(error: axios.AxiosError) {
            // console.log("ERROR (XHR): \n" + error);

            this.addMessage(true, error.response.data["error"]);
            this.emit("close_form");
            this.emit("upload_ended");
        }.bind(this));
    }
    private searchFields(text: string) {
        const config = {
            headers: {"Content-Type": "application/json;"},
        };
        const url = text === "" ? serverURL + "/terrains" : serverURL + "/terrains/" + text;

        axios.default.get(url, config).then(function(r: axios.AxiosResponse) {
            // console.log("RESULT (XHR): \n %o\nSTATUS: %s", r.data, r.status);
            this.addFields(r.data);
        }.bind(this)).catch(function(error: axios.AxiosError) {
            // console.log("ERROR (XHR): \n" + error);

            this.addMessage(true, error.response.data["error"]);
            this.emit("close_form");
            this.emit("upload_ended");
        }.bind(this));
    }

    private save(teamID: number, opposingTeam: string, status: string,
                 locationID: number, fieldCondition: string, date: string) {
        const gameInfos = {
            Date: date,
            FieldCondition: fieldCondition,
            LocationID: locationID,
            OpposingTeam: opposingTeam,
            SeasonID: 1,
            Status: status,
            TeamID: teamID,
        };

        const config = {
            headers: {"Content-Type": "application/json;"},
        };
        const url = serverURL + "/parties/" + this.gameID;

        axios.default.put(url, gameInfos, config).then(function(r: axios.AxiosResponse) {
            // console.log("RESULT (XHR): \n %o\nSTATUS: %s", r.data, r.status);
            this.saved = true;
        }.bind(this)).catch(function(error: axios.AxiosError) {
            // console.log("ERROR (XHR): \n" + error);

            this.addMessage(true, error.response.data["error"]);
            this.emit("close_form");
            this.emit("upload_ended");
        }.bind(this));

    }

    private addMessage(isError: boolean = false, message: string = null) {
        this.message = {isError, message};
        this.emit("message");
    }

    private cancelUpload() {
        // We re-initialize the progress counter to 0 to
        // avoid problem in further executions
        this.addProgress("0");
        this.source.cancel("Operation has been canceled.");
        this.source = axios.default.CancelToken.source();
    }

    private sendCancel() {
        const url = serverURL + "/upload/" + this.gameID;

        axios.default.delete(url).then(function(r: axios.AxiosResponse) {
            // console.log("RESULT (XHR): \n %o\nSTATUS: %s", r.data, r.status);
            this.saved = true;
        }.bind(this)).catch(function(error: axios.AxiosError) {
            // console.log("ERROR (XHR): \n" + error);

            this.addMessage(true, error.response.data["error"]);
            this.emit("close_form");
            this.emit("upload_ended");
        }.bind(this));
    }
    // tslint:enable:no-string-literal

    public handleActions(action: any){
        switch (action.type) {
            case "UPLOAD.SHOW_MESSAGE":
                this.addMessage(action.isError, action.text);

                break;
            case "UPLOAD.UPLOAD":
                this.addMessage();
                this.emit("uploading");
                this.sendVideo(action.files);
                this.emit("open_form");
                break;
            case "UPLOAD.OPEN_CONFIRM_FORM":
                    this.emit("open_confirm_form");
                break;
            case "UPLOAD.CLOSE_CONFIRM_FORM":
                this.emit("close_confirm_form");
                this.addMessage(false, "");
                break;
            case "UPLOAD.CANCEL_UPLOAD":
                    this.uploading = false;
                    if (this.progress[0] !== "100") {
                        this.cancelUpload();
                        this.emit("upload_ended");
                        this.addMessage(false, "CANCEL_UPLOAD");
                    } else {
                        this.addMessage(false, "CANCEL");
                    }
                    this.sendCancel();
                    this.emit("close_form");
                break;
            case "UPLOAD.SAVE":
                this.save(action.teamID, action.opposingTeam, action.status,
                          action.locationID, action.fieldCondition, action.date);
                this.addMessage(false, "SAVE");
                this.emit("close_form");
                break;
            case "UPLOAD.SEARCH_TEAM":
                this.searchTeam(action.text);
                this.emit("team_searched");
                break;
            case "UPLOAD.SEARCH_FIELD":
                this.searchFields(action.text);
                this.emit("field_searched");
                break;
            default:
                break;

        }
    }
}
const store = new UploadStore();
export default store;
dispatcher.register(store.handleActions.bind(store));
