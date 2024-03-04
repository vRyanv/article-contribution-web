const express = require('express')
const route = express.Router()

const {ArticleStudentController} = require('../../controller')
const {Upload} = require('../../middleware')
const {StoragePath, MimeType} = require('../../constant')


route.get('/', ArticleStudentController.ArticleList)
route.get('/detail/:article_id', ArticleStudentController.ArticleDetail)

route.post(
    '/new',
    Upload(
        StoragePath.ARTICLE_STORAGE_PATH,
        [MimeType.JPEG, MimeType.PNG, MimeType.JPG, MimeType.DOC, MimeType.DOCX]
    ).array('file'),
    ArticleStudentController.Create
)

route.put('/basic-information/update',
    Upload(
        StoragePath.ARTICLE_STORAGE_PATH,
        [MimeType.JPEG, MimeType.PNG, MimeType.JPG]
    ).single('file'),
    ArticleStudentController.UpdateBasicInfoArticle)
route.put(
    '/files/update',
    Upload(
        StoragePath.ARTICLE_STORAGE_PATH,
        [MimeType.DOC, MimeType.DOCX]
    ).array('file'),
    ArticleStudentController.AddFileToArticle)

route.delete('/file/delete', ArticleStudentController.DeleteArticleFile)
route.delete('/delete', ArticleStudentController.DeleteArticle)

module.exports = route