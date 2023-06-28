"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const User_1 = require("../controllers/User");
exports.userRoute = express_1.default.Router();
exports.userRoute.post("/", (0, express_validator_1.body)("email").isEmail(), (0, express_validator_1.body)("id").isString(), (0, express_validator_1.body)("name").isString().isLength({ max: 30 }), User_1.user);
exports.userRoute.post("/watchlist", (0, express_validator_1.body)("id").isString(), (0, express_validator_1.body)("symbol").isString(), User_1.addToWatchlist);
exports.userRoute.delete("/watchlist", User_1.deleteWatchlist);
exports.userRoute.post("/addCoin", (0, express_validator_1.body)("userId").isString(), User_1.assignCoinToUser);
exports.userRoute.get("/vusd", User_1.getUserVirtualUsd);
exports.userRoute.get("/networth", User_1.getUserNetworth);
exports.userRoute.get("/watchlist", User_1.checkStockOnWatchlist);
exports.userRoute.get("/allWatchlist", User_1.getAllWatchlist);
// portfolio
exports.userRoute.post("/buyStock", (0, express_validator_1.body)("id").isString(), (0, express_validator_1.body)("stockPrice").isFloat(), (0, express_validator_1.body)("amount").isInt(), (0, express_validator_1.body)("symbol").isString(), (0, express_validator_1.body)("name").isString(), User_1.buyStock);
exports.userRoute.get("/getPurchasedStock", User_1.getPurchasedStock);
exports.userRoute.post("/sellStock", (0, express_validator_1.body)("id").isString(), (0, express_validator_1.body)("stockPrice").isFloat(), (0, express_validator_1.body)("amount").isInt(), (0, express_validator_1.body)("symbol").isString(), (0, express_validator_1.body)("name").isString(), User_1.sellStock);
exports.userRoute.get("/allPortfolio", User_1.getAllPortfolio);
exports.userRoute.get("/leaderboard", User_1.getLeaderboard);
exports.userRoute.post("/networth", (0, express_validator_1.body)("id").isString(), User_1.updateUserNetworth);
//# sourceMappingURL=userRoutes.js.map