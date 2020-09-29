const { request, response } = require("express");
require('dotenv').config()
const express = require("express");
const _ = require("underscore");
const app = express();
const morgan = require("morgan")
const cors = require('cors')
const mongoose = require("mongoose");
const {Person} = require("./models/person")

app.use(express.json());
app.use(cors())
app.use(express.static('build'))


morgan.token('data', req=>{
    if(req.body){
        return JSON.stringify(req.body)
    }
    
})


app.use(morgan(":method :url :response-time :data"))


app.get("/api/persons", (request, response) => {
    
    Person.find({}).then( persons => response.json(persons) )

});

/* app.get("/info", (request, response) => {
    response.send(`Phonebook has info about ${persons.length} people
    <br><br>
    ${new Date()}`);
});

app.get("/api/persons/:id", (request, response) => {
    let id = request.params.id;
    let person = persons.find((p) => p.id == id);
    if (person) {
        response.json(person);
    } else {
        response.status(404).send("404 not found").end();
    }
});

app.delete("/api/persons/:id", (request, response) => {
    let newPersons = persons.filter((p) => p.id != Number(request.params.id));

    if (_.isEqual(persons, newPersons)) {
        response.send("id is not correct");
    } else {
        persons = newPersons;
        response.status(204).send("data was deleted").end();
    }
}); */

app.post("/api/persons", (request, response) => {
    let newPerson = request.body;

    Person.find({}).then(data=>{
        if (data.find((p) => p.name == newPerson.name)) {
            response.json({ error: "name must be unique" });
        } else if (!newPerson.number) {
            response.json({ error: "number must be filled" });
        } else {
            let personToSave = new Person(newPerson)
            personToSave.save().then(data=>{
                response.status(201).json(data);
            })
            
        }
    })


});


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("server running on port:",PORT)
});
