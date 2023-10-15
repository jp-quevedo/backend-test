import { productsModel } from '../../dbs/models/products.model.js'
import BasicManager from './mongoBasicManager.js'

class ProductsManager extends BasicManager{
    constructor(){
        super(productsModel)
    }
}

const productsManager = new ProductsManager()

export default productsManager