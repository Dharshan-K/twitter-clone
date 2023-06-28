"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.login = void 0;
const userController_1 = require("./userController");
const authmiddleware_1 = require("../middleware/authmiddleware");
const login = (req, res) => {
    const { userid, emailid, userpassword } = req.body;
    if (userid && emailid && userpassword) {
        console.log("loggin process started....");
        (0, userController_1.findUser)(userid, emailid, (error, results, doesExist) => {
            console.log("results", results);
            if (error) {
                console.log(error);
                return;
            }
            else if (doesExist === false) {
                console.log("enter the correct credentials");
                res.status(201).json({ message: "try another username" });
                return;
            }
            else if (doesExist === true) {
                console.log("user exist");
                console.log(error, results, doesExist);
                const bearerType = {
                    userID: results.userid,
                    email: results.emailid,
                    AccessLevel: results.accesslevel,
                };
                if (bearerType) {
                    const token = (0, authmiddleware_1.encode)(bearerType);
                    console.log(token);
                    req.headers.authorization = token;
                    res.status(400).json({ message: "user logged in" });
                    return;
                }
                return;
            }
            else {
                console.log("data not found");
                res.status(400).json({ message: "data not found" });
                return;
            }
        });
    }
};
exports.login = login;
const signUp = (req, res) => {
    const data = {
        userID: req.body.userid,
        userName: req.body.username,
        email: req.body.emailid,
        DOB: new Date(req.body.dateofbirth),
        passwordHash: req.body.userpassword,
        AccessLevel: req.body.accesslevel,
    };
    if (data) {
        (0, userController_1.findUser)(data.userID, data.email, (error, results, doesExist) => {
            if (error) {
                console.log(error);
                res.status(400).json({ message: "error created" });
                return;
            }
            else if (doesExist === false) {
                (0, userController_1.insertUser)(data);
                console.log("user created");
                res.status(400).json({ message: "user created" });
                return;
            }
            else if (doesExist === true) {
                console.log("user already exist");
                res.status(201).json({ message: "try another username" });
                return;
            }
        });
    }
    else {
        throw new Error("enter all the credentials");
    }
};
exports.signUp = signUp;
