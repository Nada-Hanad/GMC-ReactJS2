import { useEffect, useState } from "react";
import "./App.css";
import LineChart from "./components/lineChart";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [continents, setContinents] = useState([]);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });
  function fetchAllData() {
    axios
      .get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((res) => {
        setData({
          labels: Object.keys(res.data.cases),
          datasets: [
            {
              label: "Cases",
              data: Object.values(res.data.cases),
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Recovered",
              data: Object.values(res.data.recovered),
              borderColor: "rgb(50,205,50)",
              backgroundColor: "rgba(50, 205, 50, 0.5)",
            },
            {
              label: "Deaths",
              data: Object.values(res.data.deaths),
              borderColor: "rgb(0,0,0)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          ],
        });
      });
  }
  useEffect(() => {
    axios.get("https://disease.sh/v3/covid-19/countries").then((res) => {
      let countryInfoArray = res.data.map((e) => {
        return { name: e.country, iso2: e.countryInfo.iso2 };
      });
      setCountries(countryInfoArray);
    });
    axios.get("https://disease.sh/v3/covid-19/continents").then((res) => {
      setContinents([...res.data]);
    });
    fetchAllData();
  }, []);
  function handleSelectChange(event) {
    if (event.target.value === "world") {
      fetchAllData();
    } else {
      axios
        .get("https://disease.sh/v3/covid-19/historical/" + event.target.value)
        .then((res) => {
          setData({
            labels: Object.keys(res.data.timeline.cases),
            datasets: [
              {
                label: "Cases",
                data: Object.values(res.data.timeline.cases),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
              {
                label: "Recovered",
                data: Object.values(res.data.timeline.recovered),
                borderColor: "rgb(50,205,50)",
                backgroundColor: "rgba(50, 205, 50, 0.5)",
              },
              {
                label: "Deaths",
                data: Object.values(res.data.timeline.deaths),
                borderColor: "rgb(0,0,0)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
            ],
          });
        });
    }
  }
  function handleContinentChange(event) {
    axios
      .get("https://disease.sh/v3/covid-19/continents/" + event.target.value)
      .then((res) => {
        setTotal(res.data.cases);
      });
  }

  return (
    <>
      <select onChange={handleSelectChange} name="" id="">
        <option value="world">World</option>
        {countries.map((e, i) => {
          return (
            <option key={i} value={e.iso2}>
              {e.name}
            </option>
          );
        })}
      </select>
      <select name="" id="" onChange={handleContinentChange}>
        <option value="world">World</option>
        {continents.map((e, i) => {
          return (
            <option key={i} value={e.continent}>
              {e.continent}
            </option>
          );
        })}
      </select>
      <h2>Total cases for chosen continent : {total}</h2>
      <LineChart data={data} />
    </>
  );
}

export default App;
