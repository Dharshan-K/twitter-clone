"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.login = void 0;
const userController_1 = require("./userController");
const authmiddleware_1 = require("../middleware/authmiddleware");
const bcrypt = require("bcrypt");
const login = (req, res) => {
    const { userid, emailid, userpassword } = req.body;
    console.log("userid, emailid, userpassword", userid, emailid, userpassword);
    if ((userid || emailid) && userpassword) {
        (0, userController_1.findUser)(userid, emailid, (error, results, doesExist) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                console.log(error);
                return;
            }
            else if (doesExist === false) {
                console.log("try another username");
                res.status(201).json({ message: "try another username" });
                return;
            }
            else if (doesExist === true) {
                console.log("verifying password..........");
                console.log("results", results);
                console.log(userpassword, results.userpassword);
                console.log(yield bcrypt.compare(userpassword, results.userpassword));
                if (results &&
                    (yield bcrypt.compare(userpassword, results.userpassword))) {
                    const bearerType = {
                        userID: results.userid,
                        email: results.emailid,
                        AccessLevel: results.accesslevel,
                    };
                    if (bearerType) {
                        const token = (0, authmiddleware_1.encode)(bearerType);
                        console.log(token);
                        req.headers.authorization = token;
                        res.cookie("userID", results.userid, {
                            maxAge: 60 * 60 * 24 * 10 * 1000,
                        });
                        res.cookie("userEmail", results.emailid, {
                            maxAge: 60 * 60 * 24 * 10 * 1000,
                        });
                        console.log("user logged in");
                        res.status(200).json({ message: "user logged in" });
                        return;
                    }
                }
                console.log("wrong Password");
                res.status(401).json({ message: "wrong Password" });
                return;
            }
            else {
                console.log("data not found");
                res.status(400).json({ message: "data not found" });
                return;
            }
        }));
    }
};
exports.login = login;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid, username, emailid, dateofbirth, userpassword, accesslevel } = req.body;
    if (!userid ||
        !username ||
        !emailid ||
        !dateofbirth ||
        !userpassword ||
        !accesslevel) {
        res.status(400).json({ message: "user credentials missing" });
        return;
    }
    const password = yield hashPassword(userpassword)
        .then((value) => {
        console.log(value);
        return value;
    })
        .catch((error) => {
        throw new Error(error);
    });
    const data = {
        userid: userid,
        username: username,
        email: emailid,
        dob: new Date(dateofbirth),
        passwordhash: password,
        accesslevel: accesslevel,
    };
    if (data) {
        (0, userController_1.findUser)(data.userid, data.email, (error, results, doesExist) => {
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
});
exports.signUp = signUp;
function hashPassword(userPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt.genSalt(10);
        const pass = yield bcrypt.hash(userPassword, salt);
        return pass;
    });
}
