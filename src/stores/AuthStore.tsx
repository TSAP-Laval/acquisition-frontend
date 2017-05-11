// tslint:disable:import-spacing
import { EventEmitter }     from "events";
import * as axios           from "axios";
import { IAuth }            from "../interfaces/interfaces";
import dispatcher           from "../dispatcher/dispatcher";
import { serverURL }        from "config";
import { IMessages }        from "../interfaces/interfaces";
// tslint:enable:import-spacing

class AuthStore extends EventEmitter {

    private message: IMessages;
    private token: string;
    private config = {
        headers: { "Content-Type": "application/json;" },
    };

    constructor() {
        super();
    }

    private addToken(newToken: string) {
        this.token = newToken;
    }

    private addMessage(isError: boolean = false, message: string = null) {
        this.message = { isError, message };
        this.emit("message");
    }

    private removeToken(newToken: string) {
        this.token = null;
    }

    public getToken() {
        return this.token;
    }

    public getMessage() {
        return this.message;
    }

    private login(username: string, password: string) {
        const userInfos = {
            Email: username,
            Password: password,
        };

        const url = serverURL + "/auth";

        axios.default.post(url, userInfos, this.config).then(function(r: axios.AxiosResponse) {
            console.log("RESULT (XHR): \n %o\nSTATUS: %s", r.data, r.status);
            this.addToken(r.data.token);
            localStorage.token = r.data.token;
            this.emit("logged_in");
        }.bind(this)).catch(function(error: axios.AxiosError) {
            // console.log("ERROR (XHR): %o", error.response);
            error = typeof error.response === "undefined" ? "UNKNOWN" : error.response.data.error;
            this.addMessage(true, error);
        }.bind(this));
    }

    private logout() {
        const url = serverURL + "/logout";

        axios.default.post(url, this.config).then(function(r: axios.AxiosResponse) {
            // console.log("RESULT (XHR): \n %o\nSTATUS: %s", r.data, r.status);
            this.removeToken();
            this.emit("logged_out");
        }.bind(this)).catch(function(error: axios.AxiosError) {
            // console.log("ERROR (XHR): \n" + error);
            error = typeof error.response === "undefined" ? "UNKNOWN" : error.response.data.error;
            this.addMessage(true, error);
        }.bind(this));
    }

    public handleActions(action: IAuth) {
        switch (action.type) {
            case "AUTH.LOGIN":
                this.login(action.username, action.password);
                break;
            case "AUTH.LOGOUT":
                this.logout();
                break;
        }
    }
}

const store = new AuthStore();
export default store;
dispatcher.register(store.handleActions.bind(store));
