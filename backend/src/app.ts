import * as dotenv from "dotenv";
import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { stocksRoute } from "./routes/stocksRoute";
import { errorHandler, notFound } from "./middlewares/ErrorMiddleware";
import { userRoute } from "./routes/userRoutes";
import asyncHandler from "express-async-handler";
let googleNewsAPI = require("google-news-json");

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: Number = parseInt(process.env.PORT as string, 10);

const app = express();

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

app.get(
  "/api/news",
  // @ts-expect-error
  asyncHandler(async (req: Request, res: Response) => {
    let { news } = req.query;

    if (typeof news !== "string") {
      throw new Error("Something went wrong");
    }

    let fetchNews = await googleNewsAPI.getNews(googleNewsAPI.SEARCH, news, "en-US");
    return res.json(fetchNews);
  })
);

// custom error handler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Application listening at http://localhost:${PORT}`);
});
