const mongoose = require('mongoose')
const config = require("../utils/config")

const commentSchema = new mongoose.Schema({
  content: String
})

const blogSchema = new mongoose.Schema({
  title: {type:String, required:true},
  author: String,
  url: {type:String, required:true},
  likes: {type:Number,
  default: 0},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [commentSchema]
})

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
  },
});

const Blog = mongoose.model('Blog', blogSchema)

let MONGO_uri = config.MONGO_URI;
if(process.env.NODE_ENV === "test"){
  MONGO_uri = config.MONGO_TEST_URI;
}

mongoose.connect(MONGO_uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(() => console.log("Connected to DB"))
.catch((e) => console.log("Problem connecting to DB", e))

module.exports = Blog