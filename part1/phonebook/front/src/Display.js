import React from "react";

const Filter = ({ persons, filter, deletePerson }) => {
  return (
    <div>
      {persons
        .filter((person) => {
          if (filter === "") {
            return person;
          } else if (person.name.toLowerCase().includes(filter.toLowerCase())) {
            return person;
          }
        })
        .map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person)}>delete</button>
          </li>
        ))}
    </div>
  );
};

export default Filter;
