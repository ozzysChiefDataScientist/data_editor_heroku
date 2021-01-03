import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { VictoryChart, VictoryBar } from 'victory';
import _ from 'lodash';

export default class BarChartByCategory extends PureComponent {
  static propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array
  };

  render() {

    const ans = _(this.props.data)
      .groupBy('category')
      .map((category, id) => ({
        category: id,
        amount: _.sumBy(category, 'Amount')
      }))
      .value()

    let chart_component;
    if (this.props.data.length > 1) {
      chart_component = (
      <VictoryChart height={200} width={400}>
      <VictoryBar data={ans} x="category" y="amount"/>
      </VictoryChart>
      )
    } else {
      chart_component = <br/>
    }

    return (
      <div>
      {chart_component}
      </div>
    )
  }
}
