import React from "react";
import Chart from "react-apexcharts";

type Props = {
  data: { country: string; adults: number; children: number; babies: number }[];
};

const ColumnChart: React.FC<Props> = ({ data = [] }) => {
  // Aggregate visitors by country
  const countryVisitorCounts = data.reduce((acc, d) => {
    const totalVisitors = d.adults + d.children + d.babies;
    acc[d.country] = (acc[d.country] || 0) + totalVisitors;
    return acc;
  }, {} as Record<string, number>);

  // Limit to top 10 countries by visitor count for clarity
  const sortedCountries = Object.entries(countryVisitorCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const series = [
    { name: "Visitors", data: sortedCountries.map(([, count]) => count) },
  ];
  const options = {
    chart: {
      id: "column",
      toolbar: { show: false },
    },
    xaxis: {
      categories: sortedCountries.map(([country]) => country),
      title: { text: "Country" },
    },
    yaxis: { title: { text: "Total Visitors" } },
    dataLabels: { enabled: true },
    colors: ["#FF7F50"],
    plotOptions: {
      bar: {
        borderRadius: 5,
        horizontal: false,
      },
    },
    grid: { borderColor: "#e7e7e7" },
  };

  return <Chart options={options} series={series} type="bar" height={300} />;
};

export default ColumnChart;
