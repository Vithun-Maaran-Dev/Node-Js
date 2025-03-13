import { getAllJobs, getJob, jobSearch } from "../models/jobs.model.js";
import { appliedJobs } from "../models/users.model.js";


export const jobsView = (req, res) => {
     const jobsList = getAllJobs();
     res.render(`jobs`, { found: true, jobs: jobsList });
}

export const jobView = (req, res) => {
     const jobId = parseInt(req.params.id);

     //checking job exists
     const job = getJob(jobId);
     if (!job) {
          return res.status(404).render('job', { isJob: false, message: 'No such job found.' })
     }

     //Checking is user applied for this job or not
     const userFound = appliedJobs.find(appliedJob => appliedJob.userId === parseInt(req.session._id))

     if (!userFound) {
          return res.status(200).render('job', { isApplied: false, isJob: true, job: job })
     }

     //if user applied for this job
     const isApplied = userFound.appliedjob.find(applyJob => applyJob.JobId === jobId)
     if (!isApplied) {
          return res.status(200).render('job', { isApplied: false, isJob: true, job: job })
     }
     return res.status(200).render('job', { isApplied: true, isJob: true, job: job })

}


export const searchJobs = (req, res) => {
     const { searchJob } = req.body;

     const Jobs = jobSearch(searchJob);

     if (Jobs.success) {
          res.status(200).render(`jobs`, { found: true, jobs: Jobs.jobs });
     }
     else {
          res.status(404).render(`jobs`, { found: false });
     }

}



