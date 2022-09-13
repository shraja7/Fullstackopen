const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

//take in arguments from CommandLine name and phone number
//name
const name = process.argv[3]
console.log('name:', name)

//phone
const phone = process.argv[4]
console.log('phone:', phone)

const url = `mongodb+srv://shraja7:${password}@cluster0.1fwynkb.mongodb.net/?retryWrites=true&w=majority`

// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// })
const personSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    
  })
  
const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const person = new Person({
        name: name,
    phone: phone
    
    })

    return person.save()
  })
  .then(() => {
    console.log(`addd ${name} number ${phone} to phonebook`)
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))