const {UserRepository} = require("../repository");
const {SecurityUtil, JWT, MailUtil} = require('../utils')
const {StatusCode} = require("../constant");

const SecurityController = {
    SignInPage(req, res) {
        return res.render(
            'security/sign-in',
            {layout: false}
        )
    },
    async SignIn(req, res) {
        const {email, password} = req.body
        const user = await UserRepository.FindByEmail(email)
        if (user && await SecurityUtil.Compare(password, user.password)) {
            const {is_2fa_enable, email} = user
            if (is_2fa_enable) {
                return res.status(200).json({code: StatusCode.TWO_FACTOR_AUTH, email, message: '2FA'})
            }
            const token = JWT.Create({
                id: user._id,
                email: user.email,
                full_name: user.full_name,
                avatar: user.avatar,
                faculty: user.faculty,
                role: user.role
            })

            return res.status(200).json({code: StatusCode.OK, token, role: user.role, message: 'Login success'})
        }
        return res.status(200).json({code: StatusCode.NOT_FOUND, message: 'Not found user'})
    },
    async ForgotPass(req, res) {
        const {email} = req.body
        const user = await UserRepository.FindByEmail(email)
        if (user) {
            const otp = SecurityUtil.GenerateOTP()
            const from_mail = 'The system mail'
            const subject = 'OTP for your reset password'
            const content = `This is your OTP: ${otp}, use it to reset your password for UMagazine account`
            MailUtil.Send(from_mail, email, subject, content)
                .then(result => {
                    console.log(result)
                }).catch(error => {
                console.log(error)
            })

            await UserRepository.Update(user._id, {OTP:otp})

            return res.status(200).json({code: StatusCode.OK})
        }
        return res.status(200).json({code: StatusCode.NOT_FOUND, message: 'Not found user'})
    },
    ResetPasswordPage(req, res){
        const {email} = req.params
        const user = UserRepository.FindByEmail(email)
        if(user){
            return res.render(
                'security/reset-password',
                {layout: false, email}
            )
        }
        return res.render(
            'layout/not-found',
            {layout: false}
        )
    },
    async ResetPassword(req, res) {
        let {email, new_pass, otp} = req.body
        const user = await UserRepository.FindByEmail(email)
        if (!user) {
            return res.status(200).json({code: StatusCode.NOT_FOUND, message: 'Not found user'})
        }

        if (otp !== user.OTP) {
            return res.status(200).json({code: StatusCode.BAD_REQUEST, message: 'Invalid OTP code'})
        }

        new_pass = await SecurityUtil.Hash(new_pass)
        await UserRepository.Update(user._id, {password:new_pass, OTP: ""})
        return res.status(200).json({code: StatusCode.OK, message: 'Reset password successfully'})
    }
}

module.exports = SecurityController