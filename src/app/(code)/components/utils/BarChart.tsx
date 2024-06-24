"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1,
      },
    },
  },
};

interface Props {
  title: string;
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderWidth: number;
      backgroundColor: string;
    }[];
  };
}

export const BarChart = ({ data, title }: Props) => {
  return (
    <div className="bg-white p-1 rounded shadow w-full">
      <h2 className="text-center font-semibold">{title}</h2>
      <Bar options={options} data={data} />
    </div>
  );
};
