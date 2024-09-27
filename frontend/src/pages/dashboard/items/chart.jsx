import ColorsContext from "@/context/colors.jsx";
import { useContext } from "react";
import ReactApexChart from "react-apexcharts";

export const ChartDashboard = () => {
  const { colorsObject } = useContext(ColorsContext);
  const series = [
    {
      name: "Lessons",
      data: [5, 7, 6, 8, 7, 5, 7],
    },
    {
      name: "Lessons",
      data: [5, 7, 6, 8, 7, 5, 7],
    },
  ];

  const options = {
    title: {
      text: "Lessons",
      align: "left",
    },
    legend: {
      show: false,
    },
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      colors: [colorsObject.secondary, colorsObject.info],
    },
    grid: {
      show: false,
    },
  };

  return (
    <ReactApexChart height={300} type="bar" options={options} series={series} />
  );
};
