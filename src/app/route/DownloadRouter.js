const express = require('express')
const route = express.Router()

const {DownloadFileController} = require('../controller')

route.get('/all-files/magazine/:magazine_id', DownloadFileController.AllFileOfFaculties)
route.get('/one-file/:file_name', DownloadFileController.OneFileDownload)
route.get('/all-files/article/:article_id', DownloadFileController.AllFilesDownload)
route.get('/all-files/faculty/:faculty_id/magazine/:magazine_id', DownloadFileController.FacultyAllFilesDownload)


module.exports = route