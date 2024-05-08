import ColorsContext from "@/context/colors.jsx";
import ReactApexChart from "react-apexcharts";
import { Component, useContext } from "react";

export const FileChart = ({ colors }) => {
  const series = [51, 49];
  const options = {
    chart: {
      type: "donut",
    },
    fill: {
      colors: colors,
    },
    legend: {
      show: false,
    },
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
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="donut"
      width={"100%"}
    />
  );
};
