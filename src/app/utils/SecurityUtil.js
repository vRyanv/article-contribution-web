const bcrypt = require("bcrypt");
const salt = 10;

//all function return promise
module.exports = {
    Hash(string){
        return bcrypt.hash(string, salt)
    },
    Compare(string, hash){
        return bcrypt.compare(string, hash)
    },
    GenerateOTP(){
        let otp = '';
        for (let i = 0; i < 6; i++) {
            otp += Math.floor(Math.random() * 10);
        }
        return otp;
    }
}