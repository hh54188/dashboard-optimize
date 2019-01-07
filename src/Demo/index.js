import React from "react";
import axios from "axios";

import PromiseDispatcher from "../PromiseDispatcher";

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // axios.get("http://127.0.0.1:9090/api/").then(response => {
    //   console.log(response);
    // });
  }
  render() {
    return <div>DEMO</div>;
  }
}
