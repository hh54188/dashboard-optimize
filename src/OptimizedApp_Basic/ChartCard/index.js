import React from "react";
import { observer } from "mobx-react";
import { Card, Skeleton } from "antd";
import uuidv4 from "uuid/v4";
import G2 from "@antv/g2";

@observer
export default class ChartCard extends React.Component {
  constructor(props) {
    super(props);
    this.containerId = uuidv4();
  }
  renderChart(data) {
    if (!data || !data.length) {
      return;
    }
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
    if (!prevProps.rendered && this.props.rendered) {
      this.renderChart(this.props.data);
    }
  }
  render() {
    const { loading } = this.props;
    return (
      <Card className="ChartCard">
        {loading && <Skeleton active />}
        <div id={this.containerId} />
      </Card>
    );
  }
}
