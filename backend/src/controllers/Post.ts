import type { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { db } from "../config/db-server";
import MindsDB from "mindsdb-js-sdk";
import { isToxicFunc } from "../utils/helpers";

// @desc  ADD A NEW POST
// @route GET /api/post
// @access PRIVATE
export const addPost = expressAsyncHandler(async (req: Request, res: Response) => {
  const {
    title,
    body,
    imageUrl,
    userId
  }: { title: string; body: string; imageUrl: string | null; userId: string } = req.body;

  // check if the post is a spam message

  // check toxicity of the post
  const fetchToxicityResult = [
    MindsDB.SQL.runQuery(`SELECT * FROM abuse_detection WHERE comment='${title}';`),
    MindsDB.SQL.runQuery(`SELECT * FROM abuse_detection WHERE comment='${body}';`)
  ];

  const [fetchTitleToxicity, fetchDescriptionToxicity] = await Promise.all(fetchToxicityResult);

  const titleToxicity = fetchTitleToxicity?.rows[0]?.sentiment_explain;
  const descriptionToxicity = fetchDescriptionToxicity?.rows[0]?.sentiment_explain;

  const isToxic = isToxicFunc(titleToxicity) || isToxicFunc(descriptionToxicity);

  if (isToxic) {
    throw new Error(
      "Your post potentially violates our community rules; please help us maintain a healthy environment for the community. Please check your language of the post."
    );
  }

  const post = await db.post.create({
    data: {
      title,
      body,
      imageUrl,
      userId
    }
  });

  res.json(post);
});

// @desc  GET ALL POST
// @route GET /api/allPost
// @access PRIVATE
export const getAllPost = expressAsyncHandler(async (req: Request, res: Response) => {
  const post = await db.post.findMany({
    include: {
      _count: {
        select: {
          VotePost: true
        }
      }
    }
  });

  res.json(post);
});

// @desc  ADD A NEW COMMENTS
// @route GET /api/comment
// @access PRIVATE
export const addComment = expressAsyncHandler(async (req: Request, res: Response) => {
  const { body, postId, userId }: { body: string; postId: string; userId: string } = req.body;

  // check toxicity of comment
  const fetchCommnentToxicity = await MindsDB.SQL.runQuery(
    `SELECT * FROM abuse_detection WHERE comment='${body}';`
  );

  const commentToxicity = fetchCommnentToxicity?.rows[0]?.sentiment_explain;

  const isToxic = isToxicFunc(commentToxicity);

  if (isToxic) {
    throw new Error(
      "Your comment potentially violates our community rules; please help us maintain a healthy environment for the community. Please check your language of the comment."
    );
  }

  const post = await db.comment.create({
    data: {
      body,
      postId,
      userId
    }
  });

  res.json(post);
});

// @desc  GET ALL COMMENTS FOR A POST
// @route GET /api/comment
// @access PRIVATE
export const getPostComment = expressAsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new Error("Something went wrong! Please try again");
  }

  const post = await db.comment.findMany({
    where: {
      postId: id
    },
    include: {
      user: true
    }
  });

  res.json(post);
});

// @desc  UPVOTE A POST
// @route GET /api/post/upvote
// @access PRIVATE
export const postReaction = expressAsyncHandler(async (req: Request, res: Response) => {
  const {
    voting,
    userId,
    postId,
    type
  }: { voting: number; userId: string; postId: string; type: "UPVOTE" | "DOWNVOTE" } = req.body;

  const checkUserVote = await db.votePost.findFirst({
    where: {
      userId,
      postId
    }
  });

  // If the user has not upvoted the post then add +1
  if (checkUserVote === null && type === "UPVOTE") {
    const vote = await db.votePost.create({
      data: {
        userId,
        postId
      }
    });

    res.json(vote);
  }
  // If the user wants to downvote the post then add -1
  if (checkUserVote === null && type === "DOWNVOTE") {
    const vote = await db.votePost.create({
      data: {
        voting: -1,
        userId,
        postId
      }
    });

    res.json(vote);
  }
  // If the user has already upvoted the post but now wants to downvote then delete +1 and add -1
  if (checkUserVote !== null && type === "DOWNVOTE") {
    const removeVote = await db.votePost.delete({
      where: {
        id: checkUserVote?.id
      }
    });

    const vote = await db.votePost.create({
      data: {
        voting: -1,
        userId,
        postId
      }
    });

    res.json(vote);
  }

  // If the user has already downvoted the post but now wants to upvote then delete -1 and add +1
  if (checkUserVote !== null && type === "DOWNVOTE") {
    const removeVote = await db.votePost.delete({
      where: {
        id: checkUserVote?.id
      }
    });

    const vote = await db.votePost.create({
      data: {
        userId,
        postId
      }
    });

    res.json(vote);
  }
});

// @desc  UPVOTE DOWNVOTE POST
// @route GET /api/post/downvote
// @access PRIVATE
// export const downvotePost = expressAsyncHandler(async (req: Request, res: Response) => {
//   const { voting, userId, postId }: { voting: number; userId: string; postId: string } = req.body;

//   const checkUserVote = await db.votePost.findFirst({
//     where: {
//       userId,
//       postId
//     }
//   });

//   if (checkUserVote !== null) {
//     const vote = await db.votePost.delete({
//       where: {
//         id: checkUserVote?.id
//       }
//     });

//     res.json(vote);
//   }

//   throw new Error("You have not upvoted the post !");
// });
