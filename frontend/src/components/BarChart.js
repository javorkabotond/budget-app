import React, { useEffect, useState } from "react";
import budgetApi from "../api/budgetApi";
import { Bar } from "react-chartjs-2";
import { Container } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    getDataFromChart();
  }, []);

  const getDataFromChart = async () => {
    try {
      const response = await budgetApi.getByCategory();
      const data = response.data;
      // setChartData.labels = data.map((budget) => budget.category);
      setChartData({
        labels: data.map((budget) => budget.category),
        datasets: [
          {
            label: "Forint",
            data: data.map((budget) => budget.total_amount),
            backgroundColor: ["#ffbb11", "#ecf0f1", "#50AF95"],
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Container maxWidth="xl">
        {!chartData ? (
          <span>Loading...</span>
        ) : (
          <Bar
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Budgets",
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              },
            }}
          />
        )}
      </Container>
    </div>
  );
};

export default BarChart;
