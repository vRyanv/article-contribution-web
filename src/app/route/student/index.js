const express = require('express')
const route = express.Router()

const MagazineRouter = require('./MagazineRouter')
const ArticleRouter = require('./ArticleRouter')

route.use('/magazine', MagazineRouter)
route.use('/article', ArticleRouter)

module.exports = route