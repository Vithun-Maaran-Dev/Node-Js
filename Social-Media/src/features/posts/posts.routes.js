import express from "express";
import { jwtAuth } from "../../middleware/jwtAuth.middleware.js";
import { getAllPosts, getPost, getMyPosts, deleteMyPost } from "./posts.controller.js";

const postRouter = express.Router();

//calling dynamic routes in order is important. 

postRouter.get('/allposts', jwtAuth, getAllPosts)
postRouter.get('/myposts', jwtAuth, getMyPosts)
postRouter.get('/:postId', jwtAuth, getPost)
postRouter.delete('/delete/:myPostId', jwtAuth, deleteMyPost)

export default postRouter;