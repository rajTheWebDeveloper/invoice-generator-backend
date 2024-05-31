import express,{Request,Response,NextFunction} from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import database from './database/database'
import AccessRoutes from './routes/accessRoutes'
import ProductRoutes from './routes/productRoutes'
import PdfRoutes from './routes/pdfRoutes'
const __basePath=path.dirname(__filename)
const __configPath=__basePath+path.sep+'config'+path.sep+'.env'
const app=express()


app.use(cors())
dotenv.config({
    path:__configPath
})

app.use(express.json())
app.use('/api',AccessRoutes)
app.use('/api',ProductRoutes)
app.use('/api',PdfRoutes)

app.use((error:any,req:Request,res:Response,next:NextFunction)=>
{
    error.statusCode=error.statusCode || 500
    error.message=error.message || 'Internal Server Error'
    return res.status(500).json({
        success:false,
        message:error.message
    })
})

const PORT=process.env.PORT || 2000


let start=async ()=>
{
    await database()
    app.listen(2000,()=>
    {
        console.log(`Connected to PORT ${PORT}`)
    })
}

start()


