export const validateUser = (req, res, next) => {
   let errorMessages = [];
   const { username, email, password, conpassword, age } = req.body;
   const regPassword = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,15}$/;

   if (!username || !email || !password || !conpassword || !age) {
      errorMessages.push(`Please fill all fields.`);
   }
   if (!username) errorMessages.push(`Please fill User Name.`);
   if (!email) errorMessages.push(`Please fill Email.`);
   if (!password) errorMessages.push(`Please fill Password.`);
   if (!conpassword) errorMessages.push(`Please fill Confirm Password.`);
   else if (password !== conpassword) errorMessages.push(`Passwords do not match.`);
   else if (!password.match(regPassword)) errorMessages.push(`Invalid Password! Read Password Policy.`);
   if (!age && parseInt(age) >= 18) errorMessages.push(`Please fill the age. Age should be greater than 18+`);

   if (errorMessages.length > 0) {
      return res.status(406).render(`register`, { isError: true, errorMessages });
   }
   next();
};