import { addUser } from "../models/users.model.js";

export const loginView = (req, res) => {
     res.render('login');
}

export const registerView = (req, res) => {
     res.render('register', { isError: false, errorMessages: [] })
};

export const login = (req, res) => {

}

export const register = (req, res) => {
     const isAdded = addUser(req.body);

     if (!isAdded) {
          return res.status(400).render('register', { isError: true, errorMessages: ['Something went wrong while Registering. Try after sometime'] });
     }
     return res.status(200).redirect(`login`)
}