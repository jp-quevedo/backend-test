import { Schema, model } from 'mongoose'

const cartsSchema = new Schema({
    productsInCart:{
        type: Array,
        default: [],
    },
})

export const cartsModel = model('Carts', cartsSchema)