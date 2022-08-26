import React from "react";
import SingleCountry from "./SingleCountry";

const Display = ({ countries, filter }) => {
  return (
    <div>
      {countries.length === 1 ? (
        <SingleCountry countries={countries} />
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
              <p>{country.name.common}</p>
            </div>
          ))
      )}
    </div>
  );
};

export default Display;
