let users = [
     {
          _id: 1,
          username: `Vithun Maaran`,
          email: `a.vithunmaaran@gmail.com`,
          password: `Vithunmaaran@2000#`,
          role: `Admin`
     },
     {
          _id: 2,
          username: `Joe`,
          email: `Joe@gmail.com`,
          password: `Joe@2000#`,
          role: `J`
     },
     {
          _id: 3,
          username: `Sow`,
          email: `Sow@gmail.com`,
          password: `Sow@2000#`,
          role: `R`
     }
]

export const addUser = (reqData) => {
     try {
          const { username, email, password, role } = reqData;

          if (reqData) {
               const userData = {
                    _id: users.length + 1,
                    username: username,
                    email: email,
                    password: password,
                    role: role
               }
               users.push(userData);
               console.log(users)
               return true;
          }
          else {
               return false;
          }
     }
     catch (err) {
          console.log(err);
          return false;
     }
}