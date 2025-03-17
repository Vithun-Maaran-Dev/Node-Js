import express from "express";
import { jwtAuth } from "../../middleware/jwtAuth.middleware.js";
import { getLikesCount } from "./likes.controller.js";

const likeRouter = express.Router();

//calling dynamic routes in order is important. 
likeRouter.get('/:postId', jwtAuth, getLikesCount)

export default likeRouter;