import dispatcher from "../dispatcher/dispatcher";

export function login(usr: string, pass: string) {
    dispatcher.dispatch({
        password: pass,
        type: "AUTH.LOGIN",
        username: usr,
    });
}

export function logout() {
    dispatcher.dispatch({
        type: "AUTH.LOGOUT",
    });
}
