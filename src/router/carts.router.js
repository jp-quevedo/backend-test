import { Router } from 'express';
import { cartsManager } from '../CartManager.js';
import { productsManager } from '../ProductManager.js';

const router = Router()

router.get('/',async(req,res)=>{
    try{
        const carts = await cartsManager.getCarts(req.query)
        if(!carts.length){
            res.status(200).json({message:'Could not find any carts'})
        }else{
            res.status(200).json({message:'Carts found',carts})
        }
    }catch(error){
        res.status(500).json({message:error})
    }
})

router.get('/:cartId',async(req,res)=>{
    res.status(200).json({message:'Cart created',cart:newCart})
    const {cartId} = req.params
    try{
        const cart = await cartsManager.getCartById(+cartId)
        if(!cart){
            res.status(400).json({message:'Could not find any cart with the id sent'})
        }else{
            res.status(200).json({message:'Cart found',cart})
        }
    } catch(error){
        res.status(500).json({message: error})
    }
})

router.post('/',async(req,res)=>{
    const {products, quantity} = req.body;
    if(!products || !quantity){
        return res.status(400).json({message:'Some data is missing'});
    }
    try{
        const newCart = await cartsManager.createCart(req.body)
        res.status(200).json({message:'Cart created',cart:newCart})
    }catch(error){
        res.status(500).json({message:error})
    }
})

router.post('/:cartId/products/:productId',async(req,res)=>{
        const {cartId} = req.params
        const {productId} = req.params
    try{
        const cart = await cartsManager.getCartById(+cartId)
        const product = await productsManager.getProductById(+productId)
        if(!cart || !product){
            res.status(400).json({message:'Could not find any cart or product with the ids sent'})
        }else{
            res.status(200).json({message:'The following product was added to the cart',product})
        }
    }catch(error){
        res.status(500).json({message:error})
    }
})

router.delete('/:cartId',async(req,res)=>{
    const {cartId} = req.params
    try{
        const response = await cartsManager.deleteCart(+cartId,req.body)
        if(response===-1){
            res.status(400).json({message:'Could not find any cart with the id sent'})
        }else{
            res.status(200).json({message:'Cart deleted'})
        }
    }catch(error){
        res.status(500).json({message:error})
    }
})

router.put('/:cartId',async(req,res)=>{
    const {cartId} = req.params
    try{
        const response = await cartsManager.updateCart(+cartId,req.body)
        if(!response){
            res.status(200).json({message:'Cart updated'})
        }else{
            res.status(400).json({message:'Could not find any cart with the id sent'})
        }
    }catch(error){
        res.status(500).json({message:error})
    }
})

export default router 