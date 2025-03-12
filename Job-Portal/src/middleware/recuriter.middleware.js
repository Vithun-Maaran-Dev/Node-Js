export const validateJob = (req, res, next) => {
     let errorMessages = [];
     let isError = false;

     const { title, company, location, type, salary, posted_date, description, skills, requirements } = req.body;

     if (!title || !company || !location || !type || !salary || !posted_date || !description || !skills || !requirements) {
          isError = true;
          errorMessages.push(`Please fill all fields.`);
     }
     if (!title) errorMessages.push(`Please fill Job Title.`);
     if (!company) errorMessages.push(`Please fill company.`);
     if (!location) errorMessages.push(`Please fill location.`);
     if (!type) errorMessages.push(`Please fill type.`);
     if (!salary) errorMessages.push(`Please fill salary.`);
     if (!description) errorMessages.push(`Please fill description.`);
     if (posted_date === "J") errorMessages.push(`Please fill posted date`);
     if (!skills) errorMessages.push(`Please fill skills.`);
     if (!requirements) errorMessages.push(`Please fill requirements.`);

     if (errorMessages.length > 0) {
          return res.status(406).render(`postJob`, { isError: true, errorMessages });
     }
     next();
}