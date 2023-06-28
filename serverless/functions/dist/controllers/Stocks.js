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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInsights = exports.getTrendingRecommendation = exports.getRecommendationBySymbol = exports.getStockChart = exports.getStockQuoteSummary = exports.getStockQuote = exports.getStocks = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const yahoo_finance2_1 = __importDefault(require("yahoo-finance2"));
// @desc GET Stocks
// @route GET /api/stocks?search=''
// @access PRIVATE
exports.getStocks = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.search;
    if (typeof search !== "string") {
        throw new Error("Please send a valid request");
    }
    const result = yield yahoo_finance2_1.default.search(search);
    res.json(result);
}));
// @desc GET Details of stock
// @route GET /api/quote?stock=''
// @access PRIVATE
exports.getStockQuote = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stock = req.query.stock;
    if (typeof stock !== "string") {
        throw new Error("Please send a valid request");
    }
    const result = yield yahoo_finance2_1.default.quote(stock);
    res.json(result);
}));
// @desc GET Stock Summary
// @route GET /api/quote/summary?stock=''
// @access PRIVATE
exports.getStockQuoteSummary = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stock = req.query.stock;
    if (typeof stock !== "string") {
        throw new Error("Please send a valid request");
    }
    const result = yield yahoo_finance2_1.default.quoteSummary(stock);
    res.json(result);
}));
// @desc GET Historical Data of stock
// @route GET /api/quote/historical?stock=''
// @access PRIVATE
exports.getStockChart = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stock = req.query.stock;
    const startDate = req.query.start;
    const endDate = req.query.end;
    if (typeof stock !== "string" || typeof startDate !== "string" || typeof endDate !== "string") {
        throw new Error("Please send a valid request");
    }
    const result = yield yahoo_finance2_1.default.historical(stock, {
        period1: startDate,
        period2: endDate
    });
    res.json(result);
}));
// @desc GET Details of stock
// @route GET /api/stocks?stock=''
// @access PRIVATE
exports.getRecommendationBySymbol = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stock = req.query.stock;
    if (typeof stock !== "string") {
        throw new Error("Please send a valid request");
    }
    const result = yield yahoo_finance2_1.default.recommendationsBySymbol(stock);
    res.json(result);
}));
// @desc GET Details of stock
// @route GET /api/stocks?stock=''
// @access PRIVATE
exports.getTrendingRecommendation = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryOptions = { count: 5, lang: "en-US" };
    const result = yield yahoo_finance2_1.default.trendingSymbols("US", queryOptions);
    res.json(result);
}));
// @desc GET Details of stock
// @route GET /api/stocks?stock=''
// @access PRIVATE
exports.getInsights = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stock = req.query.stock;
    if (typeof stock !== "string") {
        throw new Error("Please send a valid request");
    }
    const queryOptions = { lang: "en-US", reportsCount: 2, region: "US" };
    const result = yield yahoo_finance2_1.default.insights(stock, queryOptions);
    res.json(result);
}));
//# sourceMappingURL=Stocks.js.map