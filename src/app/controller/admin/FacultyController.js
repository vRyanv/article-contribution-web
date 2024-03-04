const {FacultyService} = require("../../service");
const {CREATED, BAD_REQUEST, DELETED, UPDATED} = require("../../constant/StatusCode");

const FacultyController = {
    async FacultyManagementPage(req, res) {
        const faculty_list = await FacultyService.GetFacultyList()
        const data = {
            page_title: 'Faculty',
            faculty_list,
        }
        return res.render(
            'admin/faculty/faculty-management',
            {
                layout: 'layout/portal/admin/portal',
                data
            }
        )
    },
    NewFacultyPage(req, res) {
        const data = {
            page_title: 'Faculty',
        }
        return res.render(
            'admin/faculty/new-faculty',
            {
                layout: 'layout/portal/admin/portal',
                data
            }
        )
    },
    async CreateFaculty(req, res) {
        const faculty = await FacultyService.Create(req)
        if (faculty) {
            return res.status(200).json({code: CREATED, message: 'created faculty successfully'})
        }
        return res.status(200).json({code: BAD_REQUEST, message: 'creating faculty failed'})
    },
    async EditFacultyPage(req, res) {
        const faculty = await FacultyService.GetFacultyById(req)
        if (!faculty) {
            return res.render(
                'layout/not-found',
                {layout: false}
            )
        }
        const data = {
            page_title: 'Faculty',
            faculty
        }
        return res.render(
            'admin/faculty/edit-faculty',
            {
                layout: 'layout/portal/admin/portal',
                data
            }
        )
    },
    async UpdateFaculty(req, res){
        const update_result = await FacultyService.Update(req)
        if (update_result) {
            return res.status(200).json({code: UPDATED, message: 'updated faculty successfully'})
        }
        return res.status(200).json({code: BAD_REQUEST, message: 'updating faculty failed'})
    },
    async DeleteFaculty(req, res) {
        const result_delete = await FacultyService.Delete(req)
        if (result_delete) {
            return res.status(200).json({code: DELETED, message: 'deleted faculty successfully'})
        }
        return res.status(200).json({code: BAD_REQUEST, message: 'deleting faculty failed'})
    }
}

module.exports = FacultyController