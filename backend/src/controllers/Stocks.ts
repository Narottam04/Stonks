import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import yahooFinance from "yahoo-finance2";

// @desc GET Stocks
// @route GET /api/stocks?search=''
// @access PRIVATE
export const getStocks = asyncHandler(async (req: Request, res: Response) => {
  const search = req.query.search;

  if (typeof search !== "string") {
    throw new Error("Please send a valid request");
  }

  const result = await yahooFinance.search(search);

  res.json(result);
});

// @desc GET Details of stock
// @route GET /api/quote?stock=''
// @access PRIVATE
export const getStockQuote = asyncHandler(async (req: Request, res: Response) => {
  const stock = req.query.stock;

  if (typeof stock !== "string") {
    throw new Error("Please send a valid request");
  }

  const result = await yahooFinance.quote(stock);

  res.json(result);
});

// @desc GET Stock Summary
// @route GET /api/quote/summary?stock=''
// @access PRIVATE
export const getStockQuoteSummary = asyncHandler(async (req: Request, res: Response) => {
  const stock = req.query.stock;

  if (typeof stock !== "string") {
    throw new Error("Please send a valid request");
  }

  const result = await yahooFinance.quote(stock);

  res.json(result);
});

// @desc GET Historical Data of stock
// @route GET /api/quote/historical?stock=''
// @access PRIVATE

export const getStockChart = asyncHandler(async (req: Request, res: Response) => {
  const stock = req.query.stock;

  const startDate = req.query.start;
  const endDate = req.query.end;

  if (typeof stock !== "string" || typeof startDate !== "string" || typeof endDate !== "string") {
    throw new Error("Please send a valid request");
  }

  const result = await yahooFinance.historical(stock, {
    period1: startDate,
    period2: endDate
  });

  res.json(result);
});

// @desc GET Details of stock
// @route GET /api/stocks?stock=''
// @access PRIVATE
export const getRecommendationBySymbol = asyncHandler(async (req: Request, res: Response) => {
  const stock = req.query.stock;

  if (typeof stock !== "string") {
    throw new Error("Please send a valid request");
  }

  const result = await yahooFinance.recommendationsBySymbol(stock);

  res.json(result);
});

// @desc GET Details of stock
// @route GET /api/stocks?stock=''
// @access PRIVATE
export const getTrendingRecommendation = asyncHandler(async (req: Request, res: Response) => {
  const queryOptions = { count: 5, lang: "en-US" };

  const result = await yahooFinance.trendingSymbols("US", queryOptions);

  res.json(result);
});

// @desc GET Details of stock
// @route GET /api/stocks?stock=''
// @access PRIVATE
export const getInsights = asyncHandler(async (req: Request, res: Response) => {
  const stock = req.query.stock;

  if (typeof stock !== "string") {
    throw new Error("Please send a valid request");
  }

  const queryOptions = { lang: "en-US", reportsCount: 2, region: "US" };

  const result = await yahooFinance.insights(stock, queryOptions);

  res.json(result);
});
