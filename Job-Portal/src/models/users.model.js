let users = [
     {
          _id: 1,
          username: `Admin`,
          email: `admin@gmail.com`,
          password: `Admin@2000#`,
          role: `Admin`,
     },
     {
          _id: 2,
          username: `Vithun Maaran`,
          email: `a.vithunmaaran@gmail.com`,
          password: `Vithun@2000#`,
          role: `J`,
          resume: "VITHUN-MAARAN-Resume.pdf"
     },
     {
          _id: 3,
          username: `Sow`,
          email: `Sow@gmail.com`,
          password: `Sow@2000#`,
          role: `R`,
     }
]

export let appliedJobs = [
     {
          userId: 2,
          appliedjob: [
               {
                    JobId: 2,
                    appliedDate: '28/01/2000',
                    status: 'R'
               }
          ]
     }
]

export const registerUser = (reqData, reqFile) => {
     try {
          const { username, email, password, role } = reqData;
          let resume = "";

          if (reqData) {
               let userData = {};
               if (role === 'J') {
                    resume = reqFile.filename;
                    userData = {
                         _id: users.length + 1,
                         username: username,
                         email: email,
                         password: password,
                         role: role,
                         resume: resume
                    }
               }
               else {
                    userData = {
                         _id: users.length + 1,
                         username: username,
                         email: email,
                         password: password,
                         role: role,
                    }
               }

               users.push(userData);

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

export const loginUser = (reqData) => {

     const { email, password } = reqData;

     let user = users.find(user => user.email === email && user.password === password)

     if (user) {
          return { isLogin: true, data: { _id: user._id, email: user.email, role: user.role } }
     } else {
          return { isLogin: false, data: { message: `Incorrect Username and Password.` } }
     }

}

export const appliedJobIdByUser = (userId) => {
     const appliedJobsData = appliedJobs.find(appliedJob => appliedJob.userId === userId);
     if (appliedJobsData) {
          return { success: true, appliedJobs: appliedJobsData };
     }
     return { success: false }

}

export const addJob = (userId, JobId) => {
     const userData = appliedJobs.find(user => user.userId === userId)
     const date = new Date();
     const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

     if (userData) {

          userData.appliedjob.push({ JobId: JobId, appliedDate: formattedDate, status: 'W' });

          return { success: true, appliedJobIds: userData.appliedjob };
     }
     else {
          // Create new user entry
          const newUser = { userId: userId, appliedjob: [{ JobId: JobId, appliedDate: formattedDate, status: 'W' }] };
          appliedJobs.push(newUser);

          return { success: true, appliedJobIds: newUser.appliedjob };
     }
     // return { success: false, appliedJobIds: [] }
}

export const getProfileDetails = (userId) => {
     const profileDetails = users.find((user => user._id === userId));

     if (profileDetails) {
          return profileDetails;
     }
     return {};
}

export const resumeUpdate = (userId, reqNewResume) => {
     let user = users.find((user => user._id === userId));

     if (user) {
          user.resume = reqNewResume.filename;
          return { isUpdated: true, user: user }
     }
     else {
          return { isUpdated: false, user: user }
     }
}



