"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.api = void 0;
const https_1 = require("firebase-functions/v2/https");
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const stocksRoute_1 = require("./routes/stocksRoute");
const ErrorMiddleware_1 = require("./middlewares/ErrorMiddleware");
const userRoutes_1 = require("./routes/userRoutes");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// @ts-expect-error there are no types
const google_news_json_1 = require("google-news-json");
const postsRoutes_1 = require("./routes/postsRoutes");
const mindsDB_server_1 = require("./config/mindsDB-server");
// import { createServer } from "http";
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
dotenv.config();
// Connect to mindsdb
(0, mindsDB_server_1.connectMindsDB)();
const app = (0, express_1.default)();
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
        }
        else {
            callback(new Error("Origin not allowed by CORS"));
        }
    }
};
// Enable preflight requests for all routes
// app.options("*", cors(corsOptions));
// app.use(cors(corsOptions));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    return res.json({
        success: true,
        data: "Welcome to Stonks API"
    });
});
app.use("/api/user", userRoutes_1.userRoute);
app.use("/api/stocks", stocksRoute_1.stocksRoute);
app.use("/api/post", postsRoutes_1.postRouter);
app.get("/api/news", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { news } = req.query;
    if (typeof news !== "string") {
        throw new Error("Something went wrong");
    }
    let fetchNews = yield (0, google_news_json_1.getNews)(google_news_json_1.SEARCH, news, "en-US");
    res.json(fetchNews);
})));
// custom error handler
app.use(ErrorMiddleware_1.notFound);
app.use(ErrorMiddleware_1.errorHandler);
exports.api = (0, https_1.onRequest)(app);
//# sourceMappingURL=index.js.map