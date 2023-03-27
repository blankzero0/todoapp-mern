import { Link } from 'react-router-dom'
import { useFetch } from '../hooks'
import { Todo } from '../types/Todo'
import CenteredSpinner from './CenteredSpinner'
import ListItem from './ListItem'

export default function List() {
  const [todos, refreshTodos] = useFetch<Todo[]>('http://localhost:4000/todos/')

  if (todos === null) {
    return <CenteredSpinner />
  }

  return (
    <main>
      <h1 className="mb-3">Todo App</h1>
      <ul className="p-0">
        {todos.map((todo) => (
          <ListItem key={todo._id} todo={todo} onUpdated={refreshTodos} />
        ))}
      </ul>
      <div>
        <Link to="/add" className="btn btn-primary">
          Add
        </Link>
      </div>
    </main>
  )
}
