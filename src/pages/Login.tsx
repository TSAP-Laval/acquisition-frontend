// tslint:disable:import-spacing
import * as React                from "react";
import * as ReactDOM             from "react-dom";
import { Link, browserHistory }  from "react-router";
import {
    Form,
    FormControl,
    FormGroup,
    ControlLabel,
    Button,
    Panel,
    Col,
    Checkbox,
} from "react-bootstrap";

import "../sass/Layout.scss";

import Store            from "../stores/AuthStore";
import * as Action      from "../actions/AuthActions";
import { IMessages }    from "../interfaces/interfaces";
// tslint:enable:import-spacing

// tslint:disable:no-empty-interface
export interface ILayoutProps { }
export interface ILayoutState {
    errors?: string[];
    message?: IMessages;
    password?: any;
    token?: string;
    username?: any;
    remember?: boolean;
 }
// tslint:enable:no-empty-interface

// TODO : Add error messages

export class Login extends React.Component<ILayoutProps, ILayoutState> {

    public refs: {
        [key: string]: (Element);
        email: (HTMLInputElement);
        password: (HTMLInputElement);
        remember: (HTMLInputElement);
    };

    public constructor() {
        super();

        // Bind listeners
        this._onMessage = this._onMessage.bind(this);

        this.onEmailInput = this.onEmailInput.bind(this);
        this.onPasswordInput = this.onPasswordInput.bind(this);
        this.onRememberChange = this.onRememberChange.bind(this);

        this.state = {
            errors: [],
            password: "",
            token: "",
            username: "",
        };
    }

    public shouldComponentUpdate(nextState: ILayoutState) {
        this.setState(nextState);
        return true;
    }

    private componentWillMount() {
        Store.on("message", this._onMessage);
        Store.on("logged_in", this._onLoggedIn);
    }

    private componentWillUnmount() {
        Store.removeListener("message", this._onMessage);
        Store.removeListener("logged_in", this._onLoggedIn);
    }

    private errorChecker() {
        // We clear the errors
        while (this.state.errors.length > 0) {
            this.state.errors.pop();
        }

        if (this.state.username === "") {
            this.state.errors.push("Veuillez entrer une adresse courriel");
        } else {
            // tslint:disable-next-line:max-line-length
            const regex: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            if (!regex.test(this.state.username)) {
                this.state.errors.push("Veuillez entrer une adresse courriel valide");
            }
        }

        if (this.state.password === "") {
            this.state.errors.push("Veuillez entrer un mot de passe");
        }

        this.shouldComponentUpdate(this.state);
    }

    private onSubmit(e: React.MouseEvent<React.ClassicComponent<ReactBootstrap.ButtonProps, {}>>) {
        e.preventDefault();
        this.errorChecker();

        if (this.state.errors.length === 0) {
            const username = this.state.username;
            const password = this.state.password;
            const remember = this.state.remember;
            // Authentificate the user
            Action.login(username, password, remember);
        }
    }

    private onEmailInput() {
        const email = ReactDOM.findDOMNode(this.refs.email) as HTMLInputElement;
        this.setState({ username: email.value.trim() });
    }

    private onPasswordInput() {
        const password = ReactDOM.findDOMNode(this.refs.password) as HTMLInputElement;
        this.setState({ password: password.value.trim() });
    }

    private onRememberChange(e: React.FormEvent<Checkbox>) {
        const remember = ReactDOM.findDOMNode(this.refs.remember) as HTMLInputElement;
        this.setState({ remember: remember.checked });
    }

    private _onMessage() {
        this.setState({ message: Store.getMessage() });
    }

    private _onLoggedIn() {
        browserHistory.push("home");
        this.setState({ token: Store.getToken() });
    }

    public render() {
        // Dans le cas où la personne est déjà authentifiée,
        // on la redirige vers la page d'accueil
        if (Store.getToken() !== "") {
            browserHistory.push("/home");
        }

        const errors = this.state.errors.map((e, i) => <li key={i}>{e}</li>);
        const titre = (
            <h3>Connexion</h3>
        );

        return (
            <div>
                <h1>TSAP</h1>
                <div className="center-login-div">
                    <Col sm={8} className={"center"}>
                        <Panel header={titre} bsStyle="primary">
                            <Form horizontal={true}>
                                <div>
                                    <ul className="errors">{errors}</ul>
                                </div>
                                <FormGroup controlId="formHorizontalEmail">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Email
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl
                                            type="email"
                                            placeholder="Email"
                                            onInput={this.onEmailInput}
                                            inputRef={(usr: HTMLInputElement) => { this.refs.email = usr; }}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalPassword">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Password
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl
                                            type="password"
                                            placeholder="Mot de passe"
                                            onInput={this.onPasswordInput}
                                            inputRef={(pass: HTMLInputElement) => { this.refs.password = pass; }}
                                        />
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        <Button type="submit" onClick={(e) => this.onSubmit(e)}>
                                            Connexion
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Panel>
                    </Col>
                </div>
            </div>
        );
    }
}
