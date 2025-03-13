import { getJobsWithRecuriterName } from "../models/admin.model.js";
import { getAllUsers } from "../models/users.model.js";

export const adminDashboardView = (req, res) => {
     return res.render('adminDashboard');
}

export const getAdminAllJobs = (req, res) => {

     const jobs = getJobsWithRecuriterName();

     if (jobs.success) {
          return res.status(200).render('adminJobsView', { found: jobs.success, mess: jobs.message, jobs: jobs.jobsDetails })
     }
     else {
          return res.status(400).render('adminJobsView', { found: jobs.success, mess: jobs.message })
     }
}

export const getAdminAllUsers = (req, res) => {

     const users = getAllUsers();

     if (users.length > 0) {
          const userAndRecuriterOnly = users.filter(user => user.role === 'J' || user.role === 'R')
          res.status(200).render('adminUsersView', { users: userAndRecuriterOnly });
     }
     else {
          res.status(400).render(('adminUsersView', { users: [] }))
     }
} 