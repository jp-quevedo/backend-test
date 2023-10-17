import { cartsModel } from '../../dbs/models/carts.model.js'
import BasicManager from './mongoBasicManager.js'

class CartsManager extends BasicManager{
    constructor(){
        super(cartsModel)
    }
}

const cartsManager = new CartsManager()

export default cartsManager