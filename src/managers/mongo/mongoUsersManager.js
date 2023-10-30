import { usersModel } from '../../dbs/models/users.model.js'
import BasicManager from './mongoBasicManager.js'

class UsersManager extends BasicManager{

    constructor(){
        super(usersModel)
    }
    
    async findByEmail(email){
        const response = await usersModel.findOne({ email })
        return response
    }
}

const usersManager = new UsersManager()

export default usersManager