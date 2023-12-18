import mongoose from 'mongoose'
import config from './dotenv.config.js'
import { logger } from '../winston.js'

const URI = config.mongo_uri

mongoose
    .connect(URI)
    .then(() => logger.info('Connected to database'))
    .catch((error) => console.log(error))