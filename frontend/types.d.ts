/** @format */

export type Tweet = {
  tweetid: string;
  tweetWritten: string;
  writtenBy: string;
  likes: number;
  retweets: number;
  createdAt: Date;
};

export type User = {
  userid: string;
  username: string;
  email: string;
  dob: Date;
  passwordhash: string;
  accesslevel: AccessLevel;
};

export type AccessLevel = "Admin" | "User" | "Anonymous";

export type Comments = User & {
  comment: string;
};
