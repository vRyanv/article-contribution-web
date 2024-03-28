const {Authenticator, JWT} = require('../utils')
const {UserService} = require('../service')
const {UserRepository} = require('../repository')
const {StatusCode} = require('../constant')
const TwoFactorAuthController = {
    async Verify(req, res){
        const {email, token} = req.body
        const user = await UserRepository.FindByEmail(email)
        if(user){
            const is_valid = Authenticator.VerifyOTPToken(token, user.secret)
            if(is_valid){
                const token = JWT.Create({
                    id:user._id,
                    email:user.email,
                    full_name: user.full_name,
                    avatar: user.avatar,
                    faculty: user.faculty,
                    role:user.role
                })
                return res.status(200).json({code:StatusCode.OK, token, role:user.role, message: 'Login success'})
            }
            return res.status(200).json({code:StatusCode.BAD_REQUEST, message: 'Invalid token!'})
        }
        return res.status(200).json({code:StatusCode.NOT_FOUND, message: 'Not found user'})
    },
    async VerifyPage(req, res){
        const {email} = req.params
        if(email){
            return res.render(
                'two-factor-auth/auth-2fa-page',
                {
                    layout: false,
                    email
                }
            )
        }
        return res.render('layout/not-found', {layout: false})
    },
    async Enable2FAPage(req, res){
        const {id} = req.user
        const user =  await UserRepository.FindById(id)
        const {email, secret, is_2fa_enable} = user;
        const service_name = "UMagazine"
        const OTP = Authenticator.GenerateOTPToken(email, service_name, secret)
        const QRCodeImg =  await Authenticator.GenerateQRCodeImg(OTP)
        return res.render(
            'two-factor-auth/enable-2fa-page',
            {
                layout: false,
                QRCodeImg,
                is_2fa_enable,
                email
            }
        )
    },
    Enable2TFA(req, res){
        const user_id = req.user.id
        const {is_2fa_enable} = req.body
        const result =  UserService.Update2FA(user_id, is_2fa_enable)

        if(result){
            console.log(is_2fa_enable)
            if(is_2fa_enable == 'true'){
                return res.status(200).json({code:StatusCode.OK, message: 'Enable 2FA successfully'})
            }
            return res.status(200).json({code:StatusCode.OK, message: 'Disable 2FA successfully'})
        }
        return res.status(200).json({code:StatusCode.BAD_REQUEST, message: 'Update 2FA failed'})
    }
}
module.exports = TwoFactorAuthController