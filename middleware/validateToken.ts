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
    if(token)
    {
        // if(!process.env.JWT_PASSWORD)
        // {
        //     return next("JWT_PASWORD environment variable is not defined")
        // }
        token=token.split(' ')[1]
        let verifiedToken=jwt.verify(token,"I_AM_SUPER_SECRET_PASSWORD")
        console.log(verifiedToken)
        if(verifiedToken)
        {
            next()
        }
        else 
        {
           return next("JWT_PASWORD environment variable is not defined")
        }
    }
    else 
    {
       return next("Invalid Token")
    }
}


export default validateToken