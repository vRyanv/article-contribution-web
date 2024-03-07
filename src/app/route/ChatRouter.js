const express = require('express')
const route = express.Router()

const {ChatController} = require('../controller')

route.get('/', ChatController.ChatPage)

module.exports = route