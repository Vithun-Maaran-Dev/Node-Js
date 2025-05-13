import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
   senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
   },
   text: {
      type: String
   },
   groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'group'
   },
   timestamp: {
      type: Date,
      default: Date.now
   }
});

const messageModel = mongoose.model('message', messageSchema);

export default messageModel;


