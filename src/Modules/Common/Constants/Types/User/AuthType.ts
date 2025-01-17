interface IPayloadRequest{
    username:string,
    password:string
}

interface IPayloadFailure{
   status:number,
   error:string
}

interface IPayloadSuccess{
    status:number,
    message:string
}

export interface IAuth{
    type:string,
    payload:IPayloadRequest | IPayloadFailure | IPayloadSuccess
}




export type AuthTypes = IAuth;