const express = require('express')
const route = express.Router()

const {DownloadFileController} = require('../controller')

route.get('/one-file/:file_name', DownloadFileController.OneFileDownload)
route.get('/all-files/:article_id', DownloadFileController.AllFilesDownload)


module.exports = route