const express = require('express')
const route = express.Router()

const ArticleRouter = require('../marketing-manager/ArticleRouter')
const MagazineRouter = require('../marketing-manager/MagazineRouter')

route.use('/magazine', MagazineRouter)
route.use('/contribution', ArticleRouter)

module.exports = route