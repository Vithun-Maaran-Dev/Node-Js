export const validateUser = (req, res, next) => {
     let errorMessages = [];
     let isError = false;

     const { username, email, password, conpassword, role } = req.body;
     const resume = req.file; // Check req.file instead of req.body.resume

     const regPassword = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,15}$/;

     if (!username || !email || !password || !conpassword || !role) {
          isError = true;
          errorMessages.push(`Please fill all fields.`);
     }
     if (!username) errorMessages.push(`Please fill User Name.`);
     if (!email) errorMessages.push(`Please fill Email.`);
     if (!password) errorMessages.push(`Please fill Password.`);
     if (!conpassword) errorMessages.push(`Please fill Confirm Password.`);
     else if (password !== conpassword) errorMessages.push(`Passwords do not match.`);
     else if (!password.match(regPassword)) errorMessages.push(`Invalid Password! Read Password Policy.`);
     if (!role) errorMessages.push(`Please select a role.`);
     if (role === "J" && !resume) errorMessages.push(`Please upload your resume.`);

     if (errorMessages.length > 0) {
          return res.status(406).render(`register`, { isError: true, errorMessages });
     }
     next();
};