import { onRequest } from "firebase-functions/v2/https";
import * as dotenv from "dotenv";
import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { stocksRoute } from "./routes/stocksRoute";
import { errorHandler, notFound } from "./middlewares/ErrorMiddleware";
import { userRoute } from "./routes/userRoutes";
import asyncHandler from "express-async-handler";
// @ts-expect-error there are no types
import { getNews, SEARCH } from "google-news-json";
import { postRouter } from "./routes/postsRoutes";
import { connectMindsDB } from "./config/mindsDB-server";
// import { createServer } from "http";
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

dotenv.config();

// Connect to mindsdb
connectMindsDB();

const app = express();

const allowedOrigins = [
  "capacitor://localhost",
  "ionic://localhost",
  "http://localhost",
  "http://localhost:8080",
  "http://localhost:8100",
  "http://localhost:5173",
  "http://localhost:5174",
  "https://stonks-app.webdrip.in"
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
  // @ts-expect-error
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  }
};

// Enable preflight requests for all routes
// app.options("*", cors(corsOptions));
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  return res.json({
    success: true,
    data: "Welcome to Stonks API"
  });
});

app.use("/api/user", userRoute);
app.use("/api/stocks", stocksRoute);
app.use("/api/post", postRouter);

app.get(
  "/api/news",
  asyncHandler(async (req: Request, res: Response) => {
    let { news } = req.query;

    if (typeof news !== "string") {
      throw new Error("Something went wrong");
    }

    let fetchNews = await getNews(SEARCH, news, "en-US");
    res.json(fetchNews);
  })
);

// custom error handler
app.use(notFound);
app.use(errorHandler);

export const api = onRequest(app);
