import usersManager from '../dao/usersManager.js'

export const findAll = () => {
    const users = usersManager.findAll()
    return users
}

export const findById = (_id) => {
    const user = usersManager.findById(_id)
    return user
}

export const deleteOne = (_id) => {
    const deleteResponse = usersManager.deleteOne(_id, req.body)
    return deleteResponse
}

export const updateOne = ({ _id: id }, obj) => {
    const userUpdate = usersManager.updateOne({ _id: id }, obj)
    return userUpdate
}