import { FormEvent, useCallback } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Todo } from '../types/Todo'

function formToObject(form: HTMLFormElement): {
  [index: string]: string | boolean
} {
  const obj: { [index: string]: string | boolean } = {}

  for (const element of form.elements) {
    const inputElement = element as HTMLInputElement
    obj[inputElement.name] =
      inputElement.type === 'checkbox'
        ? inputElement.checked
        : inputElement.value
  }

  return obj
}

type TodoFormProps = {
  todo?: Todo
}

export default function TodoForm({ todo }: TodoFormProps) {
  const navigate = useNavigate()

  const save = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const newTodo = formToObject(e.currentTarget) as Todo

      let response
      if (todo === undefined) {
        response = await fetch(`http://localhost:4000/todos/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTodo),
        })
      } else {
        response = await fetch(`http://localhost:4000/todos/${todo._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTodo),
        })
      }

      if (!response.ok) {
        throw new Error(response.statusText)
      }
      navigate('/')
    },
    [navigate, todo]
  )

  const doDelete = useCallback(async () => {
    if (todo === undefined) {
      navigate('/')
      return
    }

    const response = await fetch(`http://localhost:4000/todos/${todo._id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error(response.statusText)
    }

    navigate('/')
  }, [navigate, todo])

  return (
    <main>
      <h1 className="mb-3">Todo</h1>
      <Form onSubmit={save}>
        <Form.Group className="mb-3">
          <Form.Label>Summary</Form.Label>
          <Form.Control name="summary" defaultValue={todo?.summary} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Details</Form.Label>
          <Form.Control
            name="details"
            defaultValue={todo?.details}
            as="textarea"
          />
        </Form.Group>
        <Form.Check
          label="Done"
          name="done"
          defaultChecked={todo?.done}
          className="mb-3"
        />
        <div className="d-flex gap-1">
          <Link to="/" className="btn btn-secondary">
            Cancel
          </Link>
          <Button variant="primary" type="submit">
            Save
          </Button>
          {todo && (
            <Button variant="danger" onClick={doDelete} className="ms-auto">
              Delete
            </Button>
          )}
        </div>
      </Form>
    </main>
  )
}
