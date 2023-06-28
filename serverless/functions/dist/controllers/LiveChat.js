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
exports.postChat = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_server_1 = require("../config/db-server");
// @desc POST Chat
// @route GET /api/stocks/chat
// @access PRIVATE
exports.postChat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, stockId, userId } = req.body;
    const chat = db_server_1.db.liveChat.create({
        data: {
            stockId,
            chat: message,
            userId
        }
    });
    res.json(chat);
}));
//# sourceMappingURL=LiveChat.js.map