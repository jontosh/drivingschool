import ReactApexChart from "react-apexcharts";

export const FileChart = ({ colors, labels }) => {
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
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {},
            value: {},
          },
        },
      },
    },
    labels: labels,
    // responsive: [
    //   {
    //     breakpoint: 480,
    //     options: {
    //       chart: {
    //         width: 200,
    //       },
    //       legend: {
    //         position: "bottom",
    //       },
    //     },
    //   },
    // ],
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
