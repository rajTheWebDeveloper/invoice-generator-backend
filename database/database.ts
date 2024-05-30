import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
let __basePath=path.dirname(__filename)
__basePath=__basePath.slice(0,__basePath.lastIndexOf(path.sep))
let __configPath=__basePath+path.sep+'config'+path.sep+'.env'
dotenv.config({
    path:__configPath
})


const database=async ()=>
{
    // if (!process.env.MONGO_URI) {
    //     throw new Error("MONGO_URI environment variable is not defined");
    // }

    return mongoose.connect("mongodb://webDevMaster:rajTheWebDeveloper@ac-70rgez7-shard-00-00.cqgngsb.mongodb.net:27017,ac-70rgez7-shard-00-01.cqgngsb.mongodb.net:27017,ac-70rgez7-shard-00-02.cqgngsb.mongodb.net:27017/invoice-generator?ssl=true&replicaSet=atlas-3w8jnm-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>
    {
        console.log("Connected to mongo ATLAS")
    })
    .catch(()=>
    {
        console.log("Please check the connection again")
    })
}
    
export default database