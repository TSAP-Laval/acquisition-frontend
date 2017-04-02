// tslint:disable:import-spacing
import * as React    from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Home }   from "./pages/Home";
import { Upload } from "./pages/Upload";
import { Edit }   from "./pages/Edit";
// tslint:enable:import-spacing

ReactDOM.render(
    <Router history={hashHistory}>
        <Route
            path="/"
            component={Home}
        />
        <Route
            path="upload"
            component={Upload}
        />
        <Route
            path="edit"
            component={Edit}
        />
    </Router>,
  document.getElementById("root"),
);
