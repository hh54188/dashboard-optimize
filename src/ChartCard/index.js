import React from "react";
import { connect } from "react-refetch";
import { Card } from "antd";
import uuidv4 from "uuid/v4";
import G2 from "@antv/g2";

@connect(() => {
  const url = "http://127.0.0.1:9000/api";
  return {
    infoFetch: url,
    andThen: () => {
      return {
        query: url
      };
    }
  };
})
export default class ChartCard extends React.Component {
  constructor(props) {
    super(props);
    this.containerId = uuidv4();
  }
  componentDidMount() {
    const data = [
      {
        year: "1991",
        value: 3
      },
      {
        year: "1992",
        value: 4
      },
      {
        year: "1993",
        value: 3.5
      },
      {
        year: "1994",
        value: 5
      },
      {
        year: "1995",
        value: 4.9
      },
      {
        year: "1996",
        value: 6
      },
      {
        year: "1997",
        value: 7
      },
      {
        year: "1998",
        value: 9
      },
      {
        year: "1999",
        value: 13
      }
    ];

    const chart = new G2.Chart({
      container: this.containerId,
      forceFit: true,
      height: 300
    });

    chart.source(data);
    chart.line().position("year*value");
    chart.render();
  }
  render() {
    const { className, style } = this.props;
    return (
      <Card className={className} style={style}>
        <div id={this.containerId} />
      </Card>
    );
  }
}
