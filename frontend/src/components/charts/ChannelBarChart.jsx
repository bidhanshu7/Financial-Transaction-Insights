import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import apiClient from "../../utils/apiClient";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChannelBarChart = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  const fetchChannelData = async () => {
    try {
      if (data.length === 0 && labels.length === 0) {
        const response = await apiClient.get(
          "/api/transaction/getTransactionCountByChannel"
        );

        if (response && response.data) {
          const channelData = response.data.channel;
          const newData = [];
          const newLabels = [];

          channelData.map((channel) => {
            newData.push(channel.sumTransaction);
            newLabels.push(`Channel ${channel.channel}`);
          });

          setData(newData);
          setLabels(newLabels);
        }
      } else {
        return;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast(
          error?.response?.data.message || "Failed to fetch data for chart",
          {
            type: "error",
          }
        );
      }
    }
  };

  console.log(labels)

  useEffect(() => {
    fetchChannelData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center  p-6 rounded-lg max-w-[500px] w-full">
      <h2 className="text-xl text-gray-800 font-semibold mb-6 text-center">
        Channel Bar Chart
      </h2>

      <div className="w-full bg-white rounded-lg shadow-md p-6">
        {data.length > 0 ? (
          <Bar
            data={{
              labels: labels,
              datasets: [
                {
                  label: "Transaction Count",
                  data: data,
                  backgroundColor: [
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(255, 205, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                  ],
                  borderColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(255, 205, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                  ],
                  borderWidth: 2,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                tooltip: {
                  backgroundColor: "rgba(0,0,0,0.7)",
                  titleColor: "#fff",
                  bodyColor: "#fff",
                  footerColor: "#fff",
                },
                legend: {
                  position: "top",
                  labels: {
                    color: "gray",
                    font: {
                      size: 14,
                    },
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: "gray",
                  },
                },
                y: {
                  ticks: {
                    color: "gray",
                    beginAtZero: true,
                  },
                },
              },
            }}
          />
        ) : (
          <p className="text-xl text-gray-700 font-semibold text-center">
            No data to display for charts
          </p>
        )}
      </div>
    </div>
  );
};

export default ChannelBarChart;
