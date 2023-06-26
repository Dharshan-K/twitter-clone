import {Response,Request, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';
require('dotenv').config();
export const authUser=(req:Request,res:Response,next:NextFunction)=>{
    let token;
    // const jwt_token: jwt.Secret | jwt.GetPublicKeyOrSecret = process.env.JWT_TOKEN || " ";
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token,process.env.JWT_TOKEN as string);
        }
    }

}

export const generateID = ():string=>{
    const timestamp = Date.now().toString(36); // convert timestamp to base-36 string
    const random = Math.random().toString(36).substr(2, 5); // generate 5 random alphanumeric characters
    const uniqueId = `${timestamp}-${random}`;
    return uniqueId;
}