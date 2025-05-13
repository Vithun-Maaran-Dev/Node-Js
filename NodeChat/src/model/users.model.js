import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
   username: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
      unique: true,
   },
   age: {
      type: Number,
      required: true,
      min: [18, 'Age must be greater than or equal to 18'],
   },
   password: {
      type: String,
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now(),
   },
   groups: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'group'
      }
   ],
   status: {
      type: String,
      default: 'offline',
      enum: ['online', 'offline'],
   },
});

userSchema.pre('save', async function (next) {
   if (this.isModified('password')) { // Only hash the password if it has been modified
      this.password = await bcrypt.hash(this.password, 12);
   }
   next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {

   if (!candidatePassword || !this.password) {
      throw new Error('Both candidatePassword and hashed password are required');
   }
   const isSuccess = await bcrypt.compare(candidatePassword, this.password);
   return isSuccess
};


const userModel = mongoose.model('user', userSchema);

export default userModel;


