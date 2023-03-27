import { model, Schema } from 'mongoose'

export type Todo = {
  summary: string
  details: string
  done: boolean
}

export function isTodo(todo: unknown): todo is Todo {
  if (typeof todo !== 'object' || todo === null) return false

  return 'summary' in todo && 'details' in todo && 'done' in todo
}

const TodoSchema = new Schema<Todo>({
  summary: {
    type: String,
    required: true,
    minlength: 1,
  },
  details: String,
  done: Boolean,
})

export const TodoModel = model('Todo', TodoSchema)
