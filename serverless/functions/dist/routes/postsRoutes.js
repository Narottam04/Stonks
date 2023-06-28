"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const Post_1 = require("../controllers/Post");
exports.postRouter = express_1.default.Router();
exports.postRouter.post("/", (0, express_validator_1.body)("title").isString(), (0, express_validator_1.body)("body").isString(), (0, express_validator_1.body)("userId").isString(), Post_1.addPost);
exports.postRouter.get("/", Post_1.getAllPost);
exports.postRouter.post("/comment", (0, express_validator_1.body)("body").isString(), (0, express_validator_1.body)("postId").isString(), (0, express_validator_1.body)("userId").isString(), Post_1.addComment);
exports.postRouter.post("/comment/reaction", Post_1.commentReaction);
exports.postRouter.post("/reaction", Post_1.postReaction);
exports.postRouter.get("/:id", Post_1.getSinglePost);
exports.postRouter.get("/comment/:id", Post_1.getPostComment);
//# sourceMappingURL=postsRoutes.js.map