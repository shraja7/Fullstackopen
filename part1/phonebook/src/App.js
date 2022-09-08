import { useState, useEffect } from "react";
import Display from "./Display";
import Search from "./Search";
import PersonForm from "./PersonForm";
import Notification from "./Notification";
import axios from "axios";
import peopleService from "./services/people";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [phone, setPhone] = useState("");
  const [newName, setNewName] = useState(" ");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
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
      //if matching person
      //save person in a variable
      const singlePerson = persons.filter((person) => person.name === newName);
      console.log("singlePerson", singlePerson);
      //person to update
      const personToUpdate = singlePerson[0];
      console.log("person is", personToUpdate);
      //updated person object
      const updatedPerson = { ...personToUpdate, number: phone };
      console.log("updatedPerson", updatedPerson);

      if (
        window.confirm(
          `${newName} is already added to phonebook, replace with new number? `
        )
      ) {
        //logic to update the number of the person wiht new number
        peopleService
          .update(updatedPerson.id, updatedPerson)
          .then((returnedPerson) => {
            console.log(`${returnedPerson.name} successfully updated`);
            const oldPersons = [...persons];
            console.log("returned person", returnedPerson);

            setPersons(
              oldPersons.map((person) =>
                person.id !== updatedPerson.id ? person : returnedPerson
              )
            );
            setMessage(`Number updated successfully for ${updatedPerson.name}`);
            setTimeout(() => {
              setMessage(null);
            }, 3000);

            setNewName("");
            setPhone("");
          });
        alert("number updated");
      }

      return;
    }
    //if a person doens't exist add them to the phonebook
    //if a person is already in phonebook, confirm that they want name changed
    //if confirm comes back true
    //change the existing persons phone number
    //else if confirm comes back false
    //then just return  and do nothing
    //
    const personObject = {
      name: newName,
      number: phone,
    };

    //new way with extrached module
    peopleService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setMessage(`Added ${personObject.name}`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
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
      <Notification message={message} />

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
