import React, { useState } from "react";

const PersonsList = ({persons}) => {
    return(
        <>
        {persons.map((person) => {
            return (
                <li key={person.name}>
                    {" "}
                    {person.name} - {person.number}{" "}
                </li>
            );
        })}
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
                    />
                    <div>
                        number:{" "}
                        <input
                            type="number"
                            value={newNumber}
                            onChange={numberChangeHandler}
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
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: 555999222 },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [searchValue, setSearchValue] = useState("");

    const searchChange = (e) => {
        setSearchValue(e.target.value);
    };
    const addPerson = (e) => {
        e.preventDefault();
        let checkName = persons.filter((person) => person.name === newName);
        if (checkName.length <= 0) {
            setPersons(persons.concat({ name: newName, number: newNumber }));
            setNewName("");
            setNewNumber("");
        } else {
            alert(`${newName} is already in the phonebook`);
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

    return (
        <div>
            <h2>Phonebook</h2>

            <h3>Search</h3>
            <Filter persons={persons} searchValue={searchValue} searchChange={searchChange} />
            <h3>Add Person</h3>
            <Form addPerson={addPerson} newName={newName} newNumber={newNumber} nameChangeHandler={nameChangeHandler} numberChangeHandler={numberChangeHandler} />
            <h2>Numbers</h2>
            <PersonsList persons={persons} />
            
        </div>
    );
};

export default App;
