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
 }
// tslint:enable:no-empty-interface

export class Login extends React.Component<ILayoutProps, ILayoutState> {

    public refs: {
        [key: string]: (Element);
        email: (HTMLInputElement);
        password: (HTMLInputElement);
    };

    public constructor() {
        super();

        // Bind listeners
        this._onMessage = this._onMessage.bind(this);

        this.onEmailInput = this.onEmailInput.bind(this);
        this.onPasswordInput = this.onPasswordInput.bind(this);

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
        Store.removeAllListeners();
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
            // Authentificate the user
            Action.login(username, password);
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

    private _onMessage() {
        this.setState({ message: Store.getMessage() });
    }

    private _onLoggedIn() {
        console.log("REDIRECT !*!*! ");
        // Go to /some/path.
        browserHistory.push("/home");
        // Go back to previous location.
        browserHistory.goBack();
        console.log("REDIRECT !*!*! ");
        this.setState({ token: Store.getToken() });
    }

    public render() {
        const errors = this.state.errors.map((e, i) => <li key={i}>{e}</li>);
        const titre = (
            <h3>Connexion</h3>
        );

        return (
            <div>
                <h1>TSAP</h1>
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
                                    <Checkbox>Rester connecté</Checkbox>
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
        );
    }
}
