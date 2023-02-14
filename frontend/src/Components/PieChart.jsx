import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ globalCryptoData }) => {
  const data = {
    labels: Object.keys(globalCryptoData.data.market_cap_percentage),
    datasets: [
      {
        label: "Market Dominance in %",
        data: Object.values(globalCryptoData.data.market_cap_percentage),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
      }
    ]
  };

  console.log(
    Object.values(globalCryptoData.data.market_cap_percentage),
    Object.keys(globalCryptoData.data.market_cap_percentage)
  );

  return (
    <div className="flex justify-center mt-8  h-3/4 pb-10">
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
