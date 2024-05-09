import { Component } from "react";
import ReactApexCharts from "react-apexcharts";

export class Expenses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [418, 370, 931, 200],
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Car payments", "Rent", "Gas", "Payroll"],
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
      <ReactApexCharts
        options={this.state.options}
        series={this.state.series}
        type="pie"
        width={380}
      />
    );
  }
}
