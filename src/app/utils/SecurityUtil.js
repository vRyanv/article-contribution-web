const bcrypt = require("bcrypt");
const salt = 10;
module.exports = {
    Hash(string){
        return bcrypt.hash(string, salt)
    },
    Compare(string, hash){
        return bcrypt.compare(string, hash)
    }
}