import React from "react";

const Course = ({ courses }) => {
  //the main display component, encompasses all the other components that have the infomration
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    );
  };
  const Header = ({ course }) => {
    return (
      <div>
        <h1>{course.name}</h1>
      </div>
    );
  };

  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </div>
    );
  };
  const Part = ({ part }) => {
    return (
      <div>
        <p>
          {part.name} {part.exercises}
        </p>
      </div>
    );
  };

  const Total = ({ parts }) => {
    const total = parts.reduce((acc, part) => acc + part.exercises, 0);
    return <h3>Total: {total}</h3>;
  };
  return (
    <div>
      <h1>Web Development Curriculum</h1>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export default Course;
