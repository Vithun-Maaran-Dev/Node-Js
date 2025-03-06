export const adminAuth = (req, res, next) => {
     if (!req.session.email) {
          return res.redirect("/login"); // Redirect to login if not logged in
     }

     if (req.session.role === "Admin") {
          next(); // Proceed if user is an admin
     }

     return res.redirect("/"); // Redirect unauthorized users
};
