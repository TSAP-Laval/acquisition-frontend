import * as React from "react";
export const Auth = {
    login(token: string, cb: any) {
        cb = arguments[arguments.length - 1];
        if (localStorage.token) {
            if (cb) {
                cb(true);
                this.onChange(true);
                return;
            }
        }
        cb({
            authenticated: true,
            token,
        }),
        localStorage.token = token;
    },

    getToken() {
        return localStorage.token;
    },

    logout(cb: any) {
        delete localStorage.token;
        if (cb) {
            cb();
            this.onChange(false);
        }
    },

    loggedIn() {
        return !!localStorage.token;
    },

    onChange() {},
};

// tslint:disable:no-empty-interface
/*export interface ILayoutProps { }
export interface ILayoutState { }
// tslint:enable:no-empty-interface

export default class Auth {
    constructor(token: string) {
        localStorage.token = token;
    }

    public setToken(token: string) {
        localStorage.token = token;
    }

    public getToken() {
        return localStorage.token;
    }

    public logout() {
        delete localStorage.token;
    }

    public loggedIn() {
        return !!localStorage.token;
    }

    // tslint:disable-next-line:no-empty
    public onChange(change: boolean) { }
}

module.exports = Auth;*/
