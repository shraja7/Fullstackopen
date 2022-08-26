import React from "react";

const Search = ({ handleFilter }) => {
  return (
    <div>
      find countries <input onChange={handleFilter} />
    </div>
  );
};

export default Search;
