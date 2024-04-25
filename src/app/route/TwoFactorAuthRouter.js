const express = require('express')
const route = express.Router()

const {TwoFactorAuthController} = require('../controller')
const Auth = require("../middleware/Auth");
const {STUDENT, COORDINATOR, MARKETING_MANAGER, ADMIN, GUEST} = require("../constant/Roles");

route.get(
    '/enable',
    (req, res, next) => Auth.Authorize(req, res, next, [STUDENT, COORDINATOR, MARKETING_MANAGER, ADMIN, GUEST]),
    TwoFactorAuthController.Enable2FAPage
)
route.post(
    '/enable',
    (req, res, next) => Auth.Authorize(req, res, next, [STUDENT, COORDINATOR, MARKETING_MANAGER, ADMIN, GUEST]),
    TwoFactorAuthController.Enable2TFA
)

route.get('/verify/:email', TwoFactorAuthController.VerifyPage)
route.post('/verify', TwoFactorAuthController.Verify)

module.exports = route