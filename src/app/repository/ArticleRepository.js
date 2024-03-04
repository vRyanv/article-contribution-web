const mongoose = require("mongoose");
const {ArticleSchema} = require("../schema");
const Article = mongoose.model("Article", ArticleSchema);

const ArticleRepository = {
    FindOneAndDeleteStudentArticle(student_id, article_id){
        return Article.findByIdAndDelete(article_id)
            .where({student: student_id})
            .lean()
    },
    AddFilesToArticle(student_id, article_id, files){
        return Article.updateOne(
            {_id:article_id, student:student_id},
            {$push: {files: {$each: files} }})
    },
    DeleteOneArticleFile(student_id, article_id, filename){
        return Article.updateOne(
            {_id:article_id, student:student_id},
            {$pull: {files: {filename: filename} }})
    },
    FindOneAndUpdateArticle(student_id, article_id, update_article){
        return Article.findOneAndUpdate(
            {_id:article_id, student:student_id},
            update_article
        ).lean()
    },
    FindByIdAndStudentId(article_id, student_id){
        return Article.findById(article_id)
            .where({student:student_id})
            .populate('magazine')
            .lean()
    },
    FindById(id){
        return Article.findById(id)
            .populate('magazine')
            .lean()
    },
    Create(article) {
        return Article.create(article)
    },
    GetStudentArticleOfMagazine(student_id, magazine_id){
        return Article.find({
            student: student_id,
            magazine: magazine_id
        }).sort({createdAt: 'desc'}).lean()
    }
}

module.exports = ArticleRepository