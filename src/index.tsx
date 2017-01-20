import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
<<<<<<< HEAD

import { Home } from "./pages/Home"
import { Upload } from "./pages/Upload"
=======
import { Home } from "./pages/Home"
import { Upload } from "./pages/upload"
import { Edit } from "./pages/edit"
>>>>>>> d315ee2212f360adde47f8d63f8ec6ccfb43164e

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Home}> </Route>
    <Route path="upload" component={Upload}></Route>
<<<<<<< HEAD
=======
    <Route path="edit" component={Edit}></Route>
>>>>>>> d315ee2212f360adde47f8d63f8ec6ccfb43164e
  </Router>,
  document.getElementById('root')
);