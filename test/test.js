import PromiseDispatcher from "../src/PromiseDispatcher";
const assert = require("assert");

const ERROR_MESSAGE = "Error Message";
const SUCCESS_MESSAGE = "Success Message";

const fakeSuccessAsyncTask = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(SUCCESS_MESSAGE);
    }, 1000 * 1);
  });
};

const fakeFailedAsyncTask = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(ERROR_MESSAGE));
    }, 1000 * 1);
  });
};

const fakeSuccessSyncTask = function() {
  return SUCCESS_MESSAGE;
};

const fakeFailedSyncTask = function() {
  return new Error(ERROR_MESSAGE);
};

describe("Array", function() {
  describe("#indexOf()", function() {
    it("should return -1 when the value is not present", function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
