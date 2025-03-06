export const adminAuth = (req, res, next) => {

     if (req.session.email && req.session.role === "Admin") {
          return next(); // Proceed if user is an admin
     }
     else {
          return res.redirect("/login"); // Redirect unauthorized users
     };
}

