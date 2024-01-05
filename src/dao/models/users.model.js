import { Schema, model, SchemaTypes } from 'mongoose'

const usersSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['user', 'admin', 'premium'],
        default: 'user'
    },
    githubAuth:{
        type: Boolean,
        default: false
    },
    usersCart:{
        cart:{
        type: SchemaTypes.ObjectId,
        ref: 'Carts'
        },
        _id: false
    },
    token:{
        type: String,
        default: '0'
    }
})

export const usersModel = model('Users', usersSchema)