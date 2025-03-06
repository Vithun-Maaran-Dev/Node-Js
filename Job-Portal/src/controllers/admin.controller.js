export const adminDashboardView = (req, res) => {
     return res.render('adminDashboard', { sessionEmail: req.session.email });
}
