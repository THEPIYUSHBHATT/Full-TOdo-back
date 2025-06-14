import { User } from '../models/userModel.js'
import bcrypt from 'bcrypt'

import { sendCookie } from '../utils/features.js'

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if (!user) return next(new ErrorHandler('Invalid email or password', 400))

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch)
      return next(new ErrorHandler('Invalid email or password', 401))

    sendCookie(user, res, `Welcome back ${user.name}`, 200)
  } catch (error) {
    next(error)
  }
}

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    let user = await User.findOne({ email })

    if (user) return next(new ErrorHandler('User already Exist', 400))

    const hashedPassword = await bcrypt.hash(password, 10)

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    sendCookie(user, res, 'Registered Successfully', 201)
  } catch (error) {
    next(error)
  }
}

export const getmydetails = (req, res) => {
  res.status(200).json({
    sucess: true,
    user: req.user,
  })
}

export const logout = (req, res) => {
  res
    .status(200)
    .cookie('token', '', {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === 'Development' ? 'lax' : 'none',
      secure: process.env.NODE_ENV === 'Development' ? false : true,
    })
    .json({
      sucess: true,
      user: req.user,
    })
}
