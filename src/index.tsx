import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";

import { Layout } from "./layouts/Layout/Layout"
import { Accueil } from "./pages/accueil"
import { Upload } from "./pages/upload"

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Accueil}> </Route>
    <Route path="upload" component={Upload}></Route>
  </Router>,
  document.getElementById('root')
);