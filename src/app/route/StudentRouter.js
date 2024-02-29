const express = require('express')
const route = express.Router()

const {ArticleController} = require('../controller')

route.get('/article', ArticleController.ArticleStudent)

module.exports = route