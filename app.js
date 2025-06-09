import express from 'express'
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './middlewares/error.js'
import cors from 'cors'

export const app = express()

config({
  path: './data/config.env',
})

// Using middlewares
app.use(express.json())
app.use(cookieParser())

// Configure CORS
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL, // e.g., http://localhost:5173 or your deployed frontend URL
      'http://localhost:5174/', // Explicitly allow localhost:5174 for development
    ].filter(Boolean), // Remove falsy values (e.g., undefined FRONTEND_URL)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS for preflight requests
    credentials: true, // Allow cookies and credentials
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  })
)

// Using routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/task', taskRouter)

// Error middleware (must be after routes)
app.use(errorMiddleware)
