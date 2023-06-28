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
exports.commentReaction = exports.postReaction = exports.getPostComment = exports.addComment = exports.getSinglePost = exports.getAllPost = exports.addPost = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_server_1 = require("../config/db-server");
const mindsdb_js_sdk_1 = __importDefault(require("mindsdb-js-sdk"));
const helpers_1 = require("../utils/helpers");
// @desc  ADD A NEW POST
// @route GET /api/post
// @access PRIVATE
exports.addPost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { title, body, imageUrl, userId } = req.body;
    // check if the post is a spam message
    // check toxicity of the post
    const fetchToxicityResult = [
        mindsdb_js_sdk_1.default.SQL.runQuery(`SELECT * FROM abuse_detection1 WHERE comment='${title}';`),
        mindsdb_js_sdk_1.default.SQL.runQuery(`SELECT * FROM abuse_detection1 WHERE comment='${body}';`)
    ];
    const [fetchTitleToxicity, fetchDescriptionToxicity] = yield Promise.all(fetchToxicityResult);
    console.log(fetchTitleToxicity);
    const titleToxicity = (_a = fetchTitleToxicity === null || fetchTitleToxicity === void 0 ? void 0 : fetchTitleToxicity.rows[0]) === null || _a === void 0 ? void 0 : _a.sentiment_explain;
    const descriptionToxicity = (_b = fetchDescriptionToxicity === null || fetchDescriptionToxicity === void 0 ? void 0 : fetchDescriptionToxicity.rows[0]) === null || _b === void 0 ? void 0 : _b.sentiment_explain;
    const isToxic = (0, helpers_1.isToxicFunc)(titleToxicity) || (0, helpers_1.isToxicFunc)(descriptionToxicity);
    if (isToxic) {
        throw new Error("Your post potentially violates our community rules; please help us maintain a healthy environment for the community. Please check your language of the post.");
    }
    const post = yield db_server_1.db.post.create({
        data: {
            title,
            body,
            imageUrl,
            userId
        }
    });
    res.json(post);
}));
// @desc  GET ALL POST
// @route GET /api/allPost
// @access PRIVATE
exports.getAllPost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield db_server_1.db.post.findMany({
        include: {
            VotePost: true,
            user: true
        }
    });
    res.json(post);
}));
// @desc  GET Single POST
// @route GET /api/post/:id
// @access PRIVATE
exports.getSinglePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const post = yield db_server_1.db.post.findFirst({
        include: {
            VotePost: true,
            user: true
        },
        where: {
            id
        }
    });
    res.json(post);
}));
// @desc  ADD A NEW COMMENTS
// @route GET /api/comment
// @access PRIVATE
exports.addComment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e, _f, _g;
    const { body, postId, userId } = req.body;
    // check if the comment is spammy
    const fetchIsCommentSpam = yield mindsdb_js_sdk_1.default.SQL.runQuery(`SELECT comment, sentiment FROM spam_detection_gpt3 WHERE comment = '${body}';`);
    if (((_d = (_c = fetchIsCommentSpam === null || fetchIsCommentSpam === void 0 ? void 0 : fetchIsCommentSpam.rows[0]) === null || _c === void 0 ? void 0 : _c.sentiment) === null || _d === void 0 ? void 0 : _d.includes("Spam")) ||
        ((_f = (_e = fetchIsCommentSpam === null || fetchIsCommentSpam === void 0 ? void 0 : fetchIsCommentSpam.rows[0]) === null || _e === void 0 ? void 0 : _e.sentiment) === null || _f === void 0 ? void 0 : _f.includes("spam"))) {
        throw new Error("Oops! please check your comment. Our system has detected it is a spam message");
    }
    // check toxicity of comment
    const fetchCommnentToxicity = yield mindsdb_js_sdk_1.default.SQL.runQuery(`SELECT * FROM abuse_detection1 WHERE comment='${body}';`);
    const commentToxicity = (_g = fetchCommnentToxicity === null || fetchCommnentToxicity === void 0 ? void 0 : fetchCommnentToxicity.rows[0]) === null || _g === void 0 ? void 0 : _g.sentiment_explain;
    const isToxic = (0, helpers_1.isToxicFunc)(commentToxicity);
    if (isToxic) {
        throw new Error("Your comment potentially violates our community rules; please help us maintain a healthy environment for the community. Please check your language of the comment.");
    }
    const post = yield db_server_1.db.comment.create({
        data: {
            body,
            postId,
            userId
        }
    });
    res.json(post);
}));
// @desc  GET ALL COMMENTS FOR A POST
// @route GET /api/comment
// @access PRIVATE
exports.getPostComment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (typeof id !== "string") {
        throw new Error("Something went wrong! Please try again");
    }
    const post = yield db_server_1.db.comment.findMany({
        where: {
            postId: id
        },
        include: {
            user: true,
            VoteComment: true
        }
    });
    res.json(post);
}));
// @desc  UPVOTE A POST
// @route GET /api/post/upvote
// @access PRIVATE
exports.postReaction = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { voting, userId, postId, type } = req.body;
    const checkUserVote = yield db_server_1.db.votePost.findFirst({
        where: {
            userId,
            postId
        }
    });
    // If the user has not upvoted the post then add +1
    if (checkUserVote === null && type === "UPVOTE") {
        const vote = yield db_server_1.db.votePost.create({
            data: {
                userId,
                postId
            }
        });
        res.json(vote);
    }
    // If the user wants to downvote the post then add -1
    if (checkUserVote === null && type === "DOWNVOTE") {
        const vote = yield db_server_1.db.votePost.create({
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
        const removeVote = yield db_server_1.db.votePost.delete({
            where: {
                id: checkUserVote === null || checkUserVote === void 0 ? void 0 : checkUserVote.id
            }
        });
        const vote = yield db_server_1.db.votePost.create({
            data: {
                voting: -1,
                userId,
                postId
            }
        });
        res.json(vote);
    }
    // If the user has already downvoted the post but now wants to upvote then delete -1 and add +1
    if (checkUserVote !== null && type === "UPVOTE") {
        const removeVote = yield db_server_1.db.votePost.delete({
            where: {
                id: checkUserVote === null || checkUserVote === void 0 ? void 0 : checkUserVote.id
            }
        });
        const vote = yield db_server_1.db.votePost.create({
            data: {
                userId,
                postId
            }
        });
        res.json(vote);
    }
}));
// @desc  UPVOTE A POST
// @route GET /api/post/comment/reaction
// @access PRIVATE
exports.commentReaction = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { voting, userId, commentId, type } = req.body;
    const checkUserVote = yield db_server_1.db.voteComment.findFirst({
        where: {
            userId,
            commentId
        }
    });
    // If the user has not upvoted the post then add +1
    if (checkUserVote === null && type === "UPVOTE") {
        const vote = yield db_server_1.db.voteComment.create({
            data: {
                userId,
                commentId
            }
        });
        res.json(vote);
    }
    // If the user wants to downvote the post then add -1
    if (checkUserVote === null && type === "DOWNVOTE") {
        const vote = yield db_server_1.db.voteComment.create({
            data: {
                voting: -1,
                userId,
                commentId
            }
        });
        res.json(vote);
    }
    // If the user has already upvoted the post but now wants to downvote then delete +1 and add -1
    if (checkUserVote !== null && type === "DOWNVOTE") {
        const removeVote = yield db_server_1.db.voteComment.delete({
            where: {
                id: checkUserVote === null || checkUserVote === void 0 ? void 0 : checkUserVote.id
            }
        });
        const vote = yield db_server_1.db.voteComment.create({
            data: {
                voting: -1,
                userId,
                commentId
            }
        });
        res.json(vote);
    }
    // If the user has already downvoted the post but now wants to upvote then delete -1 and add +1
    if (checkUserVote !== null && type === "UPVOTE") {
        const removeVote = yield db_server_1.db.voteComment.delete({
            where: {
                id: checkUserVote === null || checkUserVote === void 0 ? void 0 : checkUserVote.id
            }
        });
        const vote = yield db_server_1.db.voteComment.create({
            data: {
                userId,
                commentId
            }
        });
        res.json(vote);
    }
}));
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
//# sourceMappingURL=Post.js.map