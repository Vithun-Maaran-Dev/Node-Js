import { getAllJobs, getJob } from "../models/jobs.model.js";
import { registerUser, loginUser, appliedJobIdByUser } from "../models/users.model.js";


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

     if (req.session.role === "J" || req.session.role === "R" || req.session.role === "Admin") {
          const jobsList = getAllJobs();
          return res.render("jobs", { jobs: jobsList })
     }
     else {
          return res.redirect("login")
     }
}

export const register = (req, res) => {
     const isAdded = registerUser(req.body);

     if (!isAdded) {
          return res.status(400).render('register', { isError: true, errorMessages: ['Something went wrong while Registering. Try after sometime'] });
     }
     return res.status(200).redirect(`login`)
}

// export const applyJob = (req, res) => {
//      const jobId = parseInt(req.params.jobId);
//      if (req.session.role === 'J') {
//           let appliedJobs = []
//           const jobData = addJob(parseInt(req.session._id), jobId);

//           if (jobData.success) {
//                jobData.appliedJobIds.forEach(appliedJobId => {
//                     let job = getJob(appliedJobId.JobId) 


//                })
//           }
//           return res.status(200).render('appliedJob', { appliedJob: appliedJobs })
//      }
//      else {
//           return res.status(200).render('job', { isJob: false, message: 'Something went wrong while appling the Job. Please try after some time' })
//      }
// }


export const appliedJobView = (req, res) => {
     const appliedJobsByUser = appliedJobIdByUser(parseInt(req.session._id));

     if (appliedJobsByUser.success) {
          let jobs = []
          appliedJobsByUser.appliedJobs["appliedjob"].forEach(appliedJobByUser => {
               const jobData = getJob(appliedJobByUser.JobId);
               let job = {
                    id: jobData.id,
                    title: jobData.title,
                    company: jobData.company,
                    appliedDate: appliedJobByUser.appliedDate,
                    status: appliedJobByUser.status
               }
               jobs.push({ ...job })
          });
          return res.status(200).render('appliedJobs', { isAppliedJob: true, appliedJobs: jobs })
     }

     return res.status(404).render('appliedJobs', { isAppliedJob: false, message: 'No Jobs Applied.' })


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
