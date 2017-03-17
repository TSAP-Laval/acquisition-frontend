import * as React    from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
<<<<<<< HEAD
import { Home } from "./pages/Home"
import { Upload } from "./pages/upload"
import { Edit }   from "./pages/edit"
=======
<<<<<<< HEAD



import { Home } from "./pages/Home"
import { Upload } from "./pages/upload"
import { Edit } from "./pages/edit"
=======
import { Home }   from "./pages/Home"
import { Upload } from "./pages/Upload"
import { Edit }   from "./pages/Edit"
>>>>>>> da3ed6bcaa35ee7eebd9430506998e880c8f5749
>>>>>>> dev

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Home}> </Route>
        <Route path="upload" component={Upload}></Route>
        <Route path="edit" component={Edit}></Route>
    </Router>,
  document.getElementById('root')
);
