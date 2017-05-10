import * as React from "react";

// tslint:disable:no-empty-interface
export interface ILayoutProps { }
export interface ILayoutState {}
// tslint:enable:no-empty-interface

class Auth extends React.Component<ILayoutProps, ILayoutState> {
    constructor() {
        super();
    }

    private pretendRequest(email: string, pass: string, cb: any) {
        setTimeout(() => {
            if (email === "joe@example.com" && pass === "password1") {
                cb({
                    authenticated: true,
                    token: Math.random().toString(36).substring(7),
                });
            } else {
                cb({ authenticated: false });
            }
        }, 0);
    }

    public login(email: string, pass: string, cb: any) {
        cb = arguments[arguments.length - 1];
        if (localStorage.token) {
            if (cb) {
                cb(true);
                this.onChange(true);
            }
            return;
        }

        this.pretendRequest(email, pass, (res: any) => {
            if (res.authenticated) {
                localStorage.token = res.token;
                if (cb) {
                    cb(true);
                    this.onChange(true);
                }
            } else {
                if (cb) {
                    cb(false);
                    this.onChange(false);
                }
            }
        });
    }

    public getToken() {
        return localStorage.token;
    }

    public logout(cb: any) {
        delete localStorage.token;
        if (cb) {
            cb();
            this.onChange(false);
        }
    }

    public loggedIn() {
        return !!localStorage.token;
    }

    // tslint:disable-next-line:no-empty
    public onChange(change: boolean) { }
}

module.exports = Auth;
