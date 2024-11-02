import { ApexOptions } from "apexcharts";
import React from "react";
import Chart from "react-apexcharts";

type Props = {
  data: { date: string; adults: number; children: number; babies: number }[];
};

const TimeSeriesChart: React.FC<Props> = ({ data = [] }) => {
  // Process data to get total visitors per day
  const processedData = data.reduce((acc, d) => {
    const date = new Date(d.date).toISOString().split("T")[0];
    const totalVisitors = d.adults + d.children + d.babies;

    if (acc[date]) {
      acc[date] += totalVisitors;
    } else {
      acc[date] = totalVisitors;
    }
    return acc;
  }, {} as Record<string, number>);

  const seriesData = Object.keys(processedData).map((date) => ({
    x: new Date(date).getTime(),
    y: processedData[date],
  }));

  const series = [{ name: "Total Visitors", data: seriesData }];

  const options: ApexOptions = {
    chart: {
      id: "timeseries",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 4,
    },
    xaxis: {
      type: "datetime",
      labels: { format: "dd MMM" },
    },
    yaxis: {
      title: { text: "Total Visitors" },
    },
    colors: ["#1E90FF"],
    grid: { borderColor: "#e7e7e7" },
  };

  return <Chart options={options} series={series} type="line" height={300} />;
};

export default TimeSeriesChart;
