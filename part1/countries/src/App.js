import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);
  return (
    <div className="App">
      <h1>Counties</h1>
      {countries.map((country) => (
        <div key={country.id}>
          <p>{country.name.common}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
