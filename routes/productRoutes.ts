import express from 'express'
import { addProduct, getProducts } from '../controllers/productController'
import validateToken from '../middleware/validateToken'


let router=express.Router()

router.post('/product/add',validateToken,addProduct)
router.get('/products/get',getProducts)

console.log("update")

export default router
