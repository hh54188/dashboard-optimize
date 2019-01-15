import React from "react";

import "./index.less";

export default class LongTask extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    function createLongTask(seconds) {
      return function() {
        const startTimestamp = +new Date();
        const executeDuration = 1000 * seconds;
        while (+new Date() - startTimestamp < executeDuration) {}
      };
    }
    const FiveSecondslongTask = createLongTask(5);
    const OneSecondslongTask = createLongTask(1);

    function chunk(arr) {
      const item = arr.shift();
      item();
      if (arr.length) {
        setTimeout(() => {
          chunk(arr);
        });
      } else {
        console.log("Run Task Complete");
      }
    }

    const btn = document.querySelector("button");
    let counter = 0;
    btn.onclick = function() {
      const startTimestamp = +new Date();
      if (!counter) {
        // 1):
        // FiveSecondslongTask();
        // console.log('Run Task Complete')

        // 2):
        chunk(Array(5).fill(OneSecondslongTask));

        counter++;
      } else if (counter) {
        console.log("CLICKED", +new Date() - startTimestamp);
      }
    };
  }
  render() {
    return (
      <div className="container">
        <button>Button</button>
      </div>
    );
  }
}
