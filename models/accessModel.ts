import mongoose,{Document, Schema} from "mongoose";
import bcrypt from 'bcrypt'

interface AccessModelType extends Document
{
    name:string,
    email:string,
    password:string,
    authenticate:(password:string)=>boolean
}

let accessSchema:Schema<AccessModelType>=new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true
    }
})

accessSchema.pre('save',async function ()
{
    this.password=await bcrypt.hash(this.password,10)
})

accessSchema.methods.authenticate=async function (password:string)
{
    return await bcrypt.compare(password,this.password)
}


export default mongoose.model('Access',accessSchema)