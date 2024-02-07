const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const validateNumber = function(givenNumber) {
  const numberRegex = /^[0-9]{2,3}-[0-9]{5,13}$/
  return numberRegex.test(givenNumber)
}
const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      required: true
    },
    number: {
      type: String,
      validate: {
          validator: validateNumber,
          message: 'Phone number format is invalid. Min 8 letters long and must be like 2/3 numbers then - and then rest of the numbers. Example: 000-11111'
      }
    }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)