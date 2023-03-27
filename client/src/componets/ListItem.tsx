import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback } from 'react'
import Button from 'react-bootstrap/esm/Button'
import { Link } from 'react-router-dom'
import { Todo } from '../types/Todo'

type ListItemProps = {
  todo: Todo
  onUpdated?: () => void
}

export default function ListItem({ todo, onUpdated }: ListItemProps) {
  const toggleDone = useCallback(async () => {
    const response = await fetch(`http://localhost:4000/todos/${todo._id}/done`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(!todo.done),
    })
    if (!response.ok) {
      throw new Error(response.statusText)
    }

    if (onUpdated) {
      onUpdated()
    }
  }, [todo, onUpdated])

  return (
    <li className="rounded border bg-body-tertiary p-1 mb-3 d-flex align-items-center">
      <p className="my-0 mx-2">
        <Link to={`/todos/${todo._id}`} className="text-decoration-none">
          {todo.summary}
        </Link>
      </p>
      <Button onClick={toggleDone} className="ms-auto btn-square">
        <FontAwesomeIcon
          icon={
            todo.done
              ? icon({ name: 'square-check', style: 'regular' })
              : icon({ name: 'square', style: 'regular' })
          }
          size="xl"
        />
      </Button>
    </li>
  )
}
