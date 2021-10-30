import React from "react";
import { Pie } from "react-chartjs-2";

export default function ReportByPeriod({ generatedData }) {
  const data = [];
  const labels = [];

  generatedData.forEach((element) => {
    data.push(element.summary);
    labels.push(element.category);
  });

  return (
    <div className="report-by-day">
      <Pie
        data={{
          labels: labels,
          datasets: [
            {
              label: "Сума",
              data: data,
              backgroundColor: [
                "#FF0000",
                "#FF8000",
                "#FFFF00",
                "#80FF00",
                "#00FF00",
                "#00FF80",
                "#00FFFF",
                "#0080FF",
                "#0000FF",
                "#8000FF",
                "#FF00FF",
                "#FF0080",
              ],
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Розподіл витрат за період",
            },
          },
        }}
      />
    </div>
  );
}
