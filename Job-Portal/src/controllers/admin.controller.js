import { getJobsWithRecuriterName } from "../models/admin.model.js";

export const adminDashboardView = (req, res) => {
     return res.render('adminDashboard');
}

export const getAllJobs = (req, res) => {

     const jobs = getJobsWithRecuriterName();

     if (jobs.success) {
          return res.status(200).render('adminJobsView', { found: jobs.success, mess: jobs.message, jobs: jobs.jobsDetails })
     }
     else {
          return res.status(400).render('adminJobsView', { found: jobs.success, mess: jobs.message })
     }

}