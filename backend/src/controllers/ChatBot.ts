import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import MindsDB from "mindsdb-js-sdk";

import { db } from "../config/db-server";

// @desc GET BILLY CHATBOT
// @route GET /api/stocks/billy
// @access PRIVATE

export const billyChatBot = asyncHandler(async (req: Request, res: Response) => {
  const { context, question }: { context: string; question: string } =
    req.body;


  console.log("context", context, question)
  const answer = await MindsDB.SQL.runQuery(`
    SELECT context, question, answer FROM financial_bot_gpt3 WHERE context = '${context}' AND question = '${question}';
  `)

  res.json(answer?.rows[0]);
});
