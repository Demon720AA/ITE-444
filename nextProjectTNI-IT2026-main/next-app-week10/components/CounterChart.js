"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function CounterChart({ data, type = "both", title = "จำนวนผู้เข้าชมรายเดือน ปี 2026", label = "จํานวนผู้เข้าชม", color = "blue" }) {
  const labels = data.map((item) => item.label);
  const values = data.map((item) => item.value);

  const getColors = () => {
    if (color === "colorful") {
      return [
        "#0d6efd", "#6610f2", "#6f42c1", "#d63384",
        "#dc3545", "#fd7e14", "#ffc107", "#198754", "#20c997",
      ];
    } else if (color === "green") {
      return "rgb(25, 135, 84)";
    } else if (color === "red") {
      return "rgb(220, 53, 69)";
    } else if (color === "orange") {
      return "rgb(253, 126, 20)";
    }
    return "rgb(13, 110, 253)"; // default blue
  };

  const barData = {
    labels,
    datasets: [
      {
        label: label,
        data: values,
        backgroundColor: getColors(),
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: label,
        data: values,
        borderColor: getColors() === "colorful" ? "rgb(13, 110, 253)" : getColors(),
        backgroundColor: (context) => {
          if (getColors() === "colorful") return "rgba(13, 110, 253, 0.2)";
          const c = getColors();
          if (c === "rgb(25, 135, 84)") return "rgba(25, 135, 84, 0.2)";
          if (c === "rgb(220, 53, 69)") return "rgba(220, 53, 69, 0.2)";
          if (c === "rgb(253, 126, 20)") return "rgba(253, 126, 20, 0.2)";
          return "rgba(13, 110, 253, 0.2)";
        },
        tension: 0.4,
        fill: true,
        pointBackgroundColor: getColors() === "colorful" ? "rgb(13, 110, 253)" : getColors(),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: !!title,
        text: title,
        font: {
          size: 16,
          family: "'Sarabun', 'Kanit', sans-serif"
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [5, 5],
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    },
  };

  return (
    <div style={{ height: "300px", width: "100%" }}>
      {type === "bar" && <Bar data={barData} options={options} />}
      {type === "line" && <Line data={lineData} options={options} />}
      {type === "both" && (
        <>
          <div className="mb-4" style={{ height: "300px" }}>
            <Bar data={barData} options={options} />
          </div>
          <div style={{ height: "300px" }}>
            <Line data={lineData} options={options} />
          </div>
        </>
      )}
    </div>
  );
}
