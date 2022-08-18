import React from "react";

const Search = ({ handleFilter }) => {
  return (
    <div>
      filter shows with <input onChange={handleFilter} />
    </div>
  );
};

export default Search;
