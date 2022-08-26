import React from "react";

const SingleCountry = ({ countries }) => {
  return <div>Single Country: {countries[0].name.common}</div>;
};

export default SingleCountry;
