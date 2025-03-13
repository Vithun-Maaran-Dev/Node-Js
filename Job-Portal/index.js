import express from "express"
import path from "path"
import ejsLayout from "express-ejs-layouts"
import session from "express-session";


//import controller
import { loginView, registerView, login, register, appliedJobView, logout, applyJob, myProfile, updateResume } from "./src/controllers/users.controller.js";
import { validateUser } from "./src/middleware/users.middleware.js";
import { upload } from "./src/middleware/uploadResume.middleware.js";
import { adminDashboardView } from "./src/controllers/admin.controller.js";
import { adminAuth, userAuth, recuriterAuth } from "./src/middleware/auth.middleware.js";
import { jobsView, jobView } from "./src/controllers/jobs.controller.js";
import { deleteExistingPdf } from "./src/middleware/deletePdfFile.middleware.js";
import { getPosedJobsView, getPostJobView, getApplicantsView, applicantStatus, postJob, getUpdateJobView, updateJob, deleteJob } from "./src/controllers/recuriter.controller.js";
import { validateJob } from "./src/middleware/recuriter.middleware.js";

//creating server
const server = express();

server.set('view engine', 'ejs');
server.set('views', path.resolve(`src`, `views`))
server.use(ejsLayout);
server.use(express.static('public'));

server.use(express.json())
server.use(express.urlencoded({ extended: true }));


server.use(session({
     secret: `SearchJobNest`,
     resave: false,
     saveUninitialized: true,
     cookie: {
          secure: false
     }
}))

//Making session globally to access in side side the application
server.use((req, res, next) => {
     res.locals.session = req.session;  //making session in all views
     next();
})

server.get(`/`, (req, res) => {
     res.render("index")
});

//index view
server.get(`/login`, loginView);
server.get(`/register`, registerView);


//login and register post func
server.post(`/login`, login)
server.post(`/register`, upload.single("resume"), validateUser, register)

//logout
server.get(`/logout`, logout);

//jobs routes
server.get(`/jobs`, jobsView)
server.get('/jobs/:id', jobView)

//user routes
server.post('/apply', userAuth, applyJob);
server.get('/appliedJob', userAuth, appliedJobView)
server.get('/user/myprofile', userAuth, myProfile)
server.post('/update/resume', userAuth, upload.single("newresume"), deleteExistingPdf, updateResume);

//recuriter routes
server.get('/recuriter/myprofile', recuriterAuth, myProfile)
server.get('/recuriter/jobposted', recuriterAuth, getPosedJobsView)
server.get('/recuriter/jobs/applicants/:jobid', recuriterAuth, getApplicantsView)
server.post('/recuriter/applicant/job/action', recuriterAuth, applicantStatus)
server.get('/recuriter/postjob', recuriterAuth, getPostJobView)
server.post('/recuriter/addjob', recuriterAuth, validateJob, postJob)
server.get('/recuriter/job/update/:jobId', recuriterAuth, getUpdateJobView)
server.post('/recuriter/job/updatejob', recuriterAuth, validateJob, updateJob)
server.get('/recuriter/job/delete/:jobId', recuriterAuth, deleteJob)


//admin routes
server.get(`/adminDashboard`, adminAuth, adminDashboardView)







//creating port
server.listen(5000, (err) => {
     if (err) {
          console.log(err)
     }
     else {
          console.log(`server is running...`);
     }
})