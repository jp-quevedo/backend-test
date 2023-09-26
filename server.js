import express from 'express';
import { productsManager } from './ProductManager.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

/*
const products = [
    {
        id: 1,
        name: 'a'
    },
    {
        id: 2,
        name: 'b'
    },
    {
        id: 3,
        name: 'c'
    }
]

app.get('/products',(req,res)=>{
    console.log('query',req.query)
    const {name,sort} = req.query
    if(name){
        const product = products.find(p=p.name===name)
        res.json({message:'Product',product})
    }
    const productsArray = 
        sort==='ASC'
            ? products.sort((a,b)=>a.name.localeCompare(b.name))
            : products.sort((a,b)=>b.name.localeCompare(a.name))
    res.json({message:'Todos los productos',products})
})

app.get('/products/:productId',(req,res)=>{
    const {productId} = req.params
    const product = products.find(p=>p.id === +productId)
    console.log(product)
    res.json({message:'Producto',product})
})
*/

app.get('/products',async(req,res)=>{
    try {
        const products = await productsManager.getProducts(req.query)
        if(!products.length){
            res.status(200).json({message:'Could not find any products'})
        } else {
            res.status(200).json({message:'Products found',products})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
})

app.get('/products/:productId',async(req,res)=>{
    const {productId} = req.params
    try {
        const product = await productsManager.getProductById(+productId)
        if(!product){
            res.status(400).json({message:'Could not find any product with the id sent'})
        } else {
            res.status(200).json({message:'Product found',product})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
})

app.post('/products',async(req,res)=>{
    try {
        const newProduct = await productsManager.createProduct(req.body)
        res.status(200).json({message:'Product created',product:newProduct})
    } catch (error) {
        res.status(500).json({message: error})
    }
})

app.delete('/products/:productId',async(req,res)=>{
    const {productId} = req.params
    try {
        const response = await productsManager.deleteProduct(+productId,req.body)
        if(response===-1){
            res.status(400).json({message:'Could not find any product with the id sent'})
        } else {
            res.status(200).json({message:'Product deleted'})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
})

app.put('/products/:productId',async(req,res)=>{
    const {productId} = req.params
    try {
        const response = await productsManager.updateProduct(+productId,req.body)
        if(!response){
            res.status(200).json({message:'Product updated'})
        } else {
            res.status(400).json({message:'Could not find any product with the id sent'})

        }
    } catch (error) {
        res.status(500).json({message: error})
    }
})

app.listen(8080,()=>{
    console.log('Escuchando al puerto 8080 con Express')
})

