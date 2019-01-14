import React from "react";
import { connect } from "react-refetch";
import { Card, Skeleton } from "antd";
import uuidv4 from "uuid/v4";
import G2 from "@antv/g2";

import { generateData } from "../../util";

@connect(() => {
  const url = "http://127.0.0.1:9090/api";
  return {
    infoFetch: {
      url,
      andThen: () => {
        return {
          query: url
        };
      }
    }
  };
})
export default class ChartCard extends React.Component {
  constructor(props) {
    super(props);
    this.containerId = uuidv4();
  }
  renderChart() {
    const data = generateData();
    const chart = new G2.Chart({
      container: this.containerId,
      forceFit: true,
      height: 300
    });
    chart.scale({
      time: {
        type: "time",
        mask: "HH:mm"
      }
    });
    chart.source(data);
    chart.line().position("time*value");
    chart.render();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.query &&
      prevProps.query.pending &&
      this.props.query.fulfilled
    ) {
      this.renderChart();
    }
  }
  render() {
    const { query } = this.props;
    const isLoading = !query || (query && query.pending);
    return (
      <Card className="ChartCard">
        {isLoading && <Skeleton active />}
        <div id={this.containerId} />
      </Card>
    );
  }
}
