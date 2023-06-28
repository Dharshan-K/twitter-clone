/** @format */

import * as Express from "express";
import * as jwt from "jsonwebtoken";
import { UserBearer } from "../types";
import { findUser } from "../user/userController";
require("dotenv").config();

export const authUser = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  let token;
  const verifyToken = req.headers.authorization?.toString() || " ";
  if (verifyToken && verifyToken.startsWith("Bearer")) {
    try {
      token = verifyToken.split(" ")[1];
      const decoded = decode(token);
      console.log("authentication complete");
      if (decoded) {
        findUser(
          decoded.userData.userID,
          decoded.userData.email,
          (error, results, doExist) => {
            if (error) {
              console.log(error);
              res.status(201).send(error);
              return;
            } else if (doExist === true) {
              req.User = results;
              next();
            }
          }
        );
      } else {
        console.log("your user credetials not valid");
      }
      return;
    } catch (error) {
      console.log("error", error);
      return;
    }
  }
};

export function decode<T extends object>(iJWT: string): T | any {
  const bearerData = jwt.verify(iJWT, process.env.JWT_TOKEN as string);
  return bearerData;
}

export function encode(userData: UserBearer): string {
  if (userData) {
    return `Bearer ${jwt.sign({ userData }, process.env.JWT_TOKEN as string, {
      expiresIn: "30d",
    })}`;
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
