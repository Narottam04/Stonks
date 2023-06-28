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
exports.billyChatBot = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mindsdb_js_sdk_1 = __importDefault(require("mindsdb-js-sdk"));
// @desc GET BILLY CHATBOT
// @route GET /api/stocks/billy
// @access PRIVATE
exports.billyChatBot = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { context, question } = req.body;
    console.log("context", context, question);
    const answer = yield mindsdb_js_sdk_1.default.SQL.runQuery(`
    SELECT context, question, answer FROM financial_bot_gpt3 WHERE context = '${context}' AND question = '${question}';
  `);
    res.json(answer === null || answer === void 0 ? void 0 : answer.rows[0]);
}));
//# sourceMappingURL=ChatBot.js.map