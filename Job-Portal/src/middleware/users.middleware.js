export const validateUser = (req, res, next) => {
     let errorMessages = [];
     let isErrror = false;
     const { username, email, password, conpassword, role } = req.body;

     console.log(req.body);


     var regPassword = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,15}$/

     if (username === "" && email === "" && password === "" && conpassword === "" && role === "") {
          isErrror = true;
          errorMessages.push(`Please Fill all the empty fields.`);
     }

     else if (username === "" || username.length === 0) {
          isErrror = true;
          errorMessages.push(`Please Fill User Name.`);
     }
     else if (email === "" || email.length === 0) {
          isErrror = true;
          errorMessages.push(`Please Fill Email.`);
     }
     else if (password === "" || password.length === 0) {
          isErrror = true;
          errorMessages.push(`Please Fill Password.`);
     }
     else if (conpassword === "" || conpassword.length === 0) {
          isErrror = true;
          errorMessages.push(`Please Fill Confrim Password.`);
     }
     else if (password !== conpassword) {
          isErrror = true;
          errorMessages.push(`Password and Confrim Password doesn't match.`);
     }
     else if (!password.match(regPassword)) {
          isErrror = true;
          errorMessages.push(`Invalid Password! , Please Read Password Policy.`);
     }
     else if (role === "" || role.length === 0) {
          isErrror = true;
          errorMessages.push(`Please select the role.`)
     }

     if (isErrror) {
          res.status(406).render(`register`, { isError: true, errorMessages: errorMessages })
     }
     else {
          next()
     }

}