import { useState } from "react";
import Display from "./Display";
import Search from "./Search";
import PersonForm from "./PersonForm";

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

  return (
    <div>
      <h2>Phonebook</h2>

      <Search handleFilter={handleFilter} />
      <h1>Add New</h1>

      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />

      <h2>Numbers</h2>

      <Display persons={persons} filter={filter} />
    </div>
  );
};

export default App;
