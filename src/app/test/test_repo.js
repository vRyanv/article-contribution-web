const db = require('../../config/ConnectDB')
db.connect()

const {CommentRepository} = require('../repository')
const {CommentService} = require('../service')
CommentRepository.GetArticleComment()
    .then(result =>{
        console.log(result)
}).catch(error => {
    console.log(error)
})