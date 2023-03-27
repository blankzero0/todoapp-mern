import express, { Response } from 'express'
import { STATUS_CODES } from 'http'
import { isTodo, Todo, TodoModel } from '../models/Todo'

const router = express.Router()

router.get('/', (req, res: Response<Todo[]>, next) => {
  TodoModel.find()
    .then((todos) => {
      res.status(200).json(todos)
    })
    .catch(next)
})

router.post('/', (req, res: Response<never>, next) => {
  const todo = req.body
  if (!isTodo(todo)) {
    return res.status(400).end()
  }

  const todoModel = new TodoModel(todo)
  todoModel
    .save()
    .then(() => {
      res.status(201).end()
    })
    .catch(next)
})

router.get('/:id', (req, res: Response<Todo>, next) => {
  TodoModel.findById(req.params.id)
    .then((todo) => {
      if (todo === null) {
        return res.status(404).end()
      }

      res.status(200).json(todo)
    })
    .catch(next)
})

router.put('/:id', (req, res: Response<never>, next) => {
  const todo = req.body
  if (!isTodo(todo)) {
    return res.status(400).end()
  }

  TodoModel.replaceOne({ _id: req.params.id }, todo)
    .then((result) => {
      if (result.matchedCount === 0) {
        return res.status(404).end()
      }

      res.status(204).end()
    })
    .catch(next)
})

router.delete('/:id', (req, res: Response<never>, next) => {
  TodoModel.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).end()
      }

      res.status(204).end()
    })
    .catch(next)
})

router.put('/:id/done', (req, res: Response<never>, next) => {
  const done = req.body
  if (typeof done !== 'boolean') {
    return res.status(400).end()
  }

  TodoModel.updateOne(
    { _id: req.params.id },
    {
      $set: {
        done,
      },
    }
  )
    .then((result) => {
      if (result.matchedCount === 0) {
        return res.status(404).end()
      }

      res.status(204).end()
    })
    .catch(next)
})

export default router
