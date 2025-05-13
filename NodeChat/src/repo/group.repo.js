import mongoose, { model } from "mongoose"
import groupModel from "../model/group.model.js";
import userModel from "../model/users.model.js";


export const createGroupRepo = async (reqData, userId) => {

   const group = new groupModel({
      name: reqData.groupName.trim(),
      password: reqData.groupPassword,
      members: [new mongoose.Types.ObjectId(reqData.userId)], // Add userId to the members array
      createdBy: reqData.userId  // Set the userId as the creator
   });

   // Save the group to the database (optional, if needed)
   const grpSaved = await group.save();

   //while group created, Then added the new group to the user how created
   await userModel.findByIdAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId) },
      {
         $push: {
            groups: grpSaved._id
         }
      },
      {
         new: true
      }
   )

   if (grpSaved) {
      // Query the database again to select specific fields
      const selectedGroup = await groupModel.findById(grpSaved._id)
         //.populate({ path: 'createdBy', model: 'user', select: ["username", "email"] })
         //.populate({ path: 'members', model: 'user', select: ["username", "email"] })
         .select("_id name members");
      return { success: true, group: selectedGroup };
   } else {
      return { success: false, mess: `Error in creating the group.` };
   }
}

export const findGroup = async (groupId) => {
   const groupExist = await groupModel.findById(groupId).select("_id password name invitePasswords")

   if (!groupExist) {
      return { success: false }
   }
   return { success: true, groupData: groupExist }
}

export const getGroupData = async (grpId) => {

   const groupExist = await groupModel.findById(grpId)
      .populate({ path: "members", model: "user", select: ["_id", "username", "email"] })
      .populate({ path: "createdBy", model: "user", select: ["_id", "username", "email"] })
      .select("_id name members createdBy createdAt")

   if (!groupExist) {
      return { success: false }
   }
   return { success: true, groupData: groupExist }
}