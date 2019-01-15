import React from "react";
import Perfume from "perfume.js";

// const perfume = new Perfume({
//   firstPaint: true,
//   firstContentfulPaint: true,
//   firstInputDelay: true,
//   timeToInteractive: true
// });

// console.log(perfume);

const perfObserver = new PerformanceObserver(performanceEntryList => {
  for (const performanceEntry of performanceEntryList.getEntries()) {
    console.log(performanceEntry.name); // 'first-paint' or 'first-contentful-paint'
    console.log(performanceEntry.startTime); // DOMHighResTimeStamp
  }
});
perfObserver.observe({ entryTypes: ["paint"] });

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

    // FiveSecondslongTask();
    chunk(Array(5).fill(OneSecondslongTask));
  }
  render() {
    return null;
  }
}
