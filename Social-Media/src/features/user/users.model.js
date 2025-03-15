let usersData = [
     {
          id: 1,
          name: "vithun",
          email: "a.vithun@gmail.com",
          password: "Vithun@2000#"
     },
     {
          id: 2,
          name: "Vetri",
          email: "a.vetri@gmail.com",
          password: "Vetri@2000#"
     }
]

export const isUserLogin = (email, pass) => {

     const isUser = usersData.find(user => user.email === email && user.password === pass)

     if (isUser) {
          return { success: true, user: isUser }
     }
     else {
          return { sucess: false }
     }

}

export const isUserRegister = (reqData) => {
     const { name, email, password } = reqData

     if (name !== "" && email !== "" && password !== "") {
          const userData = {
               id: usersData.length + 1,
               name: name,
               email: email,
               password: password
          }

          usersData.push(userData);

          return { success: true, user: userData };
     }
     else {
          return { success: false }
     }
}

export const allUsers = () => {
     return usersData;
}

