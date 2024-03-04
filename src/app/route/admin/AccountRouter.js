const express = require('express')
const route = express.Router()

const {AccountController} = require('../../controller')
const {Upload} = require('../../middleware')
const {StoragePath, MimeType} = require('../../constant')


route.get('/', AccountController.AccountManagementPage)
route.get('/detail/:account_id', AccountController.DetailAccount)

route.get('/new', AccountController.NewAccountPage)
route.post(
    '/new',
    Upload(
        StoragePath.AVATAR_STORAGE_PATH,
        [MimeType.PNG, MimeType.JPG, MimeType.JPEG]
    ).single('avatar'),
    AccountController.CreateAccount
)

route.get('/edit/:account_id', AccountController.EditAccountPage)
route.put(
    '/update',
    Upload(
        StoragePath.AVATAR_STORAGE_PATH,
        [MimeType.PNG, MimeType.JPG, MimeType.JPEG]
    ).single('avatar'),
    AccountController.UpdateAccount)

route.delete('/delete', AccountController.DeleteAccount)

module.exports = route