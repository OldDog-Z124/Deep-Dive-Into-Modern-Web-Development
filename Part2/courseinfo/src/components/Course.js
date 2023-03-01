const Header = ({ name }) => {
  return (
    <h3>{name}</h3>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      <div>
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}
      </div>
      <div>
        <Total parts={parts} />
      </div>
    </div>
    
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce(
    (total, part) => total + part.exercises,
    0
  )
  
  return (
    <p><strong>total of {total} exercises</strong></p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course