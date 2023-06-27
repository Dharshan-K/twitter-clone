/** @format */

import * as Express from "express";
import * as jwt from "jsonwebtoken";
import { UserBearer } from "../types";
require("dotenv").config();

export const authUser = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  let token;
  const jwt_token: jwt.Secret = process.env.JWT_TOKEN || " ";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, jwt_token);
      console.log(typeof decoded);
      if (decoded) {
        // req.User.authenticationHash = decoded;
        // const {userID,userName,email,DOB,passwordHash,AccessLevel} =
      } else {
        console.log("your user credetials not valid");
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export function decode<T extends object>(iJWT: string): T | any {
  const bearerData = jwt.verify(iJWT, process.env.JWT_TOKEN as jwt.Secret);
  return bearerData;
}

export function encode<T extends object>(userData: UserBearer): T | string {
  if (userData) {
    return jwt.sign({ userData }, process.env.JWT_TOKEN as jwt.Secret, {
      expiresIn: "30d",
    });
  } else {
    throw new Error("ente the proper credentials");
  }
}

export const generateID = (): string => {
  const timestamp = Date.now().toString(36); // convert timestamp to base-36 string
  const random = Math.random().toString(36).substr(2, 5); // generate 5 random alphanumeric characters
  const uniqueId = `${timestamp}-${random}`;
  return uniqueId;
};
