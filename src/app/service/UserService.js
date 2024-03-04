const {UserRepository} = require('../repository')
const {SecurityUtil, FileUtil} = require('../utils')
const {StoragePath} = require('../constant')
const UserService = {
    GetAccountList(){
        return UserRepository.GetUserList()
    },
    async CreateAccount(req){
        if(req.error_upload){
            return 'invalid avatar'
        }
        if(req.file){
            req.body.avatar = req.file.filename
        }
        const email = req.body.email
        const user_existed = await UserRepository.FindByEmail(email)
        if(user_existed){
            return 'user_existed'
        }
        req.body.password = await SecurityUtil.Hash(req.body.password)
        const user = {
            ...req.body
        }
        try{
            return UserRepository.Create(user)
        }catch (error){
            return false
        }
    },
    GetAccountById(req){
        const {account_id} = req.params
        return UserRepository.FindById(account_id)
    },
    async UpdateAccount(req){
        const current_user = await UserRepository.FindByEmail(req.body.email)
        delete req.body.email
        if(!current_user){
            return 'not found user'
        }

        if(req.body.password.length >= 8){
            req.body.password = await SecurityUtil.Hash(req.body.password)
        } else {
            delete req.body.password
        }

        const user_update = {
            ...req.body
        }

        if(req.file){
            user_update.avatar = req.file.filename
            if(current_user.avatar !== 'user.svg'){
                FileUtil.DeleteFile(StoragePath.AVATAR_STORAGE_PATH, current_user.avatar)
            }
        }
        console.log(user_update)
        try{
            return UserRepository.Update(current_user._id, user_update)
        } catch (error){
            console.log('fail')
            return false
        }
    },
    Delete(req){
        const {account_id} = req.body
        try{
            return UserRepository.Delete(account_id)
        } catch (error){
            return false
        }
    }
}

module.exports = UserService