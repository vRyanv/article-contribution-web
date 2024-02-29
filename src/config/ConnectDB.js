const mongoose = require('mongoose')
async function connect()
{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/article-contribution-web')
        console.log('Connect mongodb successfully!')
    }catch(error){
        console.log('Connect mongodb failure!')
    }
}

module.exports = {connect}