import { observable, autorun } from "mobx";
import axios from "axios";

import { generateData } from "../util";

import PromiseDispatcher from "../PromiseDispatcher";
const promiseDispatcher = new PromiseDispatcher();

export default class DashboardStore {
  @observable reports = [...Array(30).keys()].map((item, index) => {
    return {
      loading: true,
      id: index,
      data: []
    };
  });
  constructor() {
    autorun(() => {
      this.reports.forEach(report => {
        const requestDataJob = () => {
          report.loading = true;
          return axios.get("http://127.0.0.1:9090/api").then(() => {
            report.loading = false;
            report.data = generateData();
          });
        };
        promiseDispatcher.feed([requestDataJob]);
      });
    });
  }
}
