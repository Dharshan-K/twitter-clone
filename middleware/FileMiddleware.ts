/** @format */
import * as Express from "express";
import * as multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import * as crypto from "crypto";
import * as path from "path";
import { Image } from "../data/commentSchema";
import { generateUUID } from "../tweets/tweetController";
import { gfs } from "../data/connectDB";

const url = process.env.MONGODB_URL as string;

const storage = new GridFsStorage({
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

export const upload = multer({ storage });

export const uploadImage = async (
  req: Express.Request,
  res: Express.Response
) => {
  const image = await Image.create({
    filename: req.file?.filename,
    fileId: generateUUID(),
    tweetID: req.body.tweetID,
  });
  image.save();
  res.status(201).send("image uploaded");
};

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
