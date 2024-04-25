const express = require('express')
const route = express.Router()

const {CommentController} = require('../controller')

route.post('/create', CommentController.Create)


module.exports = route