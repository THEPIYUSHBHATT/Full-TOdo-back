import {app} from './app.js';

import {connectDb} from './data/database.js'
// connectDb();

app.listen(4000, () => {
  console.log(`Server is Working on port:${process.env.PORT} in ${process.env.NODE_ENV} mode `)
})
  