import { Schema, model } from 'mongoose'

const ticketsSchema = new Schema({
    code: {
        type: String,
        unique: true,
    },
    purchase_datetime: {
        type: String,
    },
    amount: {
        type: Number,
    },
    purchaser: {
        type: String,
    }
})

export const ticketsModel = model('Tickets', ticketsSchema)