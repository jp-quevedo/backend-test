import { Schema, model } from 'mongoose'

const cartsSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
})

export const cartsModel = model('Carts', cartsSchema)