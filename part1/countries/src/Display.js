import React from "react";

const Display = ({ countries, filter }) => {
  return (
    <div>
      {filter === "" ? (
        <p>Too many matches, specify another filter</p>
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
