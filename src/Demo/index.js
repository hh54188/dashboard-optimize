import React from "react";
import axios from "axios";

import PromiseDispatcher from "../PromiseDispatcher";

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const promiseDispatcher = new PromiseDispatcher();
  }
  render() {
    return <div>DEMO</div>;
  }
}
