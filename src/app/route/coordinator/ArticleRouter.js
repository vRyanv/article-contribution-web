const express = require('express')
const route = express.Router()
const {ArticleCoordinatorController} = require('../../controller')

route.get('/', ArticleCoordinatorController.ArticleContributionPage)
route.get('/detail/:article_id', ArticleCoordinatorController.ArticleDetailPage)
route.put('/status-update', ArticleCoordinatorController.AcceptArticle)


module.exports = route