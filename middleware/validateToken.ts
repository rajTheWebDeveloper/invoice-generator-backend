import express,{Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import env from 'dotenv'
import path from 'path'
let __basePath=path.dirname(__filename)
__basePath=__basePath.slice(0,__basePath.lastIndexOf(path.sep))
let __configPath=__basePath+path.sep+'config'+path.sep+'.env'
env.config({
    path:__configPath
})


let validateToken=async (req:Request,res:Response,next:NextFunction)=>
{
    let token=req.headers.authorization;
    console.log(token)
    if(token && token.length>10)
    {
        // if(!process.env.JWT_PASSWORD)
        // {
        //     return next("JWT_PASWORD environment variable is not defined")
        // }
        try 
        {
            token=token.split(' ')[1]
            console.log(token)
            let verifiedToken=jwt.verify(token,"I_AM_SUPER_SECRET_PASSWORD")
            if(verifiedToken)
            {
                next()
            }
            else 
            {
                return next("JWT_PASWORD environment variable is not defined")
            }
        }
        catch(error)
        {
            return res.status(401).json({
                success:false,
                message:"Invalid JWT Token"
            })
        }
    }
    else 
    {
       return res.status(401).json({
         success:false,
         message:"Unauthorized. Please login to add product"
       })
    }
}


export default validateToken