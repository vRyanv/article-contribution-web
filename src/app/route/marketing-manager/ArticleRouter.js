const express = require('express')
const route = express.Router()
const {ArticleMarketingManagerController} = require('../../controller')

route.get('/', ArticleMarketingManagerController.ArticlePage)
route.get('/detail/:article_id', ArticleMarketingManagerController.ArticleDetailPage)

module.exports = route

module.exports = route