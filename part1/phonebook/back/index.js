const { response } = require("express");
const express = require("express");
const app = express();

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  {
    id: 5,
    name: "Joe Blow",
    number: '8989898'
  },
  {
    id: 6,
    name: "Li Blow",
    number: '1561561'
  }
];

app.use(express.json());

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(
    `Phone book has infor for ${persons.length} people 
    
    <div>${new Date()}</div> `
  );
});

//funcitonality for displaying information for a single phone entry
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});
//funcitonality for deleting a specific person based on ID
app.delete("/api/persons/:id", (request, response)=>{
  const idNum = Number(request.params.id)
 
  //filter: set new array that contains ids THAT DONT MATCH the persons ID, so a copy without the matching ID
  //persons before filter
  console.log(persons)
  console.log('success deleting')
   persons = persons.filter(person => person.id !== idNum)
//persons after filter
// console.log(persons)
  response.status(204).end()

})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
