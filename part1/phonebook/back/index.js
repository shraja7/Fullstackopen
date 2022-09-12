const { response } = require("express");
const express = require("express");
const app = express();
const morgan = require('morgan')
morgan('tiny')

//create custom morgan token
morgan.token('body', req => {
  return JSON.stringify(req.body)
})
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
app.use(morgan(':method :url :body'))


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
//add funcitonality so that new phonebook entries can be added by making post requests
app.post('/api/persons',(request, response)=>{
  // Implement error handling for creating new entries. The request is not allowed to succeed, if:

  //   The name or number is missing --DONE
  //   The name already exists in the phonebook --DONE

  const body = request.body


  const alreadyExists = persons.find(person => person.name === body.name)
  console.log(alreadyExists);
  if(alreadyExists){
    return response.status(400).json({
      error: 'person already exists in the phonebook'
    })
  }

  if(!body.name || !body.number){
    return response.status(400).json({
      error: 'name or number missing'
    })
  }


  let idGenerator = Math.floor(Math.random()* 100)

  const person ={
    id: idGenerator,
    name: body.name,
    number: body.number
    
  }

  persons = persons.concat(person)


  response.json(person)
  

})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
