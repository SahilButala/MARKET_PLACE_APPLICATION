import "dotenv/config"
import AppError from "../utils/app-error"
import StatusCode from "http-status-codes"
const parsePort = (value : string | undefined) : number =>{
    const port = Number(value ?? 4000)
    if(!Number.isInteger(port)){
        throw new AppError("Port must be integer between 1 to 65535" , StatusCode.CONFLICT)
    }
    return port
}


export const env = {
    port : parsePort(process.env.PORT),
    nodeEnv : process.env.NODE_ENV || "development  "
} as const

