const mongoose = require("mongoose");

const {Person} = require("./PersonModel")

if (process.argv.length < 3) {
    console.log(
        "Please provide the password as an argument: node mongo.js <password>"
    );
    process.exit(1);
}

const password = process.argv[2];

if (process.argv.length == 3) {
    const url = `mongodb+srv://sandro:${password}@cluster-sandro.jw71b.mongodb.net/phone-app-db?retryWrites=true&w=majority`; 

    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });

    const connection = mongoose.connection;

    connection.once("open", function () {
        console.log("MongoDB database connection established successfully");
    });

    Person.find({}, (err, data) => {
        console.log(data);
        mongoose.connection.close();
    });

} else {
    const url = `mongodb+srv://sandro:${password}@cluster-sandro.jw71b.mongodb.net/phone-app-db?retryWrites=true&w=majority`;

    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const newPerson = new Person({
        name: process.argv[3],
        number: process.argv[4],
    });
    newPerson.save().then((err, data) => {
        if (err) console.log(err);
        else console.log(data);
        mongoose.connection.close();
    });
}
