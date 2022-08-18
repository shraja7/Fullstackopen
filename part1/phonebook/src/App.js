import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [phone, setPhone] = useState("121456");
  const [newName, setNewName] = useState(" ");
  const [filter, setFilter] = useState(" ");
  //const [filter, setFilter] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      number: phone,
    };

    setPersons(persons.concat(personObject));
    setNewName(" ");
    setPhone(" ");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  // const namesToShow = filter
  // ? persons
  // : persons.filter(person => person.name === true)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shows with <input onChange={handleFilter} />
      </div>
      <h1>Add New</h1>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          number: <input onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

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
          </li>
        ))}
    </div>
  );
};

export default App;
