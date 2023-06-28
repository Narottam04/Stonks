"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stocksRoute = void 0;
const express_1 = __importDefault(require("express"));
const Stocks_1 = require("../controllers/Stocks");
const ChatBot_1 = require("../controllers/ChatBot");
exports.stocksRoute = express_1.default.Router();
exports.stocksRoute.get("/search", Stocks_1.getStocks);
exports.stocksRoute.get("/quote", Stocks_1.getStockQuote);
exports.stocksRoute.get("/quote/summary", Stocks_1.getStockQuoteSummary);
exports.stocksRoute.get("/quote/historical", Stocks_1.getStockChart);
exports.stocksRoute.get("/recommendBySymbol", Stocks_1.getRecommendationBySymbol);
exports.stocksRoute.get("/trending", Stocks_1.getTrendingRecommendation);
exports.stocksRoute.get("/insights", Stocks_1.getInsights);
exports.stocksRoute.post('/chat/billy', ChatBot_1.billyChatBot);
//# sourceMappingURL=stocksRoute.js.map