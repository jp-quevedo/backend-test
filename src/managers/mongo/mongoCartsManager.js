import { cartsModel } from '../../dbs/models/carts.model.js'
import BasicManager from './mongoBasicManager.js'
import productsManager from './mongoProductsManager.js'

class CartsManager extends BasicManager{
    constructor(){
        super(cartsModel)
    }

    async addProductToCart(cartObj, productsInCart) {
        try {
            const cart = await this.findById(cartObj)
            console.log(cart)
            const productIdIn = cart.productsInCart
            console.log(productIdIn)
            const products = await productsManager.findAll()
            console.log(products)
        } catch (error) {
            return error
        }
    }
}

const cartsManager = new CartsManager()

export default cartsManager