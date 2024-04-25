const express = require('express')
const route = express.Router()

const {ChatController} = require('../controller')

route.get('/', ChatController.ChatPage)
route.get('/get-messages/receiver/:receiver', ChatController.GetMessages)

module.exports = route