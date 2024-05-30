import express,{Request,Response,NextFunction} from 'express'
import Access from '../models/accessModel'
import jwt from 'jsonwebtoken'
import env from 'dotenv'
import path from 'path'
let __basePath=path.dirname(__filename)
__basePath=__basePath.slice(0,__basePath.lastIndexOf(path.sep))
let __configPath=__basePath+path.sep+'config'+path.sep+'.env'
env.config({
    path:__configPath
})



interface SignUpBodyType 
{
    name:string 
    email:string 
    password:string
}

interface SignInBodyType 
{
    email:string 
    password:string
}


const signUp=async (req:Request<{},{},SignUpBodyType>,res:Response,next:NextFunction)=>
{
    let {name,email,password}=req.body
    try 
    {
        let foundUser=await Access.findOne({
            email:email
        })

        if(!foundUser)
        {
            let createdUser=await Access.create({
                name,
                email,
                password
            })
            return res.status(200).json({
                success:true,
                message:"Account created successfully",
                data:createdUser
            })
        }
        return res.status(200).json({
            success:true,
            message:"User already exists",
            data:foundUser
        })
    }
    catch(error)
    {
       return next(error)
    }
}


const signIn=async (req:Request<{},{},SignInBodyType>,res:Response,next:NextFunction)=>
{
    let {email,password}=req.body
    try 
    {
        let foundUser=await Access.findOne({
            email:email
        })
        console.log(foundUser)
        if(!foundUser)
        {
            return res.status(401).json({
                success:false,
                message:"No such user exists",
                data:{}
            })
        }
        if(foundUser)
        {
            if (!process.env.JWT_PASSWORD) {
                throw new Error("JWT_PASSWORD environment variable is not defined");
            }
            if(await foundUser.authenticate(password))
            {
                let {_id}=foundUser
                let token=jwt.sign({_id},process.env.JWT_PASSWORD,{expiresIn:'8h'})
                foundUser=JSON.parse(JSON.stringify(foundUser))
                let withToken={token:token,...foundUser}
                return res.status(200).json({
                    success:true,
                    message:"Logged In Successfully",
                    data:withToken
                })
            }
            else 
            {
                 return res.status(401).json({
                    success:false,
                    message:"Invalid Password"
                 })
            }
        }
    }
    catch(error)
    {
       return next(error)
    }
}

export {signUp,signIn}