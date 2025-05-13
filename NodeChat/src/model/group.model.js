import mongoose from "mongoose";
import bcrypt from "bcrypt"

const groupSchema = mongoose.Schema({
   name: {
      type: String,
      required: true,
      maxLength: 20
   },
   password: {
      type: String,
      required: true,
   },
   invitePasswords: [
      {
         tempPass: String, // Temporary password for the invite
         email: String, // Email of the invited friend
         createdAt: {
            type: Date,
            default: Date.now,
            expires: 3600 // Temporary password expires after 1 hour (optional)
         }
      }
   ],
   members: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "user"
      }
   ],
   createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
});


groupSchema.pre('save', async function (next) {
   if (this.isModified('password')) { // Only hash the password if it has been modified
      this.password = await bcrypt.hash(this.password, 12);
   }
   next();
});

groupSchema.methods.comparePassword = async function (grpPassword) {

   if (!grpPassword || !this.password) {
      throw new Error('Both group password and hashed password are required');
   }
   const isSuccess = await bcrypt.compare(grpPassword, this.password);
   return isSuccess
};

// Generate a temporary password
groupSchema.methods.generateTempPassword = function () {
   return Math.random().toString(36).slice(-8); // Generate an 8-character random password
};

const groupModel = mongoose.model('group', groupSchema);

export default groupModel;