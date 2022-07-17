const Header = ({ course }) => <h2>{course.name}</h2>

const Total = ({ parts }) => {
   return (
      <p><strong>
         total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
      </strong></p>
   )
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) =>
   <>
      {parts.map((part) => <Part key={part.id} part={part} />)}
   </>

const Course = ({ course }) => {
   return (
      <>
         <Header course={course} />
         <Content parts={course.parts} />
         <Total parts={course.parts} />
      </>
   )
}

export default Course