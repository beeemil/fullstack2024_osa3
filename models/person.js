const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(result => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:',error.message)
  })

const personSchema = new mongoose.Schema({
  name: { type: String,
    unique: true,
    required: true,
    minlength: 3 },
  number: { type: String,
    required: [true,'Number required!'],
    minlength: [8, 'Number too short!'],
    validate: {
      validator: v => /^\d{2,3}-\d{7,8}$/.test(v),
      message: props => `${props.value} is not a valid phone number!`
    },
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