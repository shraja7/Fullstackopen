const mongoose = require('mongoose')


const url = process.env.MONGODB_URI

console.log('connecting to', url)

//connect to mongoDB
mongoose.connect(url )
  .then(() => {
        console.log('connected to MongoDB')  })  
        .catch((error) => {    console.log('error connecting to MongoDB:', error.message) 
     })

     const personSchema = new mongoose.Schema({
      name: { type: String, required: true,  minLength: [3, 'Name must have atleast 3 characters'] },
      // number: { type: String, required: true,  minLength: [8, 'Number must have atleast 8 characters'] },
      number: {
        type: String, 
        validate: {
          validator: function(v){
            return /\d{3}-\d{3}-\d{4}/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
      
      }
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