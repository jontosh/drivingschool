import ReactApexChart from "react-apexcharts";

export const ChartDashboard = () => {
  const time = new Date();
  const Weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const series = [
    {
      name: "Lessons",
      data: [5, 7, 6, 8, 7, 5, 7],
    },
  ];
  const options = {
    chart: {
      // background: "#000",
      type: "bar",
      events: (chart, w, e) => {
        console.log(chart, w, e);
      },
      toolbar: {
        show: false,
      },
    },
    // colors: ["#DEDEDE", "#E91E63"],
    fill: {
      type: "solid",
      colors: Weekdays.map((_, index) => {
        index += 1;
        return index === time.getDay() ? "#1890FF" : "#DEDEDE";
      }),
    },
    plotOptions: {
      bar: {
        columnWidth: "70%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: false,
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      categories: [
        ["Mon"],
        ["Tue"],
        ["Wed"],
        ["Thu"],
        ["Fri"],
        ["Sat"],
        ["Sun"],
      ],
      labels: {
        style: {
          // colors: "red",
          fontSize: "12px",
        },
      },
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
