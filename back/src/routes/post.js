import express from "express";
import {
  createPost,
  getPost,
  getPosts,
  getUserPosts,
  likePost,
  makeComment,
  editPost,
  editComment,
  deleteComment,
  deletePost,
} from "../controllers/post/index.js";
import upload from "../middleware/multer.js";
import { verifyAccessToken } from '../helpers/jwt.js';
import { verifyPostOwnership, verifyCommentOwnership } from "../middleware/ownership.js";

const router = express.Router();


router.use(verifyAccessToken);

router.post("/new_post", upload, createPost);
router.get("/posts", getPosts);
router.get("/posts/:userId", getUserPosts);
router.get("/:id", getPost);
router.post("/:id/like", likePost);
router.post("/:id/comment", makeComment);
router.put("/:id", verifyPostOwnership, editPost);
router.put("/:id/comment/:commentId", verifyCommentOwnership, editComment);
router.delete("/:id/comment/:commentId/user/:userId", verifyCommentOwnership, deleteComment);
router.delete("/:id", verifyPostOwnership, deletePost);


export default router;
