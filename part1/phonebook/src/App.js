import { useState, useEffect } from "react";
import Display from "./Display";
import Search from "./Search";
import PersonForm from "./PersonForm";
import axios from "axios";
import peopleService from "./services/people";

const App = () => {
  const [persons, setPersons] = useState([
    // { name: "Arto Hellas", number: "040-123456", id: 1 },
    // { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    // { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    // { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [phone, setPhone] = useState("");
  const [newName, setNewName] = useState(" ");
  const [filter, setFilter] = useState("");
  //const [filter, setFilter] = useState(true);

  useEffect(() => {
    // console.log("effect");
    // axios.get("http://localhost:3001/persons").then((response) => {
    //   console.log("promise fulfilled");
    //   setPersons(response.data);
    // });
    peopleService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
    console.log("persons", persons);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      //change the existing persons phone number
      peopleService.update();

      return;
    }

    const personObject = {
      name: newName,
      number: phone,
    };
    //add new person to backend
    // axios
    //   .post("http://localhost:3001/persons", personObject)
    //   .then((response) => {
    //     console.log("response");
    //   });

    //new way with extrached module
    peopleService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
    });
    setNewName(" ");
    setPhone(" ");
  };

  //delete person from phonebook
  const deletePerson = (person) => {
    console.log("when button clicked PERSON", person);

    peopleService.remove(person.id).then(() => {
      setPersons(persons.filter((item) => item.id !== person.id));
    });
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
        name={newName}
        phone={phone}
      />

      <h2>Numbers</h2>

      <Display persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
