import express from "express"
import { jwtAuth } from "../../utils/auth.js"
import { createGroup, getGroupInfo } from "../controller/group.controller.js"

const groupRouter = express.Router()

groupRouter.post("/create-group", jwtAuth, createGroup)
groupRouter.post("/get-group-info", jwtAuth, getGroupInfo)


export default groupRouter