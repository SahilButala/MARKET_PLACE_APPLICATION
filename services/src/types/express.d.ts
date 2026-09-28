

declare global {
    namespace Express{
        interface  Request{
            auth?:{
                userId : string,
                sessionId : string,
                role : "client" | "freelancer",
                accountExsist : boolean,
                isOnBoarded : boolean
            }
        }
    }
}

export {
    
}