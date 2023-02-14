import express from "express";
import {
  getInsights,
  getRecommendationBySymbol,
  getStockChart,
  getStockQuote,
  getStockQuoteSummary,
  getStocks,
  getTrendingRecommendation
} from "../controllers/Stocks";

export const stocksRoute = express.Router();

stocksRoute.get("/search", getStocks);
stocksRoute.get("/quote", getStockQuote);
stocksRoute.get("/quote/summary", getStockQuoteSummary);
stocksRoute.get("/quote/historical", getStockChart);
stocksRoute.get("/recommendBySymbol", getRecommendationBySymbol);
stocksRoute.get("/trending", getTrendingRecommendation);
stocksRoute.get("/insights", getInsights);
