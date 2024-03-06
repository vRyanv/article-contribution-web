const express = require('express')
const route = express.Router()

const {MagazineMarketingManagerController} = require('../../controller')

route.get('/', MagazineMarketingManagerController.MagazinePage)
route.get('/detail/:magazine_id', MagazineMarketingManagerController.MagazineDetail)

module.exports = route