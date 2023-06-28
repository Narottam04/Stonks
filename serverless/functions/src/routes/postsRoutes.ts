import express from "express";
import { body } from "express-validator";
import {
  addComment,
  addPost,
  commentReaction,
  getAllPost,
  getPostComment,
  getSinglePost,
  postReaction
} from "../controllers/Post";

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

postRouter.post("/comment/reaction", commentReaction);

postRouter.post("/reaction", postReaction);

postRouter.get("/:id", getSinglePost);
postRouter.get("/comment/:id", getPostComment);
