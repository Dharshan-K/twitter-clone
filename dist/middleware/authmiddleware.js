"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateID = exports.authUser = void 0;
const jwt = require("jsonwebtoken");
require('dotenv').config();
const authUser = (req, res, next) => {
    let token;
    // const jwt_token: jwt.Secret | jwt.GetPublicKeyOrSecret = process.env.JWT_TOKEN || " ";
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        }
        finally {
        }
    }
};
exports.authUser = authUser;
const generateID = () => {
    const timestamp = Date.now().toString(36); // convert timestamp to base-36 string
    const random = Math.random().toString(36).substr(2, 5); // generate 5 random alphanumeric characters
    const uniqueId = `${timestamp}-${random}`;
    return uniqueId;
};
exports.generateID = generateID;
