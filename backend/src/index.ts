import app from './app.js'
import { config } from 'dotenv'
import { connectToDatabase } from './db/connection.js'

config()
const port = process.env.PORT || 8000

connectToDatabase().then(() => {
  app.listen(port, () => console.log('Server is running on port ' + port))
}).catch(err => console.log(err))
