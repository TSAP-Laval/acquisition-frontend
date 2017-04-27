// tslint:disable:import-spacing
import * as React    from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { Home }   from "./pages/Home";
import { Upload } from "./pages/Upload";
import { Edit }   from "./pages/Edit";
// tslint:enable:import-spacing


ReactDOM.render(
    <Router history={browserHistory}>
        <Route
            path="/"
            component={Home}
        />
        <Route
            path="upload"
            component={Upload}
        />
        <Route
            path="edit/:idPartie"
            component={Edit}
        />
    </Router>,
  document.getElementById("root"),
);
