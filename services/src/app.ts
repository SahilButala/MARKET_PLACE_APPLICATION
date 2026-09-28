import express from "express"

import cors from "cors"
import apiRes from "./utils/api-response"
import {API_PREFIX} from "./config/constants"
import router from "./routes"
import errorHandler from "./utils/error-handler"

import {NotfoundMiddleware} from "./middlewares"



export const app = express()


app.disable("x-powered-by")
app.use(express.json({limit : "2mb"}))

app.use(express.urlencoded({extended : true}))

app.get("/" , (_request ,  response )=>{
    const body : any  = {
        sucess : true,
        message : "OneMarketPlace.io Api is running"
    }

    response.status(200).json(body)
})


app.use(API_PREFIX ,  router)
app.use(NotfoundMiddleware);
app.use(errorHandler)






