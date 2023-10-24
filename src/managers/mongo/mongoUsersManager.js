import { usersModel } from '../../dbs/models/users.model.js'
import BasicManager from './mongoBasicManager.js'

class UsersManager extends BasicManager{

    constructor(){
        super(usersModel)
    }
    
}

const usersManager = new UsersManager()

export default usersManager