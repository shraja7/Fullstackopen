import React from "react";

const SingleCountry = ({ countries }) => {
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
      {/* p tag with 100px height and width */}

      <p>{countries[0].flag}</p>
    </div>
  );
};

export default SingleCountry;
