import mongoose from 'mongoose'

const URI = "mongodb+srv://coderuser:coderpass@codercluster.fg9aj6q.mongodb.net/ecommerce?retryWrites=true&w=majority"

mongoose
    .connect(URI)
    .then(() => console.log('Connected to database'))
    .catch((error) => console.log(error))