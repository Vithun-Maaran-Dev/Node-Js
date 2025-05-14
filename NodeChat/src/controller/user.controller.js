import generateOtp from "../../utils/generateNumber.js";
import sendMailer from "../../utils/nodemailer.js";
import { findGroup } from "../repo/group.repo.js";
import { registerUserRepo, findUserRepo, getGroupRepo, joinGroupRepo } from "../repo/user.repo.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

export const loginView = (req, res) => {
   if (req.session.email) {
      return req.session.destroy((err) => {
         if (err) {
            return res.status(500).json({ message: "Some Internal error occur while going to login." });
         }
         res.clearCookie("connect.sid"); // Clear session cookie (for express-session)
         res.clearCookie("authToken");
         res.status(200).redirect("login");
      });
   }

   return res.render('login', { isError: false, errorMessage: `` });
}
export const homeView = (req, res) => {
   res.status(200).render("home")
}
export const registerView = (req, res) => {
   if (req.session.email) {
      return req.session.destroy((err) => {
         if (err) {
            return res.status(500).json({ message: "Some Internal error occur while going to login." });
         }
         res.clearCookie("connect.sid"); // Clear session cookie (for express-session)
         res.clearCookie("authToken");
         res.status(200).redirect("register");
      });
   }

   return res.render('register', { isError: false, errorMessages: [] })
}
export const register = async (req, res) => {
   try {

      const isExistingUser = await findUserRepo(req.body.email)
      if (isExistingUser.success) {
         return res.status(400).render('register', { isError: true, errorMessages: ['Email already registered. Please log in instead.'] })
      }

      const isUserAdded = await registerUserRepo(req.body)

      if (!isUserAdded.success) {
         return res.status(400).render('register', { isError: true, errorMessages: ['Something went wrong while Registering. Try after sometime'] });
      }
      return res.status(200).redirect(`login`)
   }
   catch (err) {
      res.status(400).send({ success: false, errMess: err.message })
   }
}
export const login = async (req, res) => {
   try {
      const { email, password } = req.body;

      if (!email && !password) {
         return res.status(400).render("login", { isError: true, errorMessage: "Please enter email and password." })
      }

      const isExistingUser = await findUserRepo(req.body.email);
      if (!isExistingUser.success) {
         return res.status(400).render("login", { isError: true, errorMessage: "Email does not exist. Please register." })
      }

      const isPassMatch = await isExistingUser.userData.comparePassword(password);

      if (!isPassMatch) {
         return res.status(400).render("login", { isError: true, errorMessage: "Password Incorrect." })
      }

      const token = jwt.sign(
         {
            email: isExistingUser.userData.email,
            id: isExistingUser.userData._id
         },//payload
         process.env.SECRET_KEY, //secret key
         { expiresIn: '1h' } //duration time
      )

      req.session.email = isExistingUser.userData.email;
      req.session.username = isExistingUser.userData.username;
      req.session._id = isExistingUser.userData._id;

      res.cookie("authToken", token, { httpOnly: true, maxAge: 3600000 });
      return res.status(200).redirect("/api/user/home");
   }
   catch (err) {
      return res.status(400).render("login", { isError: true, errorMessage: err.message })
   }
}
export const sendEmail = async (req, res) => {
   try {
      const userEmail = req.body.email

      const otp = await generateOtp();

      let mailTextContent = `Please enter OTP : ${otp} to verify your email account. `
      let mailSubject = `Email Verification - ${new Date().toLocaleString()} `

      const emailStatus = await sendMailer(userEmail, mailSubject, mailTextContent);

      if (!emailStatus.success) {
         return res.status(404).send({ success: emailStatus.success, email_status: emailStatus.msg });
      }
      else {
         const hashedOTP = await bcrypt.hash(String(otp), 12)
         return res.status(200)
            .cookie("otp", hashedOTP, { maxAge: 1 * 60 * 1000, httpOnly: true })
            .send({ success: emailStatus.success })
      }
   }
   catch (err) {
      res.status(400).send({ success: false, errMess: err.message })
   }
}
export const verifyOtp = async (req, res) => {
   const { otp } = req.cookies;
   const userOtp = req.body.otp

   if (!otp) {
      return res.status(400).send({ success: false, mess: `OTP expired.` })
   }

   try {
      const isMatch = await bcrypt.compare(userOtp, otp);
      if (isMatch) {
         return res.status(200).send({ success: true, mess: "Email Verified" })
      }
      else {
         return res.status(404).send({ success: false, mess: "OTP not Matched." })
      }
   }
   catch (err) {
      return res.status(400).send({ success: false, mess: err.message })
   }
}
export const getGroups = async (req, res) => {
   try {
      const userId = req.params.userId
      const loginUserId = req.session._id

      if (loginUserId !== userId) {
         return req.session.destroy((err) => {
            if (err) {
               return res.status(500).json({ message: "Some Internal error occur while feetching ur chats. Please login" });
            }
            res.clearCookie("connect.sid"); // Clear session cookie (for express-session)
            res.clearCookie("authToken");
            res.status(200).redirect("/api/user/login");
         });
      }

      const isGroups = await getGroupRepo(loginUserId)

      if (isGroups.success) {
         return res.status(200).send({ success: true, groupData: isGroups.groups })
      }
      else {
         return res.status(200).send({ success: false, groupData: [] })
      }
   }
   catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, mess: `Something went wrong..` })
   }
}
export const joinGroup = async (req, res) => {
   try {
      const { groupId, groupPassword, LoginEmailId } = req.body;

      // Check if the group exists
      const group = await findGroup(groupId);
      if (!group) {
         return res.status(400).send({ success: false, mess: `Group not found. Please check the group ID.` });
      }

      // Validate the temporary password
      const inviteIndex = group.groupData.invitePasswords.findIndex((invite) =>
         invite.tempPass === groupPassword.trim() &&
         invite.email === LoginEmailId
      );
      if (inviteIndex !== -1) {
         // Add the user to the group
         const isJoined = await joinGroupRepo(groupId, req.userId);

         if (isJoined.success) {
            // Remove the used temporary password
            group.groupData.invitePasswords.splice(inviteIndex, 1);
            await group.groupData.save();

            return res.status(200).send({ mess: `You joined the group.`, groupData: isJoined.group });
         } else {
            return res.status(400).send({ mess: isJoined.mess });
         }
      }

      // If the temporary password is invalid, check the main password
      const isPassMatch = await group.groupData.comparePassword(groupPassword);
      if (!isPassMatch) {
         return res.status(400).send({ success: false, mess: `Invalid group password.` });
      }

      // Add the user to the group
      const isJoined = await joinGroupRepo(groupId, req.userId);
      if (isJoined.success) {
         return res.status(200).send({ mess: `You joined the group.`, groupData: isJoined.group });
      } else {
         return res.status(400).send({ mess: isJoined.mess });
      }
   } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, mess: `Something went wrong..` });
   }
};
export const getGroupMessage = async (req, res) => {

   try {
      const groupId = req.body

      const isChat = await getGroupRepo(groupId)
   }
   catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, mess: `Something went wrong..` })
   }
}
export const sendFrndInvite = async (req, res) => {
   try {
      const { groupId, frndEmail } = req.body;

      // Check if the group exists
      const group = await findGroup(groupId);
      if (!group.success) {
         return res.status(400).send({ success: false, mess: `Group not found. Please select a valid group.` });
      }

      // Generate a unique temporary password
      const tempPass = group.groupData.generateTempPassword();

      // Add the temporary password to the group's invitePasswords array
      group.groupData.invitePasswords.push({ tempPass, email: frndEmail });
      await group.groupData.save();

      // Prepare the email content
      const mailTextContent = `You have been invited to join the group! 
                              Group ID: ${groupId}
                              Temporary Password: ${tempPass}
                              Use this password to join the group and start chatting!`;

      const mailSubject = `You're invited to join the group! - ${new Date().toLocaleString()}`;

      // Send the email
      const emailStatus = await sendMailer(frndEmail, mailSubject, mailTextContent);

      if (!emailStatus.success) {
         return res.status(404).send({ success: false, mess: emailStatus.msg });
      }

      return res.status(200).send({ success: true, mess: emailStatus.msg });
   } catch (err) {
      console.log(err);
      return res.status(400).send({ success: false, mess: `Something went wrong..` });
   }
};
export const logout = (req, res) => {
   if (req.session.email && req.cookies.authToken) {
      return req.session.destroy((err) => {
         if (err) {
            return res.status(500).json({ message: "Some Internal error occur while going to login." });
         }
         res.clearCookie("connect.sid"); // Clear session cookie (for express-session)
         res.clearCookie("authToken");
         res.status(200).redirect("login");
      });
   }
}

