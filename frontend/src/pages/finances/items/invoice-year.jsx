import { Paragraph } from "@/components/title/index.jsx";
import { Component } from "react";
import ReactApexChart from "react-apexcharts";
export class InvoiceYear extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Package",
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
        },
        {
          name: "Online courses",
          data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [5, 7, 5],
          curve: "straight",
          // dashArray: [0, 8, 5],
        },
        // title: {
        //   text: "Page Statistics",
        //   align: "left",
        // },
        legend: {
          tooltipHoverFormatter: function (val, opts) {
            return (
              val +
              " - <strong>" +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              "</strong>"
            );
          },
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6,
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val + " (mins)";
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val + " per session";
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val;
                },
              },
            },
          ],
        },
        grid: {
          borderColor: "#f1f1f1",
        },
      },
    };
  }

  render() {
    return (
      <div>
        <div className={"flex items-center"}>
          <div className="w-36">
            <Paragraph fontSize={"text-xl font-bold"}>40</Paragraph>
            <Paragraph className={"text-[#5A607F]"} fontSize={"text-sm"}>
              Sell 40 package
            </Paragraph>
          </div>
          <div className="w-36">
            <Paragraph fontSize={"text-xl font-bold"}>200</Paragraph>
            <Paragraph className={"text-[#5A607F]"} fontSize={"text-sm"}>
              Online courses
            </Paragraph>
          </div>
        </div>
        <div className={"-mx-4"}>
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={350}
          />
        </div>
      </div>
    );
  }
}
