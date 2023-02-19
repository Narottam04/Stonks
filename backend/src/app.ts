import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import { stocksRoute } from "./routes/stocksRoute";
import { errorHandler, notFound } from "./middlewares/ErrorMiddleware";
import { userRoute } from "./routes/userRoutes";

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

// custom error handler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Application listening at http://localhost:${PORT}`);
});
