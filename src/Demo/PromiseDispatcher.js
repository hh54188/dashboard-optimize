import _ from "lodash";

const utils = {
  // https://stackoverflow.com/questions/27746304/how-do-i-tell-if-an-object-is-a-promise#answer-27746324
  isPromiseObj: function (obj) {
    return obj.then && _.isFunction(obj.then)
  }
}

export default class PromiseDispatcher {
  constructor(tasks) {
    this.tasks = _.isArray(tasks) ? tasks : [tasks]
    this.execute()
  }
  execute() {
    const finalPromise = this.tasks.reduce((prevPromise, curTask) => {
      return prevPromise.then(prevResult => {
        // ===== Async Function Compatible =====
        let curPromise = null

        try {
          curPromise = curTask()
        } catch(error) {
          curPromise = Promise.reject(curPromise)
        }

        if (!utils.isPromiseObj(curPromise)) {
          curPromise = Promise.resolve(curPromise)
        }          
        // =====
        return curPromise.then(curResult => {
          console.log('RESOLVED:)')
          return [...prevResult, curResult]
        }).catch(curError => {
          console.log('REJECTED:(')
          return [...prevResult, curError]
        })
      })
    }, Promise.resolve([]))

    finalPromise.then(result => {
      console.log('result------>', result)
    })
  }
}

const fakeSuccessAsyncTask = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('------> SUCCESS ASYNC FUNCTION')
      resolve([])
    }, 1000 * 1)
  })
}

const fakeFailedAsyncTask = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('------> FAILED ASYNC FUNCTION')
      reject([])
    }, 1000 * 1)
  })  
}


const fakeSuccessSyncTask = function() {
  console.log('------> SUCCESS SYNC FUNTION')
  return []
}

const fakeFailedSyncTask = function() {
  console.log('------> FAILED SYNC FUNTION')
  return new Error()
}

const dispatcherInstance = new PromiseDispatcher([
  // fakeSuccessAsyncTask,
  // fakeSuccessAsyncTask,
  
  fakeFailedAsyncTask,
  fakeFailedAsyncTask,

  // fakeSuccessSyncTask,
  // fakeSuccessSyncTask,
  
  // fakeFailedSyncTask,
  // fakeFailedSyncTask,
  
  // fakeSuccessAsyncTask,
  // fakeFailedAsyncTask,
])
