import React from "react";
import ReactDOM from "react-dom";
import App from "./root";
import "./polyfills";
import "./styles/globals/globals.scss";

// ReactDOM.render(<App />, document.getElementById("root"));

export const render = Component => {
  ReactDOM.render(<Component />, document.getElementById("root"));
};

render(App);

if (module.hot) {
  module.hot.accept("./root/index.js", () => {
    const nextApp = require("./root/index.js").default; // eslint-disable-line global-require
    render(nextApp);
  });
}
