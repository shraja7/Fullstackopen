// //refactor into three compoenents

// //Header component
// const Header = ({ course }) => {
//   return (
//     <div>
//       <h2>{course}</h2>
//     </div>
//   );
// };

// //Content Component
// const Content = ({ parts }) => {
//   return (
//     <div>
//       <Part part={parts[0].name} exercises={parts[0].exercises} />
//       <Part part={parts[1].name} exercises={parts[1].exercises} />
//       <Part part={parts[2].name} exercises={parts[2].exercises} />
//     </div>
//   );
// };

// //Total Component

// const Total = ({ total }) => {
//   return (
//     <div>
//       <p>Total of exercises: {total}</p>
//     </div>
//   );
// };

// //part component
// const Part = ({ part, exercises }) => {
//   return (
//     <div>
//       <p>
//         {part} {exercises}
//       </p>
//     </div>
//   );
// };

// const App = () => {
//   const course = "Half Stack application development";
//   const parts = [
//     {
//       name: "Fundamentals of React",
//       exercises: 10,
//     },
//     {
//       name: "Using props to pass data",
//       exercises: 7,
//     },
//     {
//       name: "State of a component",
//       exercises: 14,
//     },
//   ];

//   return (
//     <div>
//       <Header course={course} />
//       <Content
//         // part1={parts[0].name}
//         // exercise1={parts[0].exercises}
//         // part2={parts[1].name}
//         // exercise2={parts[1].exercises}
//         // part3={parts[2].name}
//         // exercise3={parts[2].exercises}
//         parts={parts}
//       />

//       <Total
//         total={parts[0].exercises + parts[1].exercises + parts[2].exercises}
//       />
//     </div>
//   );
// };

// export default App;

// part 2.1 refactor

//create course component to render one course
import Course from "./Course";
const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
