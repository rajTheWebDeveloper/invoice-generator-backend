import express,{Request,Response,NextFunction} from 'express'



let generatePdf=async (req:Request,res:Response,next:NextFunction)=>
{
    return res.status(200).json({
        data:"Inlo Illalu Vantintlo Priyuralu"
    })
}


export {generatePdf}