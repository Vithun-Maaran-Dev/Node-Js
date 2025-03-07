import { getAllJobs, getJob } from "../models/jobs.model.js";


export const jobsView = (req, res) => {
     const jobsList = getAllJobs();
     res.render(`jobs`, { jobs: jobsList });
}

export const jobView = (req, res) => {
     const jobId = parseInt(req.params.id);

     const job = getJob(jobId);
     if (!job) {
          return res.status(404).render('job', { isJob: false })
     }
     return res.status(200).render('job', { isJob: true, job: job })
}

