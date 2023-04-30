import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { db } from "../config/db-server";

// @desc POST Chat
// @route GET /api/stocks/chat
// @access PRIVATE

export const postChat = asyncHandler(async (req: Request, res: Response) => {
  const { message, stockId, userId }: { message: string; stockId: string; userId: string } =
    req.body;

  const chat = db.liveChat.create({
    data: {
      stockId,
      chat: message,
      userId
    }
  });

  res.json(chat);
});
