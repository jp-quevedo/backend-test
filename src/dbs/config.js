import mongoose from 'mongoose'

const URI = "mongodb+srv://jp-quevedo:Strawhats10.@codercluster.78dr0xy.mongodb.net/ecommerce?retryWrites=true&w=majority"

mongoose
    .connect(URI)
    .then(() => console.log('Connected to database'))
    .catch((error) => console.log(error))