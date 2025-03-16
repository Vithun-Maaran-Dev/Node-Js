import express from "express";
import { jwtAuth } from "../../middleware/jwtAuth.middleware.js";
import { getAllPosts, getPost } from "./posts.controller.js";

const postRouter = express.Router();

postRouter.get('/allposts', jwtAuth, getAllPosts)
postRouter.get('/:postId', jwtAuth, getPost)

export default postRouter;