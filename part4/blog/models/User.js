const mongoose = require('mongoose')
const config = require("../utils/config")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
  username: {type:String, required:true, unique:true},
  name: String,
  password: String
})
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
  },
});

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

let MONGO_uri = config.MONGO_URI;
if(process.env.NODE_ENV === "test"){
  MONGO_uri = config.MONGO_TEST_URI;
}

mongoose.connect(MONGO_uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(() => console.log("Connected to DB: user"))
.catch((e) => console.log("Problem connecting to DB", e))

module.exports = User