import _ from "lodash";

// https://stackoverflow.com/questions/27746304/how-do-i-tell-if-an-object-is-a-promise#answer-27746324
function isPromiseObj(obj) {
  return obj.then && _.isFunction(obj.then);
}

const defaultConfig = {
  maxParallelExecuteCount: 1
};

export default class PromiseDispatcher {
  constructor(tasks, config) {
    this.tasks = _.isArray(tasks) ? tasks : [tasks];
    this.waitingTasks = [];
    this.config = Object.assign({}, defaultConfig, config);
    this.isExecuting = false;
    this.execute();
  }
  feed(inputTasks) {
    const tasks = _.isArray(inputTasks) ? inputTasks : [inputTasks];
    if (this.isExecuting) {
      this.waitingTasks = tasks;
    } else {
      this.tasks = tasks;
      this.execute();
    }
  }
  execute() {
    const { maxParallelExecuteCount = 1 } = this.config;
    const chunkedTasks = _.chunk(this.tasks, maxParallelExecuteCount);
    this.isExecuting = true;

    const finalPromise = chunkedTasks.reduce((prevPromise, curChunkedTask) => {
      return prevPromise.then(prevResult => {
        return Promise.all(
          curChunkedTask.map(curTask => {
            let curPromise = null;
            // ===== Compatible Begin =====
            try {
              curPromise = curTask();
            } catch (error) {
              curPromise = Promise.reject(curPromise);
            }

            if (!isPromiseObj(curPromise)) {
              curPromise = Promise.resolve(curPromise);
            }
            // ===== Compatible End =====
            return curPromise;
          })
        )
          .then(curChunkedResults => {
            return [...prevResult, curChunkedResults];
          })
          .catch(curError => {
            return [...prevResult, curError];
          });
      });
    }, Promise.resolve([]));

    finalPromise.then(result => {
      this.tasks = [];
      this.isExecuting = false;
      if (this.waitingTasks && this.waitingTasks.length) {
        this.tasks = this.waitingTasks;
        this.waitingTasks = [];
        this.execute();
      }
    });
  }
}
