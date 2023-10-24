import { cartsModel } from '../../dbs/models/carts.model.js'
import BasicManager from './mongoBasicManager.js'

class CartsManager extends BasicManager {

    constructor(){
        super(cartsModel)
    }

    async createCart(obj){
        const newCart = await cartsManager.create(obj)
        return newCart
    }

    async findCartById(id) {
        const cart = await cartsManager
            .findById(id)
            .populate('products', ['title', 'price'])
        return cart
    }

}

const cartsManager = new CartsManager()

export default cartsManager