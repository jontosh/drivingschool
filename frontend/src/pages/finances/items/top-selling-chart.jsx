import { Component } from "react";
import ReactApexChart from "react-apexcharts";

export class TopSellingChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [40, 40, 40, 28],
      options: {
        chart: {
          type: "donut",
        },
        labels: [
          "Advanced Parking",
          "8h in car",
          "Advanced Parking",
          "8h in car",
        ],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.options}
        series={this.state.series}
        type="donut"
      />
    );
  }
}
