const DashboardController = {
    DashboardPage(req, res) {
        const data = {
            page_title: 'Dashboard'
        }
        return res.render(
            'admin/dashboard/dashboard',
            {
                layout: 'layout/portal/admin/portal',
                data
            }
        )
    },
    Statistical(req, res){

    }
}

module.exports = DashboardController