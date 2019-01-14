import React from "react";
import ChartCard from "./ChartCard";

import "./index.less";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {[...Array(30).keys()].map((item, index) => {
          return <ChartCard key={index} />;
        })}
      </div>
    );
  }
}
