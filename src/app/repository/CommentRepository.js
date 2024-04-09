const mongoose = require("mongoose");
const {CommentSchema, ArticleSchema} = require("../schema");
const Comment = mongoose.model("Comment", CommentSchema);
const Article = mongoose.model("Article", ArticleSchema);

const CommentRepository = {
    async GetArticleComment(){
        const article_ids = await Comment.find({})
            .distinct('article')
            .lean()
        return Article.find({'_id' : {$in : article_ids}}).lean()
    },
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