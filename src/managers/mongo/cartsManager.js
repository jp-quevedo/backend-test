import { cartsModel } from '../../dbs/models/carts.model.js'
import { productsManager } from './mongo/productsManager.js'
import BasicManager from './basicManager.js'


class CartsManager extends BasicManager{
    constructor(){
        super(cartsModel)
    }

    async addProductToCart(cartId, productId) {
        try {
            const carts = await this.findAll()
            const findCart = carts.find((cart) => cart.id == cartId)
            if (findCart) {
                const { products } = findCart
                const findProductIndex = products.findIndex((product) => product.id == productId)
                if (findProductIndex != -1) {
                    products[findProductIndex].quantity += 1
                } else {
                    const productsArray = await productsManager.findAll({})
                    const newProduct = productsArray.find((product) => product.id == productId)
                    if (newProduct) {
                        products.push({ id:productId, quantity:1 })
                    } else {
                        return 'The product requested does not exist'
                    }
                }
                const newCart = carts.filter((cart) =>
                cart.id === cartId
                ? { id:cartId, products }
                : cart
                )
                await fs.promises.writeFile(this.path, JSON.stringify(newCart))                
            } else {
                return 'The cart requested does not exist'
            }
        } catch (error) {
            return error
        }
    }
}

export const cartsManager = new CartsManager()