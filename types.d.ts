/** @format */

import { JwtPayload } from "jsonwebtoken";

export type User = {
  userID: string;
  userName: string;
  email: string;
  DOB: Date;
  passwordHash: string;
  AccessLevel: AccessLevel;
};

export type UserBearer = {
  userID: string;
  email: string;
  AccessLevel: AccessLevel;
};

export type Tweet = {
  content: string;
  tweetID: string;
  writtenBy: User;
  tweetComment: Comments[];
  likes: number;
  Retweets: number;
  createdAt: Date;
};

export type Comments = User & {
  comment: string;
};

export type AccessLevel = "Admin" | "User" | "Anonymous";

declare global {
  namespace Express {
    interface Request {
      User: User;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      JwtEncryptionKey: string;
      Node_env: "development" | "production";
    }
  }
}

export type Follow = {
  UserID: string;
  FollowedBy: User[];
  Followers: User[];
};
