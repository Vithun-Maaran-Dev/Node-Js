import { getAllJobs } from "./jobs.model.js"
import { getAllUsers } from "./users.model.js";

export const getJobsWithRecuriterName = () => {

     let jobsWithRecuriterName = []

     const jobs = getAllJobs();
     const users = getAllUsers();

     if (jobs.length > 0 && users.length > 0) {
          jobs.forEach((job) => {
               const userdetails = users.find((user) => job.recuriter_id === user._id)
               jobsWithRecuriterName.push({ ...job, recuriterName: userdetails.username })
          })

          if (jobsWithRecuriterName.length > 0) {
               return { success: true, jobsDetails: jobsWithRecuriterName }
          }
          else {
               return { success: false, message: `Something went wrong while fetching jobs with recuriter name.` }
          }
     }
     else {
          return { success: false, message: `No Jobs or User found in application` }
     }






}