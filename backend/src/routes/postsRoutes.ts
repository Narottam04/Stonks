import express from "express";
import { body } from "express-validator";
import { addComment, addPost, getAllPost, getPostComment, postReaction } from "../controllers/Post";

export const postRouter = express.Router();

postRouter.post(
  "/",
  body("title").isString(),
  body("body").isString(),
  body("userId").isString(),
  addPost
);

postRouter.get("/", getAllPost);

postRouter.post(
  "/comment",
  body("body").isString(),
  body("postId").isString(),
  body("userId").isString(),
  addComment
);

postRouter.get("/comment/:id", getPostComment);

postRouter.post("/reaction", postReaction);
