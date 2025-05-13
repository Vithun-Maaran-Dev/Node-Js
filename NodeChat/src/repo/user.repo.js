import mongoose from "mongoose";
import groupModel from "../model/group.model.js";
import userModel from "../model/users.model.js";

export const findUserRepo = async (email) => {
   const existingUser = await userModel.findOne({ email: email }).select('_id username email password status');

   if (existingUser) {
      return { success: true, userData: existingUser }
   }
   else {
      return { success: false }
   }
}

export const registerUserRepo = async (userData) => {

   const user = new userModel(userData)
   const savedUser = await user.save()

   if (savedUser) {
      return { success: true }
   }
   else {
      return { success: false }
   }
}

export const getGroupRepo = async (userId) => {
   const userData = await userModel.findById(userId)
      .populate({ path: 'groups', model: 'group', select: ['_id', 'name', 'members'] })
      .select("groups");

   if (userData && userData.groups && userData.groups.length > 0) {
      return { success: true, groups: userData.groups };
   } else {
      return { success: false, mess: "No groups found." };
   }
};

export const joinGroupRepo = async (groupId, userId) => {
   const session = await mongoose.startSession();
   session.startTransaction();

   try {

      // Check if the user is already in the group
      const user = await userModel.findById(userId).select("groups");
      if (user.groups.includes(groupId)) {
         await session.endSession();
         return { success: false, mess: "You are already in the group." };
      }

      // Check if the group already has the user as a member
      const group = await groupModel.findById(groupId).select("members");
      if (group.members.includes(userId)) {
         await session.endSession();
         return { success: false, mess: "You are already in the group." };
      }

      const addGroupToUser = await userModel.findByIdAndUpdate(
         userId,
         {
            $push: {
               groups: new mongoose.Types.ObjectId(groupId)
            }
         },
         { new: true, session }
      );

      const addUserToGroup = await groupModel.findByIdAndUpdate(
         groupId,
         {
            $push: {
               members: new mongoose.Types.ObjectId(userId)
            }
         },
         { new: true, session }
      ).select("_id name members");

      if (addGroupToUser && addUserToGroup) {
         await session.commitTransaction();
         session.endSession();
         return { success: true, group: addUserToGroup };
      } else {
         throw new Error("Failed to update user or group.");
      }
   } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error in joinGroupRepo:", error.message);
      return { success: false, mess: "An error occurred while joining the group." };
   }
};
