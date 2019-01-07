import _ from "lodash";
import { isThisQuarter } from "date-fns";

const utils = {
  // https://stackoverflow.com/questions/27746304/how-do-i-tell-if-an-object-is-a-promise#answer-27746324
  isPromiseObj: function(obj) {
    return obj.then && _.isFunction(obj.then);
  }
};

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
  // .feed.then(promiseHandler => promise.then)
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

            if (!utils.isPromiseObj(curPromise)) {
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
      console.log(result);
      this.tasks = [];
      this.isExecuting = false;
      // debugger;
      if (this.waitingTasks && this.waitingTasks.length) {
        this.tasks = this.waitingTasks;
        this.waitingTasks = [];
        this.execute();
      }
    });
  }
}

const fakeSuccessAsyncTask = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([]);
    }, 1000 * 1);
  });
};

const fakeFailedAsyncTask = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Error Message"));
    }, 1000 * 1);
  });
};

const fakeSuccessSyncTask = function() {
  return [];
};

const fakeFailedSyncTask = function() {
  return new Error();
};

const dispatcherInstance = new PromiseDispatcher([
  fakeSuccessAsyncTask,
  fakeSuccessAsyncTask
  // fakeSuccessAsyncTask,
  // fakeSuccessAsyncTask,
  // fakeSuccessAsyncTask,
  // fakeSuccessAsyncTask
  // fakeFailedAsyncTask,
  // fakeFailedAsyncTask
  // fakeSuccessSyncTask,
  // fakeSuccessSyncTask,
  // fakeFailedSyncTask,
  // fakeFailedSyncTask,
  // fakeSuccessAsyncTask,
  // fakeFailedAsyncTask,
]);
