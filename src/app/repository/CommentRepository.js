const mongoose = require("mongoose");
const {CommentSchema} = require("../schema");
const Comment = mongoose.model("Comment", CommentSchema);

const CommentRepository = {
    Create(comment){
        return Comment.create(comment)
    },
    GetCommentList(article_id){
        return Comment.find({article: article_id})
            .populate('user')
            .sort({createdAt: 'desc'}).lean()
    }
}

module.exports = CommentRepository