
require('dotenv').config()
const express = require("express");
const morgan = require('morgan');
const cors = require('cors')
const app = express();
const Person = require('./models/person')


app.use(express.static("build"))
app.use(express.json())
app.use(cors())







// const person = require("./models/person");
morgan('tiny')


//create custom morgan token
morgan.token('body', req => {
  return JSON.stringify(req.body)
})




app.use(morgan(':method :url :body'))


app.get("/api/persons", (req, res) => {
 Person.find({}).then(p => {
  res.json(p)
 })
});

app.get("/api/persons/info", (req, res) => {
  
  Person.find({}).then(p => {
   res.send(`Phonebook has ${p.length} entries
   <p> ${Date()}</p>`)
  })
 });
//funcitonality for displaying information for a single person entry
app.get("/api/persons/:id", (request, response) => {
  // const id = Number(request.params.id);
  // const person = persons.find((p) => p.id === id);
Person.findById(request.params.id).then(p =>{
  response.json(p)
}).then(p => {
  if(p){
    response.json(p)
  }else{
    response.status(404).end()
  }
}).catch(error => next(error))
  // if (person) {
  //   response.json(person);
  // } else {
  //   response.status(404).end();
  // }
});
//info route to display information of the backend

//funcitonality for deleting a specific person based on ID
app.delete("/api/persons/:id", (request, response,next)=>{


  Person.findByIdAndRemove(request.params.id)
  .then(() =>{
    response.status(204).end()
  }).catch(error => next(error))

})
//add funcitonality so that new phonebook entries can be added by making post requests
app.post('/api/persons',(request, response)=>{
  // Implement error handling for creating new entries. The request is not allowed to succeed, if:

  //   The name or number is missing --DONE
  //   The name already exists in the phonebook --DONE

  const body = request.body

//check if person already exists
  // const alreadyExists = persons.find(person => person.name === body.name)
  // console.log(alreadyExists);
  // if(alreadyExists){
  //   return response.status(400).json({
  //     error: 'person already exists in the phonebook'
  //   })
  // }

  if(!body.name || !body.number){
    return response.status(400).json({
      error: 'name or number missing'
    })
  }




const person = new Person({
  name: body.name,
  number: body.number
})
  // persons = persons.concat(person)


  // response.json(person)
  person.save().then(savedPerson =>{
    response.json(savedPerson)
  })

})
//If the user tries to create a new phonebook 
//entry for a person whose name is already in the phonebook, the frontend 
//will try to update the phone number of the existing entry by 
//making an HTTP PUT request to the entry's unique URL.
app.put('/api/persons/:id', (request, response, next)=>{
  
const body = request.body
const person = {
  name: body.name,
  number: body.number,
}



  Person.findByIdAndUpdate(request.params.id, person, {new: true})
  .then(updatedPerson =>{
    response.json(updatedPerson)
  }).catch(error => next(error))
})

//error handler
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Invalid id format' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
