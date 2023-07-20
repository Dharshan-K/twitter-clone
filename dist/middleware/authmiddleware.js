"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateID = exports.encode = exports.decode = exports.authUser = void 0;
const jwt = require("jsonwebtoken");
const userController_1 = require("../user/userController");
require("dotenv").config();
const authUser = (req, res, next) => {
    var _a;
    let token;
    console.log("req.headers.authorization", req.headers.authorization);
    const verifyToken = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.toString()) || " ";
    console.log(verifyToken);
    if (verifyToken && verifyToken.startsWith("Bearer")) {
        try {
            token = verifyToken.split(" ")[1];
            const decoded = decode(token);
            console.log("authentication complete");
            if (decoded) {
                (0, userController_1.findUser)(decoded.userData.userID, decoded.userData.email, (error, results, doExist) => {
                    if (error) {
                        console.log(error);
                        res.status(201).send(error);
                        return;
                    }
                    else if (doExist === true) {
                        req.User = results;
                        next();
                    }
                });
            }
            else {
                console.log("your user credetials not valid");
            }
            return;
        }
        catch (error) {
            console.log("error", error);
            return;
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
        return `Bearer ${jwt.sign({ userData }, process.env.JWT_TOKEN, {
            expiresIn: "30d",
        })}`;
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
