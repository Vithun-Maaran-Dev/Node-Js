import { registerUser, loginUser } from "../models/users.model.js";

export const loginView = (req, res) => {
     res.render('login', { isError: false, errorMessage: `` });
}

export const registerView = (req, res) => {
     res.render('register', { isError: false, errorMessages: [] })
};

export const login = (req, res) => {

     const isUser = loginUser(req.body);

     if (!isUser.isLogin) {
          return res.status(404).render('login', { isError: true, errorMessage: isUser.data["message"] })
     }

     req.session.email = isUser.data["email"];
     req.session.role = isUser.data["role"];
     req.session._id = isUser.data["_id"];

     if (req.session.role === "J") {
          return res.status(200).redirect("jobs")
     }
     else if (req.session.role === "R") {
          return res.status(200).redirect("postedJobs")
     }
     else if (req.session.role === "Admin") {
          return res.status(200).render("adminDashboard", { sessionEmail: req.session.email })
     }

}

export const register = (req, res) => {
     const isAdded = registerUser(req.body);

     if (!isAdded) {
          return res.status(400).render('register', { isError: true, errorMessages: ['Something went wrong while Registering. Try after sometime'] });
     }
     return res.status(200).redirect(`login`)
}

export const logout = (req, res) => {
     req.session.destroy((err) => {
          if (err) {
               return res.status(500).json({ message: "Logout failed!" });
          }
          res.clearCookie("connect.sid"); // Clear session cookie (for express-session)
          res.status(200).redirect("login");
     });
};
