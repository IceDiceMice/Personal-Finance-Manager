import React from "react";
import { Line } from "react-chartjs-2";

export default function ReportByDay({ generatedData }) {
  const data = [];
  const labels = [];

  generatedData.forEach((element) => {
    data.push(element.summary);
    labels.push(element.date);
  });

  return (
    <div className="report-by-day">
      <Line
        data={{
          labels: labels,
          datasets: [
            {
              label: "Сума",
              data: data,
              backgroundColor: ["#0080FF"],
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: {
              display: true,
              text: "Розподіл витрат за період (по датам)",
            },
            legend: {
              display: true,
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
}
