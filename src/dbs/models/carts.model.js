import { Schema, model } from 'mongoose'

const cartsSchema = new Schema({
    products:{
        type: Array,
        default: [],
    },
})

export const cartsModel = model('Carts', cartsSchema)