import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const StudentChart = ({ count }) => {
   // Chart configuration options for customizing axes and labels
  const options = {
    scales: {
      // X-axis configuration
      x: {
        title: {
          display: true, // Display the title of the X-axis
          text: "Class", // Title text for the X-axis
          font: {
            size: 14, // Font size for the X-axis title
          },
        },
      },
      // Y-axis configuration
      y: {
        stacked: true, // Stack the bars on top of each other
        title: {
          display: true, // Display the title of the Y-axis
          text: "Number of Students", // Title text for the Y-axis
          font: {
            size: 12,
          },
        },
      },
    },
  };

  // The data for the bar chart (labels and datasets)
  const studentData = {
    // Labels for each grade/class
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
        label: "Number of Students", // Label for the dataset
        data: count, // The 'count' prop is used as the data for the bars
        backgroundColor: ["#2323ddb7"], // The color of the bars 
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
