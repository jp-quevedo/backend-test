import { Schema, SchemaTypes, model } from 'mongoose'

const cartsSchema = new Schema({
    productsInCart: [{
        product: {
            type: SchemaTypes.ObjectId,
            ref: 'Products'
        },
        quantity: {
            type: Number,
        }
    }]
})

export const cartsModel = model('Carts', cartsSchema)