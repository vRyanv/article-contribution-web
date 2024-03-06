const mongoose = require("mongoose");
const {ArticleSchema} = require("../schema");
const {ACCEPTED} = require("../constant/ArticleStatus");
const Article = mongoose.model("Article", ArticleSchema);

const ArticleRepository = {
    GetArticleQuantity(){
        return Article.countDocuments()
    },
    GetAllAcceptedArticle(){
        return Article.find({status:ACCEPTED})
            .sort({createdAt: 'desc'})
            .populate('student')
            .lean()
    },
    GetAllAcceptedArticleMagazine(magazine_id){
        return Article.find({magazine: magazine_id, status:ACCEPTED})
            .sort({createdAt: 'desc'})
            .populate('student')
            .lean()
    },
    GetAllArticleForAdmin() {
        return Article.find({})
            .populate('student')
            .populate('magazine')
            .sort({createdAt: 'desc'})
            .lean()
    },
    GetAllArticle() {
        return Article.find({})
            .populate('student')
            .sort({createdAt: 'desc'})
            .lean()
    },
    GetAllArticleListOfStudent(student_id) {
        return Article.find({student: student_id})
            .sort({createdAt: 'desc'})
            .lean()
    },
    GetAllFilesOfArticleById(article_id) {
        return Article.findOne({_id: article_id}).select('files student').populate('student').lean()
    },
    UpdateArticleStatus(article_id, status) {
        return Article.updateOne({_id: article_id}, {status})
    },
    GetAllArticleMagazine(magazine_id) {
        return Article.find({magazine: magazine_id})
            .sort({createdAt: 'desc'})
            .populate('student')
            .lean()
    },
    FindOneAndDeleteStudentArticle(student_id, article_id) {
        return Article.findByIdAndDelete(article_id)
            .where({student: student_id})
            .lean()
    },
    AddFilesToArticle(student_id, article_id, files) {
        return Article.updateOne(
            {_id: article_id, student: student_id},
            {$push: {files: {$each: files}}})
    },
    DeleteOneArticleFile(student_id, article_id, filename) {
        return Article.updateOne(
            {_id: article_id, student: student_id},
            {$pull: {files: {filename: filename}}})
    },
    FindOneAndUpdateArticle(student_id, article_id, update_article) {
        return Article.findOneAndUpdate(
            {_id: article_id, student: student_id},
            update_article
        ).lean()
    },
    FindByIdAndStudentId(article_id, student_id) {
        return Article.findById(article_id)
            .where({student: student_id})
            .populate('magazine')
            .populate('student')
            .lean()
    },
    FindById(id) {
        return Article.findById(id)
            .populate('magazine')
            .populate('student')
            .lean()
    },
    Create(article) {
        return Article.create(article)
    },
    GetStudentArticleOfMagazine(student_id, magazine_id) {
        return Article.find({
            student: student_id,
            magazine: magazine_id
        }).sort({createdAt: 'desc'}).lean()
    }
}

module.exports = ArticleRepository