import { useParams } from 'react-router-dom'
import CenteredSpinner from '../componets/CenteredSpinner'
import TodoForm from '../componets/TodoForm'
import { useFetch } from '../hooks'
import { Todo } from '../types/Todo'

export default function EditRoute() {
  const { id } = useParams()
  const [todo] = useFetch<Todo>(`http://localhost:4000/todos/${id}`)

  if (todo === null) {
    return <CenteredSpinner />
  }

  return <TodoForm todo={todo} />
}
