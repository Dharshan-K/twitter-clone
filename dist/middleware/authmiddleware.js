"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateID = exports.encode = exports.decode = exports.authUser = void 0;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authUser = (req, res, next) => {
    let token;
    const jwt_token = process.env.JWT_TOKEN || " ";
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, jwt_token);
            console.log(typeof decoded);
            if (decoded) {
                // req.User.authenticationHash = decoded;
                // const {userID,userName,email,DOB,passwordHash,AccessLevel} =
            }
            else {
                console.log("your user credetials not valid");
            }
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.authUser = authUser;
function decode(iJWT) {
    const bearerData = jwt.verify(iJWT, process.env.JWT_TOKEN);
    return bearerData;
}
exports.decode = decode;
function encode(userData) {
    if (userData) {
        return jwt.sign({ userData }, process.env.JWT_TOKEN, {
            expiresIn: "30d",
        });
    }
    else {
        throw new Error("ente the proper credentials");
    }
}
exports.encode = encode;
const generateID = () => {
    const timestamp = Date.now().toString(36); // convert timestamp to base-36 string
    const random = Math.random().toString(36).substr(2, 5); // generate 5 random alphanumeric characters
    const uniqueId = `${timestamp}-${random}`;
    return uniqueId;
};
exports.generateID = generateID;
