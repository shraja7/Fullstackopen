import React from "react";

const Course = ({ courses }) => {
  //the main display component, encompasses all the other components that have the infomration
  //encompasses the course name, the course id, and the parts of the courses and displays them
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    );
  };
  //the header component, displays the course name
  const Header = ({ course }) => {
    return (
      <div>
        <h1>{course.name}</h1>
      </div>
    );
  };

  //the content component, displays the parts of the course along with the number of exercises
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </div>
    );
  };
  //the part component, formatting for each part of the course: name anad exercises
  const Part = ({ part }) => {
    return (
      <div>
        <p>
          {part.name} {part.exercises}
        </p>
      </div>
    );
  };

  //the total component, displays the total number of exercises in the course
  const Total = ({ parts }) => {
    const total = parts.reduce((acc, part) => acc + part.exercises, 0);
    return <h3>Total: {total}</h3>;
  };
  return (
    //the course component,  displays the course name and the parts of the course
    //used map to go through ANY number of courses and pass that information to course component
    <div>
      <h1>Web Development Curriculum</h1>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export default Course;
