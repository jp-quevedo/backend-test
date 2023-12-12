import { Schema, model, SchemaTypes } from 'mongoose'

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
    role:{
        type: String,
        default: 'user'
    },
    githubAuth:{
        type: Boolean,
        default: false,
    },
    usersCart:{
        cart:{
        type: SchemaTypes.ObjectId,
        ref: 'Carts',
        },
        _id: false
    }
})

export const usersModel = model('Users', usersSchema)