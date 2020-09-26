import React from "react"

const Total = ({ parts }) => {
    let allExercises = parts.reduce(
        (sum, current) => (sum += current.exercises),
        0
    );

    return (
        <p>
            <b>Number of exercises {allExercises} </b>
        </p>
    );
};

export default Total