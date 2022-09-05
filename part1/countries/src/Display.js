import React from "react";

import SingleCountry from "./SingleCountry";

const Display = ({ countries, filter, setFilter, weather, setWeather }) => {
  //

  return (
    <div>
      {countries.length === 1 ? (
        <SingleCountry
          countries={countries}
          weather={weather}
          setWeather={setWeather}
        />
      ) : countries.length > 10 ? (
        <p>Too many</p>
      ) : (
        countries
          .filter((country) => {
            if (
              country.name.common.toLowerCase().includes(filter.toLowerCase())
            ) {
              return country.name.common;
            }
          })
          .map((country) => (
            <div key={country.cca2}>
              <p>
                {country.name.common}
                {/* for the button click to display the country, set the filter to the name of the country that is click by
                the button click event  within in the map function*/}
                <button onClick={() => setFilter(country.name.common)}>
                  show
                </button>
              </p>
            </div>
          ))
      )}
    </div>
  );
};

export default Display;
