require("dotenv").config()

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT
const MONGO_TEST_URI = process.env.MONGO_TEST_URI
module.exports = {
    MONGO_URI,
    PORT,
    MONGO_TEST_URI
}