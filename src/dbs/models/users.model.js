import { Schema, model } from 'mongoose'

const usersSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
})

export const usersModel = model('Users', usersSchema)