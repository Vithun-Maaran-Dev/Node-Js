import { getJobWithRecuriter } from "../models/jobs.model.js";
import { addjob, getApplicant, getPostedJob, updateApplicantStatus } from "../models/recuriter.model.js";


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
     return res.status(200).render('postJob', { isError: false })
}
export const getApplicantsView = (req, res) => {
     const jobId = parseInt(req.params.jobid);
     const recuriterId = req.session._id;

     const job = getJobWithRecuriter(jobId, recuriterId);
     if (!job) {
          return res.status(404).render('appliedApplicants', { isFound: false, message: 'Job not found.' })
     }
     const users = getApplicant(job);

     if (users.success) {
          return res.status(200).render('appliedApplicants', { isFound: true, users: users.appliedApplicants, jobId: jobId })
     }
     else {
          return res.status(404).render('appliedApplicants', { isFound: false, message: 'No Applicants applied for this job.' })
     }
}
export const applicantStatus = (req, res) => {
     const { userId, jobId, statusType } = req.body;
     const recuriterId = req.session._id;

     const data = updateApplicantStatus(parseInt(userId), parseInt(jobId), statusType)

     if (data) {
          const job = getJobWithRecuriter(parseInt(jobId), recuriterId);

          if (!job) {
               return res.status(404).render('appliedApplicants', { isFound: false, message: 'Something went Wrong' })
          }
          const users = getApplicant(job);

          if (users.success) {
               return res.status(200).render('appliedApplicants', { isFound: true, users: users.appliedApplicants, jobId: jobId })
          }
          else {
               return res.status(404).render('appliedApplicants', { isFound: false, message: 'No such applicant find. We are working on the issue' })
          }

     }
     else {
          return res.status(404).render('appliedApplicants', { isFound: false, message: 'Something went wrong while updating the status' })
     }

}

export const postJob = (req, res) => {
     const recuriterId = parseInt(req.session._id)
     const isPosted = addjob(req.body, recuriterId)

     if (isPosted.success) {
          const filteredJobs = getPostedJob(recuriterId);

          return res.status(200).render('postedJobs', { found: true, jobs: filteredJobs.postedJobs })
     }
     else {
          return res.status(400).render(`postJob`, { isError: true, errorMessages: ['Error adding new job. Try after sometime.'] });
     }
}
