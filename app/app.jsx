require('./index.html');
require('foundation-sites/dist/css/foundation.css');
require('./css/mycss.css');
require('./css/reset.css');
let Main = require("./components/main.jsx");
let ReactDOM = require("react-dom");
let React = require("react");
let {Route, Router, IndexRoute, hashHistory} = require("react-router");

// (function () {
//   function requireAll(r) { r.keys().forEach(r); }
//   requireAll(require.context('foundation-sites/scss/', true, /\.scss$/));
// })();

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" components={Main}>
          <IndexRoute components={Main}/>
        </Route>
    </Router>,
    document.getElementById("app")
);
