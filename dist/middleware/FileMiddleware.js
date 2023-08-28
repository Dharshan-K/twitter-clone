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
exports.uploadImage = exports.upload = void 0;
const multer = require("multer");
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
const crypto = require("crypto");
const path = require("path");
const commentSchema_1 = require("../data/commentSchema");
const tweetController_1 = require("../tweets/tweetController");
const url = process.env.MONGODB_URL;
const storage = new multer_gridfs_storage_1.GridFsStorage({
    url,
    file: (req, file) => {
        console.log("getting the storage");
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString("hex") + path.extname(file.originalname);
                console.log(file.originalname, path.extname(file.originalname));
                console.log("got files");
                const fileInfo = {
                    filename: filename,
                    bucketName: "uploads",
                };
                resolve(fileInfo);
            });
        });
    },
});
exports.upload = multer({ storage });
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const image = yield commentSchema_1.Image.create({
        filename: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename,
        fileId: (0, tweetController_1.generateUUID)(),
        tweetID: req.body.tweetID,
    });
    image.save();
    res.status(201).send("image uploaded");
});
exports.uploadImage = uploadImage;
// gfs.find({ tweetID: req.body.tweetID }).toArray((err: any, files: any) => {
//   if (err) {
//     console.log(err);
//     res.status(200).send("images not found");
//   }
//   if (!files[0]) {
//     res.status(200).send("images not found");
//   }
//   const imageFile = files[0];
//   gfs.openDownloadStream(imageFile._id).pipe(res);
// });
