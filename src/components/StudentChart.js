import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const StudentChart = ({ count }) => {
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Class",
          font: {
            size: 14,
          },
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Number of Students",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const studentData = {
    labels: [
      "Nur",
      "LKG",
      "UKG",
      "1st",
      "2nd",
      "3rd",
      "4th",
      "5th",
      "6th",
      "7th",
      "8th",
    ],
    datasets: [
      {
        label: "Number of Students",
        data: count,
        backgroundColor: ["#2323ddb7"],
      },
    ],
  };

  return (
    <>
      <div className="bar_cont">
        <Bar data={studentData} options={options} />
      </div>
    </>
  );
};

export default StudentChart;
