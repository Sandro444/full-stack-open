import React from "react"
import Part from "./Part"
const Content = ({ parts }) => {
    const content = parts.map((course) => {
        return (
            <>
                <Part part={course.name} exercises={course.exercises} />
            </>
        );
    });
    return <>{content}</>;
};

export default Content