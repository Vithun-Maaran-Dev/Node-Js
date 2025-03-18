import express from "express";
import { jwtAuth } from "../../middleware/jwtAuth.middleware.js";
import { getAllPosts, getPost, getMyPosts, deleteMyPost, addNewPost, getUpdatePost } from "./posts.controller.js";
import { upload } from "../../middleware/fileUpload.middleware.js";

const postRouter = express.Router();

//calling dynamic routes in order is important. 

postRouter.get('/allposts', jwtAuth, getAllPosts)
postRouter.get('/myposts', jwtAuth, getMyPosts)
postRouter.get('/:postId', jwtAuth, getPost)
postRouter.post('/newpost', jwtAuth, upload.single("file"), addNewPost)
postRouter.put('/updatepost/:postId', jwtAuth, upload.single("file"), getUpdatePost)
postRouter.delete('/delete/:myPostId', jwtAuth, deleteMyPost)

export default postRouter;