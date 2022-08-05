//refactor into three compoenents

//Header component
const Header = ({ course }) => {
  return (
    <div>
      <h2>{course}</h2>
    </div>
  );
};

//Content Component
const Content = ({ part1, exercise1, part2, exercise2, part3, exercise3 }) => {
  return (
    <div>
      <Part part={part1} exercises={exercise1} />
      <Part part={part2} exercises={exercise2} />
      <Part part={part3} exercises={exercise3} />
    </div>
  );
};

//Total Component

const Total = ({ total }) => {
  return (
    <div>
      <p>Total of exercises: {total}</p>
    </div>
  );
};

//part component
const Part = ({ part, exercises }) => {
  return (
    <div>
      <p>
        {part} {exercises}
      </p>
    </div>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "States of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        exercise1={exercises1}
        part2={part2}
        exercise2={exercises2}
        part3={part3}
        exercise3={exercises3}
      />

      <Total total={exercises1 + exercises2 + exercises3} />
      <h2>Testing</h2>
    </div>
  );
};

export default App;
