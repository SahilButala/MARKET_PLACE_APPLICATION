import { Server } from "node:http";
import { SERVICE_NAME } from "./config/constants";
import { app } from "./app";
import {env} from "./config/env"



let server : Server | undefined

let isShutDown : boolean = false

let start  = async () : Promise<void>=>{
    server = app.listen(env.port , ()=>{
        console.log(`${SERVICE_NAME} listening on http:localhost:${env.port} in ${env.nodeEnv} mode`)
    })
}

const closehttpServer = async () : Promise<void> =>{
    if(!server){
         return 
    }

    await new Promise<void>((res , rej)=>{
        server?.close((error)=>{
            if(error){
                rej(error)
                rej
            }
            res() 
        })

    })
}


const shutDown = async (signal : NodeJS.Signals) : Promise<void> =>{
    if(isShutDown){
        return
    }

    isShutDown = true
    console.log(`${signal} recived . Close Services`)

    try {
        await closehttpServer()
        process.exit(0)
    } catch (error) {
        console.error("Failed to shut down cleanly" , error)
        process.exit(1)
    }
}


process.on("SIGINT" , ()=> void shutDown("SIGINT"))
process.on("SIGTERM" , ()=> void shutDown("SIGTERM"))


void start().catch(async (error)=>{
    console.error(`Failed to  Start ${SERVICE_NAME}` , error)

    process.exit(1)
})