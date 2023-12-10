import mongoose from 'mongoose'
import config from './dotenv.config.js'

const URI = config.mongo_uri

mongoose
    .connect(URI)
    .then(() => console.log('Connected to database'))
    .catch((error) => console.log(error))