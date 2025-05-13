import mongoose from "mongoose";
import messageModel from "../model/message.model.js";

export const sendMessage = async (data) => {

   try {
      const message = new messageModel({
         senderId: new mongoose.Types.ObjectId(data.userId),
         groupId: new mongoose.Types.ObjectId(data.groupId),
         text: data.message.trim(),
      });

      const savedMessage = await message.save();

      if (!savedMessage) {
         return { success: false, mess: `Something error in sending message. Please Login or Reload the chat` }
      }
      // Populate senderId and groupId fields
      const populatedMessage = await messageModel
         .findById(savedMessage._id)
         .populate({ path: 'senderId', model: 'user', select: ["_id", "username"] }) // Populate sender details

      return { success: true, messageData: populatedMessage };
   }
   catch (err) {
      console.log(err)
      return { success: false, mess: `Something went wrong. Please login or Reload the chat` }
   }

}

export const loadPrevMess = async (groupId) => {
   const prevMess = await messageModel.find({ groupId: new mongoose.Types.ObjectId(groupId) })
      .populate({ path: 'senderId', ref: 'user', select: ["_id", "username"] })
      .sort({ timestamp: 1 });

   if (prevMess.length > 0) {
      return { success: true, prevMessArr: prevMess }
   }
   else {
      return { success: false, prevMessArr: [] }
   }


}