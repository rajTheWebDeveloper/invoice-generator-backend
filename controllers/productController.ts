import express,{Request,Response,NextFunction} from 'express'
import Product from '../models/productModel'



interface AddRequestBody
{
    productName:string
    productQuantity:number
    productRate:number
}


const addProduct=async (req:Request<{},{},AddRequestBody>,res:Response,next:NextFunction)=>
{
    const {productName,productQuantity,productRate}=req.body;
    let foundProduct=await Product.findOne({
        productName:productName
    })
    
    if(!foundProduct)
    {
        let addedProduct=await Product.create({
            productName:productName,
            productQuantity:productQuantity,
            productRate:productRate
        })
        return res.status(200).json({
            success:true,
            message:"Product Added Successfully",
            data:addedProduct
        })
    }
    if(foundProduct)
    {
        return res.status(200).json({
            success:true,
            message:"Product already exists",
            data:[]
        })
    }
    return res.status(200).json({
        success:false,
        message:"Error Adding Product",
        data:foundProduct
    })

}


const getProducts=async (req:Request<{},{},AddRequestBody>,res:Response,next:NextFunction)=>
{
    let foundProducts=await Product.find({ })

    return res.status(200).json({
        success:true,
        data:foundProducts
    })

}

export {addProduct,getProducts}