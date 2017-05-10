// tslint:disable:import-spacing
import * as React    from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { Home }   from "./pages/Home";
import { Upload } from "./pages/Upload";
import { Edit }   from "./pages/Edit";
import { Layout } from "./pages/Layout";
import { Login }  from "./pages/login";
// tslint:disable-next-line:no-var-requires
const auth = require("./components/auth");
// tslint:enable:import-spacing

function requireAuth(nextState: any, replace: any) {
    if (!auth.loggedIn()) {
        replace({
            pathname: "/",
            state: { nextPathname: nextState.location.pathname },
        });
    }
}

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Login} />
            <Route path="home" component={Home} onEnter={requireAuth} />
            <Route path="upload" component={Upload} onEnter={requireAuth} />
            <Route path="edit/:gameID" component={Edit} onEnter={requireAuth} />
        </Route>
    </Router>,
  document.getElementById("root"),
);

/* TO KEEP PLZ
    <Router history={hashHistory}>
        <Route
            path="/"
            component={Home}
        />
        <Route
            path="/"
            component={Home}
        />
        <Route
            path="upload"
            component={Upload}
        />
        <Route
            path="edit/:gameID"
            component={Edit}
        />
    </Router>,
*/
