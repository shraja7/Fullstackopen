import React, { useEffect } from "react";
import axios from "axios";
const SingleCountry = ({ countries, weather, setWeather }) => {
  //fetch weather for a single country using axios and the api
  console.log("country latlng", countries[0].latlng);
  console.log("country lat", countries[0].latlng[0]);
  console.log("country long", countries[0].latlng[1]);
  useEffect(() => {
    let lat = countries[0].latlng[0];
    let long = countries[0].latlng[1];
    axios
      .get(
        `  https://api.pirateweather.net/forecast/MsZAdHvS7s7CQoUZIhJJj2dWClcycynk4E7n5ZBF/${lat},${long}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

  if (!weather) return null;

  console.log("weather is set", weather);
  console.log("weather currently", weather.currently);
  console.log("currently.temperature", weather.currently.temperature);

  return (
    <div>
      <h1> {countries[0].name.common}</h1>
      <h2>Capital: {countries[0].capital}</h2>
      <h4>Area: {countries[0].area}</h4>
      <h3>
        {/* iterate over an object */}
        Languages:
        {Object.values(countries[0].languages).map((language) => (
          <p key={language}>{language}</p>
        ))}
      </h3>
      <p>{countries[0].flag}</p>
      <h2>Weather in {countries[0].capital}</h2>
      {/* display the weather using map */}

      {weather && <p>{weather.currently.temperature}</p>}
      <p>Temperature: {weather.currently.temperature} °C</p>
      <p> Summary: {weather.currently.icon}</p>
      <p> Wind Speed: {weather.currently.windSpeed}</p>
    </div>
  );
};

export default SingleCountry;
