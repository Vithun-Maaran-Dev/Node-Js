import { findGroup } from '../src/repo/group.repo.js';
import { loadPrevMess, sendMessage } from '../src/repo/message.repo.js';

export default async function socketHandler(io) {
   io.on("connection", (socket) => {

      socket.on("join", async (data) => {

         // Join the room
         socket.join(data.roomId);

         //load chatHeader
         const groupDetails = await findGroup(data.roomId);
         socket.emit('loadChatHeader', {
            groupId: groupDetails.groupData._id,
            groupName: groupDetails.groupData.name
         })

         //Emit previous messages
         const previousMessages = await loadPrevMess(data.roomId) // Sort messages by timestamp in ascending order
         socket.emit('loadPrvChat', previousMessages.prevMessArr);

         //Emit a welcome message to the user who joined
         socket.emit("welcome-message", { text: `Welcome, ${data.senderId}!` });

         //Broadcast a message to all other users in the same room
         socket.broadcast.to(data.roomId).emit("join-msg", {
            text: `${data.senderId} has joined the room.`,
         });
      });

      socket.on("sendMessage", async (data) => {

         const savedMessageDetails = await sendMessage(data)

         if (savedMessageDetails.success) {
            // Broadcast the received message to all users in the same room
            await io.to(data.groupId).emit("message", {
               userId: savedMessageDetails.messageData.senderId._id,
               username: savedMessageDetails.messageData.senderId.username,
               text: savedMessageDetails.messageData.text,
               timestamp: savedMessageDetails.messageData.timestamp
            });

         }
         else {
            socket.broadcast.to(data.groupId).emit('mess-error', {
               errorMess: savedMessageDetails.mess
            })
         }
      });

      socket.on("disconnect", () => {
      });
   });
}