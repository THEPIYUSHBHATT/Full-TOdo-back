import mongoose from 'mongoose'
export const connectDb = mongoose
  .connect('mongodb://localhost:27017', {
    dbName: 'TODOss',
  })
  .then(() => console.log('Database connected'))
  .catch((e) => console.log(e))
