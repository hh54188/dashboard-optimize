import axios from "axios";
import _ from "lodash";

const CancelToken = axios.CancelToken;

class AxiosDispatcher {
  constructor() {
    this.executeQueueMaxSize = 10;
    this.onExecuting = false;

    this.waitingQueue = [];
    this.executeQueue = [];
    this.executeHandleDict = {};
  }
  clear(handle) {
    this.executeHandleDict[handle] = null;
    this.executeQueue.splice(
      this.executeQueue.findIndex(item => item === handle),
      1
    );
  }
  triggerExecute() {
    if (!this.executeQueue.length || this.onExecuting) {
      return;
    }
    this.onExecuting = true;
    const availableConfigs = this.executeQueue
      .map(handle => {
        return this.executeHandleDict[handle];
      })
      .filter(item => !!item);
    let continueExecute = true;
    const resultPromise = availableConfigs.reduce(
      (prevPromise, { config, config: { callback }, cancelSource, handle }) => {
        return prevPromise.then(prevResults => {
          if (!continueExecute) {
            availableConfigs.splice(1);
            return prevPromise;
          }
          return axios(config, {
            cancelToken: cancelSource.token
          })
            .then(response => {
              this.clear(handle);
              callback &&
                callback.bind(this, () => {
                  continueExecute = false;
                })(null, response);
              return [...prevResults, response];
            })
            .catch(error => {
              this.clear(handle);
              callback &&
                callback.bind(this, () => {
                  continueExecute = false;
                })(error, null);
              return [...prevResults, error];
            });
        });
      },
      Promise.resolve([])
    );
    resultPromise.then(results => {
      console.log(results);
    });
  }
  feed(config) {
    const configs = _.isArray(config) ? config : [config];
    this.waitingQueue = [...this.waitingQueue, ...configs];

    if (this.executeQueue.length >= this.executeQueueMaxSize) {
      return;
    }

    const remainSize = this.executeQueueMaxSize - this.executeQueue.length;
    const nextRequestRawConfigs = this.waitingQueue.splice(0, remainSize);

    nextRequestRawConfigs.forEach(config => {
      const handle = _.uniqueId();

      this.executeHandleDict[handle] = {
        cancelSource: CancelToken.source(),
        config,
        handle
      };
      this.executeQueue.push(handle);
    });
    this.triggerExecute();
  }
}

const dispatcher = new AxiosDispatcher();

dispatcher.feed([
  {
    url: "https://reqres.in/api/users?delay=3",
    method: "GET",
    callback: (stop, error, result) => {
      stop();
    }
  },
  {
    url: "https://reqres.in/api/users?delay=3",
    method: "GET"
  },
  {
    url: "https://reqres.in/api/users?delay=3",
    method: "GET"
  },
  {
    url: "https://reqres.in/api/users?delay=3",
    method: "GET"
  },
  {
    url: "https://reqres.in/api/users?delay=3",
    method: "GET"
  }
]);
