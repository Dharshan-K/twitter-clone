"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const userController_1 = require("./userController");
// export const login = async (req: Express.Request, res: Express.Response): void => {
//   const { username, password } = req.body;
//   const token = req.
//   const bearerType: UserBearer = {
//     userID: userid,
//     email: emailid,
//     AccessLevel: accessLevel,
//   };
//   const authToken = await encode(bearerType);
//   req.headers.authorization = authToken;
// };
const signUp = (req, res) => {
    const data = {
        userID: req.body.userid,
        userName: req.body.username,
        passwordHash: req.body.userpassword,
        email: req.body.emailid,
        DOB: req.body.dateofbirth,
        AccessLevel: req.body.accesslevel,
    };
    console.log(data);
    if (data) {
        (0, userController_1.insertUser)(data);
        console.log("user created");
        res.status(400).json({ message: "user created" });
        return;
    }
    else {
        throw new Error("enter all the credentials");
    }
};
exports.signUp = signUp;
