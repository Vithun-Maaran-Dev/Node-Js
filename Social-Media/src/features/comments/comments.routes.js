import express from "express";
import { jwtAuth } from "../../middleware/jwtAuth.middleware.js";
import { getAddComments, getCommentsByPostId, getDeleteComments, getUpdateComments } from "./comments.controller.js";

const commentRouter = express.Router();

//calling dynamic routes in order is important. 
commentRouter.get('/:postId', jwtAuth, getCommentsByPostId)
commentRouter.post('/addcomments/:postId', jwtAuth, getAddComments)
commentRouter.delete('/deletecomment', jwtAuth, getDeleteComments)
commentRouter.put('/updatecomment', jwtAuth, getUpdateComments)

export default commentRouter;