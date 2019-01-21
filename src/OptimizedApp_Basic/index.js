import React from "react";
import { observer } from "mobx-react";

import ChartCard from "./ChartCard";
import DashboardStore from "./DashboardStore";
import { withMobxModel } from "../util";
import "../App/index.less";

@withMobxModel(props => {
  return {
    dashboardStore: new DashboardStore()
  };
})
@observer
export default class OptimizedApp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { reports } = this.props.dashboardStore;
    return (
      <div>
        {reports.map(({ id, data, loading, rendered }) => {
          return (
            <ChartCard
              key={id}
              data={data}
              loading={loading}
              rendered={rendered}
            />
          );
        })}
      </div>
    );
  }
}
