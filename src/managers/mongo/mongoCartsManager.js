import { cartsModel } from '../../dbs/models/carts.model.js'
import BasicManager from './mongoBasicManager.js'
import productsManager from './mongoProductsManager.js'


class CartsManager extends BasicManager{
    constructor(){
        super(cartsModel)
    }

    async addProductToCart(id) {
        try {
            const carts = await this.findAll()
            const findCart = carts.findById({ _id: id })
            console.log(findCart)
            if (findCart) {
                const { products } = findCart
                const findProduct = products.findById({ _id: id })
                console.log(findProduct)
                if (findProduct) {
                    products[findProduct].quantity += 1
                } else {
                    const productsArray = await productsManager.findAll({})
                    const newProduct = productsArray.findById({ _id: id })
                    if (newProduct) {
                        products.push({ _id: id, quantity:1 })
                    } else {
                        return 'The product requested does not exist'
                    }
                }                
            } else {
                return 'The cart requested does not exist'
            }
        } catch (error) {
            return error
        }
    }
}

const cartsManager = new CartsManager()

export default cartsManager