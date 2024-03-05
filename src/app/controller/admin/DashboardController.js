const DashboardController = {
    DashboardPage(req, res) {
        const role = req.user.role
        const data = {
            page_title: 'Dashboard',
            role
        }
        return res.render(
            'admin/dashboard/dashboard',
            {
                layout: 'layout/portal/portal',
                data
            }
        )
    },
    Statistical(req, res){

    }
}

module.exports = DashboardController