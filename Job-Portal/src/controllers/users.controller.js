import { addApplicant, getAllJobs, getJob } from "../models/jobs.model.js";
import { registerUser, loginUser, appliedJobIdByUser, addJob, getProfileDetails, resumeUpdate } from "../models/users.model.js";


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

     const isAdded = registerUser(req.body, req.file ? req.file : "");

     if (!isAdded) {
          return res.status(400).render('register', { isError: true, errorMessages: ['Something went wrong while Registering. Try after sometime'] });
     }
     return res.status(200).redirect(`login`)
}

export const applyJob = (req, res) => {
     const jobId = parseInt(req.body.jobId);
     const userId = parseInt(req.session._id);

     if (req.session.role === 'J') {
          let appliedJobs = [];

          const jobData = addJob(userId, jobId);
          const applicantAdded = addApplicant(userId, jobId);

          if (jobData.success && applicantAdded) {
               jobData.appliedJobIds.forEach(appliedJob => {
                    let job = getJob(appliedJob.JobId);

                    // Ensure job is valid and has necessary details
                    if (job) {
                         let jobJson = {
                              id: job.id,
                              title: job.title,
                              company: job.company,
                              appliedDate: appliedJob.appliedDate, // Add applied date
                              status: appliedJob.status, // Add status
                         };

                         appliedJobs.push(jobJson);
                    }
               });

               //console.log(appliedJobs);
               return res.status(200).render('appliedJobs', { isAppliedJob: true, appliedJobs: appliedJobs });
          } else {
               return res.status(200).render('job', { isJob: false, message: 'Something went wrong while applying for the Job. Please try again later.' });
          }
     }
     else {
          return res.redirect('login');
     }
};

export const appliedJobView = (req, res) => {
     const userId = parseInt(req.session._id);
     const appliedJobsByUser = appliedJobIdByUser(userId);

     if (appliedJobsByUser.success) {
          let jobs = [];

          appliedJobsByUser.appliedJobs["appliedjob"].forEach(appliedJobByUser => {
               const jobData = getJob(appliedJobByUser.JobId);

               // Ensure jobData is valid before adding to response
               if (jobData) {
                    let job = {
                         id: jobData.id,
                         title: jobData.title,
                         company: jobData.company,
                         appliedDate: appliedJobByUser.appliedDate, // Add applied date
                         status: appliedJobByUser.status // Add status
                    };
                    jobs.push(job);
               }
          });

          // Return JSON response instead of rendering an EJS page
          return res.status(200).render('appliedJobs', { isAppliedJob: true, appliedJobs: jobs });
     }

     return res.status(404).render('appliedJobs', { isAppliedJob: false, message: 'No jobs applied.' });
};

export const myProfile = (req, res) => {

     const userId = parseInt(req.session._id)
     const profileDetail = getProfileDetails(userId);
     if (profileDetail)
          return res.status(200).render('myProfile', { isError: false, errMess: ``, profileDetail: profileDetail })

     return res.redirect('login')
}

export const updateResume = (req, res) => {
     const userId = parseInt(req.session._id)
     const reqNewResume = req.file;

     const userDetail = resumeUpdate(userId, reqNewResume);

     if (userDetail.isUpdated) {
          return res.status(200).render('myProfile', { isError: false, errMess: ``, profileDetail: userDetail.user })
     }
     else {
          return res.status(400).render('myProfile', { isError: true, errMess: `Something went wrong uploading your resume.`, profileDetail: userDetail.user })
     }
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
