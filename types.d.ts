/** @format */

type User = {
  userID: string;
  userName: string;
  email: string;
  DOB: Date;
  passwordHash: string;
  authenticationHash: string;
  AccessLevel: AccessLevel;
};

type Tweet = {
  content: string;
  tweetID: string;
  writtenBy: User;
  tweetComment: Comments[];
  likes: number;
  createdAt: Date;
};

type Comments = User & {
  comment: string;
};

type AccessLevel = "Admin" | "User" | "Anonymous";

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

export {};
