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

    const personsArray = persons.map(e => e.name)
    const personObject = {
      name: newName,
      number: phone
    }
    if (personsArray.includes(`${personObject.name}`)) {
      const oldPerson = persons.filter(e => e.name === newName)
      const _id = oldPerson.map(e => e.id)[0]
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
      if (result) {
        peopleService
          .update(_id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id === returnedPerson.id ? returnedPerson : person))
            setMessage(
              // text: `Edited ${returnedPerson.name}`,
              // type: "success",
              `Number updated successfully for ${returnedPerson.name}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch(error => {
            // setMessage({
            //   text: error.response.data.error,
            //   type: "error"
            // }
            // )
            console.log(`${error.response.data.error}`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
        setNewName('')
        setPhone('')
      }
    } else {
      peopleService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(` ${returnedPerson.name} Added successfully`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
           setMessage(`${error.response.data.error}`) 
          console.log(error.response.data.error)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
      setNewName('')
      setPhone('')
    }
    

    
    
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
