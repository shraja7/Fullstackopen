import React from "react";

const Course = ({ course }) => {
  const Header = ({ name }) => {
    return <h1>{name}</h1>;
  };

  const Content = ({ parts }) => {
    // return (
    //   <div>
    //     <Part part={parts[0].name} exercises={parts[0].exercises} />
    //     <Part part={parts[1].name} exercises={parts[1].exercises} />
    //     <Part part={parts[2].name} exercises={parts[2].exercises} />
    //   </div>
    // );

    return parts.map((part) => (
      <Part key={part.id} part={part.name} exercises={part.exercises} />
    ));
  };

  const Part = ({ part, exercises }) => {
    return (
      <div>
        <p>
          {part} {exercises}
        </p>
      </div>
    );
  };

  const Total = ({ parts }) => {
    return (
      <h3>
        Total of {parts.reduce((sum, part) => sum + part.exercises, 0)}{" "}
        exercises
      </h3>
    );
  };

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
