import ErrorHandler from '../middlewares/error.js'
import { Task } from '../models/task.js'
export const newtask = async (req, res, next) => {
 try {
  const { title, description } = req.body

  await Task.create({
    title,
    description,
    user: req.user,
  })

  res.status(201).json({
    success: true,
    message: 'Task added Sucessfully',
  })
 } catch (error) {
  next(error)
 }
}

export const getMytask = async (req, res, next) => {
 try {
  const userID = req.user._id

  const task = await Task.find({ user: userID })

  res.status(200).json({
    sucess: true,
    task,
  })
 } catch (error) {
  next(error)
 }
}

export const updateMytask = async (req, res, next) => {
 try {
  const { id } = req.params
  const task = await Task.findById(id)
  if (!task) return next(new ErrorHandler('Task not found', 404))
  task.isCompleted = !task.isCompleted
  await task.save()
  res.status(200).json({
    sucess: true,
  })
 } catch (error) {
  next(error)
 }
}

export const deleteMytask = async (req, res, next) => {
  try {
    const { id } = req.params
    const task = await Task.findById(id)
    if (!task) return next(new ErrorHandler('Task not found', 404))
    await task.deleteOne()
    res.status(200).json({
      sucess: true,
    })
  } catch (error) {
    next(error)
  }
}
