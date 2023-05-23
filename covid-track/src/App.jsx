import axios from "axios";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

import LineChart from "./components/lineChart";

function App() {
  const URL = "https://disease.sh";
  const [cases, setCases] = useState();
  const [labels, setLabels] = useState();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  function fetchAllData() {
    axios
      .get(URL + "/v3/covid-19/historical/all")
      .then((res) => {
        setLabels(Object.keys(res.data.cases));
        setCases(Object.values(res.data.cases));
      })
      .catch((err) => {
        notify();
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function getAllCountries() {
    axios.get(URL + "/v3/covid-19/countries").then((res) => {
      let countriesArray = res.data.map((e) => {
        return {
          name: e.country,
          iso3: e.countryInfo.iso3,
          id: e.countryInfo._id,
        };
      });

      setCountries(countriesArray);
    });
  }
  const notify = () =>
    toast.error("Something went wrong!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  function handleSelectChange(event) {
    if (event.target.value === "all") {
      fetchAllData();
    } else {
      getDataByCountry(event.target.value);
    }
  }
  function getDataByCountry(iso3) {
    setLoading(true);
    axios
      .get(URL + "/v3/covid-19/historical/" + iso3)
      .then((res) => {
        setLabels(Object.keys(res.data.timeline.cases));
        setCases(Object.values(res.data.timeline.cases));
      })
      .catch((err) => {
        notify();
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getAllCountries();
    fetchAllData();
  }, []);

  return (
    <main>
      <select onChange={handleSelectChange}>
        <option value="all">All</option>
        {countries.map((e, i) => (
          <option key={i} value={e.iso3}>
            {e.name}
          </option>
        ))}
      </select>
      <div className="chart-container">
        {loading ? (
          <CircularProgress />
        ) : (
          <LineChart labels={labels} cases={cases} />
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
}

export default App;
