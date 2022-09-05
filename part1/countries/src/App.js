import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Search from "./Search";
import Display from "./Display";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    console.log("effect for countries");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled for countries");
      setCountries(response.data);
    });
  }, []);

  const handleFilter = (e) => {
    // console.log(e.target.value);

    setFilter(e.target.value);
  };

  //new array filteredCountries that returns all countries that match the filter
  //this piece is crucial, by creating a new array  that can be manipulated and updated
  //with filtered countries, it can be used to update the state
  const countriesToDisplay = countries.filter((c) => {
    return c.name.common.toLowerCase().includes(filter.toLowerCase());
  });

  console.log("weather in app.js component", weather);
  return (
    <div className="App">
      <h1>Countries</h1>
      <Search handleFilter={handleFilter} />
      <Display
        countries={countriesToDisplay}
        filter={filter}
        setFilter={setFilter}
        weather={weather}
        setWeather={setWeather}
      />
    </div>
  );
}

export default App;
