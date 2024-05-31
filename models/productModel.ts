import mongoose from "mongoose";



let productSchema=new mongoose.Schema({
    productName:{
        type:String,
        trim:true
    },
    productQuantity:{
        type:Number
    },
    productRate:{
        type:Number
    }
})


export default mongoose.model('Product',productSchema)