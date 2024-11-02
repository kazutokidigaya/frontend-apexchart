import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type Props = {
  data: { adults: number; children: number; date: string }[];
  type: "adults" | "children";
  title: string;
};

const SparklineChart: React.FC<Props> = ({ data = [], type, title }) => {
  // Aggregate data by date for the specified type (adults or children)
  const aggregatedData = data.reduce((acc, entry) => {
    const date = new Date(entry.date).toISOString().split("T")[0];
    const count = entry[type] || 0;

    if (acc[date]) {
      acc[date] += count;
    } else {
      acc[date] = count;
    }
    return acc;
  }, {} as Record<string, number>);

  // Prepare the series data for ApexCharts
  const seriesData = Object.keys(aggregatedData).map((date) => ({
    x: date,
    y: aggregatedData[date],
  }));

  const series = [{ name: title, data: seriesData }];

  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 80,
      sparkline: { enabled: true },
    },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.1,
      },
    },
    colors: [type === "adults" ? "#32CD32" : "#FF6347"],
    xaxis: {
      type: "category",
      labels: {
        rotate: -45,
        formatter: (value: string) =>
          new Date(value).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
      },
    },
    tooltip: {
      x: {
        format: "MMM dd, yyyy",
      },
      y: {
        formatter: (val: number) => `${val} visitors`,
      },
    },
  };

  const total = Object.values(aggregatedData).reduce(
    (acc, value) => acc + value,
    0
  );

  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600">Total: {total}</p>
      <Chart options={options} series={series} type="area" height={80} />
    </div>
  );
};

export default SparklineChart;
