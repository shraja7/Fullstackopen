import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Search from "./Search";
import Display from "./Display";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  const handleFilter = (e) => {
    console.log(e.target.value);

    setFilter(e.target.value);
  };

  return (
    <div className="App">
      <h1>Countries</h1>
      <Search handleFilter={handleFilter} />

      {/* {countries.length > 10 ? (
        <p>Too many matches, specify another fitler</p>
      ) : (
        countries.map((country) => (
          <div key={country.id}>
            <p>{country.name.common}</p>
          </div>
        ))
      )} */}
      <Display countries={countries} filter={filter} />
    </div>
  );
}

export default App;
