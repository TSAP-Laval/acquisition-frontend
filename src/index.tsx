import * as React    from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import { Home }   from "./pages/Home"
import { Upload } from "./pages/upload"
import { Edit }   from "./pages/edit"

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Home}> </Route>
        <Route path="upload" component={Upload}></Route>
        <Route path="edit" component={Edit}></Route>
    </Router>,
  document.getElementById('root')
);
