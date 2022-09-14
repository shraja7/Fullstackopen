const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

//connect to mongoDB
mongoose.connect(url)
  .then(result => {
        console.log('connected to MongoDB')  })  
        .catch((error) => {    console.log('error connecting to MongoDB:', error.message) 
     })

const personSchema = new mongoose.Schema({
        name: String,
        phone: Number,
        
      })
      //modify schema to return a certain way
      //Even though the _id property of Mongoose objects looks like a string, it is in fact an object.
 personSchema.set('toJSON', {
        transform: (document, returnedObject) => {
          returnedObject.id = returnedObject._id.toString()
          delete returnedObject._id
          delete returnedObject.__v
        }
      })

module.exports = mongoose.model('Person', personSchema)