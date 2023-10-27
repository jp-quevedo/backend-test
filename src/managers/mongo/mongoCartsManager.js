import { cartsModel } from '../../dbs/models/carts.model.js'
import BasicManager from './mongoBasicManager.js'

class CartsManager extends BasicManager {

    constructor(){
        super(cartsModel)
    }

    async findCartById(id) {
        const cart = await cartsModel
            .findById({ _id: id })
            .populate('productsInCart.product', ['title', 'price'])
        return cart
    }

}

const cartsManager = new CartsManager()

export default cartsManager