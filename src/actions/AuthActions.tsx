import dispatcher from "../dispatcher/dispatcher";

export function login(username: string, password: string, remember: boolean) {
    dispatcher.dispatch({
        password,
        remember,
        type: "AUTH.LOGIN",
        username,
    });
}

export function logout() {
    dispatcher.dispatch({
        type: "AUTH.LOGOUT",
    });
}
