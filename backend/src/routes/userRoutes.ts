import express from "express";
import { body } from "express-validator";
import {
  addToWatchlist,
  assignCoinToUser,
  buyStock,
  checkStockOnWatchlist,
  deleteWatchlist,
  getAllPortfolio,
  getAllWatchlist,
  getAvailableStock,
  getLeaderboard,
  getPurchasedStock,
  getUserNetworth,
  getUserVirtualUsd,
  sellStock,
  updateUserNetworth,
  user
} from "../controllers/User";

export const userRoute = express.Router();

userRoute.post(
  "/",
  body("email").isEmail(),
  body("id").isString(),
  body("name").isString().isLength({ max: 30 }),
  user
);

userRoute.post("/watchlist", body("id").isString(), body("symbol").isString(), addToWatchlist);
userRoute.delete("/watchlist", deleteWatchlist);

userRoute.post("/addCoin", body("userId").isString(), assignCoinToUser);

userRoute.get("/vusd", getUserVirtualUsd);
userRoute.get("/networth", getUserNetworth);
userRoute.get("/watchlist", checkStockOnWatchlist);
userRoute.get("/allWatchlist", getAllWatchlist);

// portfolio
userRoute.post(
  "/buyStock",
  body("id").isString(),
  body("stockPrice").isFloat(),
  body("amount").isInt(),
  body("symbol").isString(),
  body("name").isString(),
  buyStock
);

userRoute.get("/getPurchasedStock", getPurchasedStock);

userRoute.post(
  "/sellStock",
  body("id").isString(),
  body("stockPrice").isFloat(),
  body("amount").isInt(),
  body("symbol").isString(),
  body("name").isString(),
  sellStock
);

userRoute.get("/allPortfolio", getAllPortfolio);
userRoute.get("/leaderboard", getLeaderboard);

userRoute.post("/networth", body("id").isString(), updateUserNetworth);
