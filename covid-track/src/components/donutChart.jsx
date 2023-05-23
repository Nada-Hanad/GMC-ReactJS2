import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutChart() {
  const [cases, setCases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [recovered, setRecovered] = useState(0);
  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((res) => {
        let sumC = 0;
        let sumD = 0;
        let sumR = 0;
        for (let i = 0; i < Object.values(res.data.cases).length; i++) {
          sumC += Object.values(res.data.cases)[i];
          sumD += Object.values(res.data.deaths)[i];
          sumR += Object.values(res.data.recovered)[i];
        }
        setCases(sumC);
        setDeaths(sumD);
        setRecovered(sumR);
      });
  }, []);
  return (
    <div className="chart-container">
      <Doughnut
        data={{
          labels: ["Recovered", "Cases", "Deaths"],
          datasets: [
            {
              label: "# of Votes",
              data: [recovered, cases, deaths],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
}
