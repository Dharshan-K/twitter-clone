/** @format */

import * as Express from "express";
import { itemsPool } from "../../data/connectDB";

export const searchAPI = async (
  req: Express.Request,
  res: Express.Response
) => {
  const { searchQuery } = req.body;
  const search = await getSearchQuery(searchQuery);
  const userSearch = await getUserQuery(searchQuery);
  res.status(201).send({ tweetQuery: search, userQuery: userSearch });
};

export const getSearchQuery = async (searchQuery: String) => {
  const searchResult = await itemsPool.query(
    `SELECT * FROM usertweets WHERE tweetwritten ILIKE '%'|| $1 || '%'`,
    [searchQuery]
  );
  return searchResult.rows;
};

export const getUserQuery = async (searchQuery: String) => {
  const searchResult = await itemsPool.query(
    `SELECT * FROM userdata WHERE description ILIKE '%'|| $1 || '%' or username ILIKE '%'|| $1 || '%' or userid ILIKE '%'|| $1 || '%'`,
    [searchQuery]
  );
  return searchResult.rows;
};
