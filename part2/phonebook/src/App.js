import React, { useState, useEffect } from "react";
import axios from "axios"
import personService from "./services";

const Notification = ({message}) => {
    return message == ""? "" : (
        <div className="message">
            {message}
        </div>
    )
}

const PersonsList = ({persons, handleDelete}) => {
    return(
        <>
        {persons.length > 0? persons.map((person) => {
            return (
                <li key={person.name}>
                    {person.name} - {person.number} <button onClick={(e)=>handleDelete(person.id)}>delete</button>
                </li>
            );
        }) : null}
        </>
    )
}

const Form = ({addPerson, newName, nameChangeHandler, newNumber, numberChangeHandler}) => {
    return (
        <form onSubmit={addPerson}>
                <div>
                    name:{" "}
                    <input
                        value={newName}
                        onChange={(e) => nameChangeHandler(e)}
                        required
                    />
                    <div>
                        number:{" "}
                        <input
                            type="number"
                            value={newNumber}
                            onChange={numberChangeHandler}
                            required
                        />
                    </div>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
    )
}

const Filter = ({ persons, searchValue, searchChange }) => {
    return (
        <>
            <input
                type="text"
                value={searchValue}
                onChange={searchChange}
            ></input>
            {searchValue.length > 0
                ? persons
                      .filter((person) => {
                          return (
                              person.name
                                  .toLowerCase()
                                  .indexOf(searchValue.toLowerCase()) >= 0
                          );
                      })
                      .map((item) => (
                          <li key={item.name}>
                              {" "}
                              {item.name} - {item.number}{" "}
                          </li>
                      ))
                : ""}
        </>
    );
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [message, setMessage] = useState("");

    useEffect(()=>{
        personService.getPersons()
        .then(response=>setPersons(response))
    },[])

    const searchChange = (e) => {
        setSearchValue(e.target.value);
    };
    const addPerson = (e) => {
        e.preventDefault();
        let checkName = persons.filter((person) => person.name === newName);
        if (checkName.length <= 0) {
            personService.createPerson({
                name: newName, number:newNumber
            })
            .then(response=> {
                setPersons(persons.concat(response))
                setMessage(`${newName} added to DB`)
            })
            
            setNewName("");
            setNewNumber("");
        } else {
            if(window.confirm(`${newName} is already in the phonebook. Do you want to change old number with new one?`)){
                let updatePerson = {name:newName,number:newNumber}
                let {id} = persons.find(person=>person.name==updatePerson.name)
                personService.updatePerson(id, updatePerson)
                .then(updatedPerson=>setPersons(persons.map(person=>person.id !== id? person:updatedPerson)))
            }
        }
    };

    const nameChangeHandler = (e) => {
        e.preventDefault();
        setNewName(e.target.value);
    };

    const numberChangeHandler = (e) => {
        e.preventDefault();
        setNewNumber(e.target.value);
    };

    const handleDelete = (id) => {
        let person = persons.find(person=>person.id == id)
        if(window.confirm(`do you realy want to delete ${person.name}?`)){
            personService.deletePerson(id)
            .then(response => {
                personService.getPersons()
                .then(data => {
                    setPersons(data)
                    setMessage(`${person.name} deleted from DB`)
                })
            })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <h3>Search</h3>
            <Filter persons={persons} searchValue={searchValue} searchChange={searchChange} />
            <h3>Add Person</h3>
            <Notification message={message} />
            <Form addPerson={addPerson} newName={newName} newNumber={newNumber} nameChangeHandler={nameChangeHandler} numberChangeHandler={numberChangeHandler} />
            <h2>Numbers</h2>
            <PersonsList persons={persons} handleDelete={handleDelete} />
            
        </div>
    );
};

export default App;
