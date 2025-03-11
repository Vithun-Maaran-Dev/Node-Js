import { getApplicant, getJobWithRecuriter } from "../models/jobs.model.js";
import { getPostedJob } from "../models/recuriter.model.js";

export const getPosedJobsView = (req, res) => {
     const recuriterId = parseInt(req.session._id);

     const filteredJobs = getPostedJob(recuriterId);

     if (filteredJobs.found) {
          return res.status(200).render('postedJobs', { found: true, jobs: filteredJobs.postedJobs })
     }
     else {
          return res.status(404).render('postedJobs', { found: false, message: 'No jobs posted .' })
     }
}

export const getPostJobView = (req, res) => {
     return res.status(200).render('postJob')
}


export const getApplicantsView = (req, res) => {
     const jobId = parseInt(req.params.jobid);
     const recuriterId = req.session._id;

     const job = getJobWithRecuriter(jobId, recuriterId);
     if (!job) {
          return res.status(404).render('appliedApplicants', { isFound: false, message: 'Job not found.' })
     }
     const users = getApplicant(job.applicant_id);

     if (users.success) {
          return res.status(200).render('appliedApplicants', { isFound: true, users: users.appliedApplicants })
     }
     else {
          return res.status(404).render('appliedApplicants', { isFound: false, message: 'No Applicants applied for this job.' })
     }

}