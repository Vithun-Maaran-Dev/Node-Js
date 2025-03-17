import express from "express";
import { jwtAuth } from "../../middleware/jwtAuth.middleware.js";
import { getLikesCount, getToggleLike } from "./likes.controller.js";

const likeRouter = express.Router();

//calling dynamic routes in order is important. 
likeRouter.get('/:postId', jwtAuth, getLikesCount)
likeRouter.get('/toggle/:postId', jwtAuth, getToggleLike)

export default likeRouter;