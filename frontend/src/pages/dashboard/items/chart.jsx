import ReactApexChart from "react-apexcharts";

export const ChartDashboard = () => {
  const time = new Date();
  const Weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
      text: "Sign ups per day",
      align: "left",
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      fontSize: 0,
      markers: {
        width: 20,
        height: 15,
      },
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
      colors: ["#A3ABBD", "#1890FF"],
    },
    grid: {
      show: false,
    },
    tooltip: {
      // y: {
      //   formatter: function (val) {
      //     return "$ " + val + " thousands";
      //   },
      // },
    },
  };

  return (
    <ReactApexChart
      height={300}
      type={"bar"}
      options={options}
      series={series}
    />
  );
};
