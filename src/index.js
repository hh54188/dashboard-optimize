import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.less";

import App from "./App";
// import App from "./OptimizedApp_Basic";
// import App from "./LongTask_TTI/interactive";
// import App from "./LongTask_TTI/load";

// import ttiPolyfill from "tti-polyfill";
// ttiPolyfill.getFirstConsistentlyInteractive().then(tti => {
//   // Use `tti` value in some way.
//   console.log(tti);
// });

ReactDOM.render(<App />, document.querySelector("#app"));
