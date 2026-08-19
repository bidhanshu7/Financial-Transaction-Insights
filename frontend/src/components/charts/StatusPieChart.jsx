import React, { useContext, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { appContext } from "../../context/appContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusPieChart = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  const { fetchFilterCountDetails } = useContext(appContext);

  const fetchDataForChart = async () => {
    if (data.length === 0 && labels.length === 0) {
      const statusData = await fetchFilterCountDetails();

      if (statusData) {
        const newData = [];
        const newLabels = [];
        
        statusData.map((status) => {
          newData.push(status.sumTransaction);
          newLabels.push(status.status);
        });

        setData(newData);
        setLabels(newLabels);
      }
    }
  };

  console.log(data);
  console.log(labels);

  useEffect(() => {
    fetchDataForChart();
  }, []);

  return (
    <div className="flex flex-col justify-center  p-4 bg-white rounded-lg">
      <h2 className="text-xl text-gray-700 font-semibold mb-4">
        Transaction Status 
      </h2>

      <div className="w-full max-w-[400px] p-4 shadow-lg">
        {data.length > 0 ? (
          <Doughnut
            data={{
              labels: labels,
              datasets: [
                {
                  label: "Transaction Status",
                  data: data,
                  backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                    "rgb(255,255,90)",
                  ],
                  borderWidth: 2,
                  hoverOffset: 6,
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
              animation: {
                animateScale: true,
                animateRotate: true,
              },
            }}
          />
        ) : (
          <p className="text-xl text-gray-700 font-semibold">
            No data to display for charts
          </p>
        )}
      </div>
    </div>
  );
};

export default StatusPieChart;
