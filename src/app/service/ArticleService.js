const {MagazineRepository, ArticleRepository} = require('../repository')
const {MagazineStatus, MimeType, StoragePath} = require('../constant')
const {FileUtil, DateUtil} = require('../utils')

const ArticleService = {
    async GetArticleListForCoordinator(req){
        const faculty_id = req.user.faculty._id
        const {magazine_id} = req.params

        try{
            let article_list = await ArticleRepository.GetAllArticleByFacultyAndMagazine(magazine_id)
            article_list = article_list.filter(article => {
                if(article.student.faculty.toString() === faculty_id){
                    const submit_date = [
                        String(article.createdAt.getDate()).padStart(2, '0'),
                        String(article.createdAt.getMonth() + 1).padStart(2, '0'),
                        article.createdAt.getFullYear()
                    ].join('-')

                    const submit_time = [
                        String(article.createdAt.getHours()).padStart(2, '0'),
                        String(article.createdAt.getMinutes() + 1).padStart(2, '0')
                    ].join(':')

                    article.submit_date = submit_time + ' ' + submit_date
                    return true
                }
            })

            return article_list
        } catch (error) {
            return null
        }
    },
    async DeleteArticle(req) {
        const student_id = req.user.id
        const {article_id} = req.body

        try {
            const article = await ArticleRepository.FindOneAndDeleteStudentArticle(student_id, article_id)
            FileUtil.DeleteFile(StoragePath.ARTICLE_STORAGE_PATH, article.thumbnail)
            article.files.map(file => {
                FileUtil.DeleteFile(StoragePath.ARTICLE_STORAGE_PATH, file.filename)
            })
            return true
        } catch (error) {
            return false
        }
    },
    async AddFileToArticle(req) {
        const student_id = req.user.id
        const {article_id} = req.body
        const files = []
        req.files.map(file => {
            files.push({filename: file.filename, size: file.size})
        })

        try {
            return await ArticleRepository.AddFilesToArticle(student_id, article_id, files)
        } catch (error) {
            return false
        }
    },
    async DeleteArticleFile(req) {
        const student_id = req.user.id
        const {filename, article_id} = req.body

        try {
            const result_delete = await ArticleRepository.DeleteOneArticleFile(student_id, article_id, filename)
            if (result_delete.modifiedCount === 1) {
                FileUtil.DeleteFile(StoragePath.ARTICLE_STORAGE_PATH, filename)
                return true
            }
            return false
        } catch (error) {
            return false
        }
    },
    async GetArticleById(req) {
        const {article_id} = req.params
        const student_id = req.user.id

        let article
        try {
            article = await ArticleRepository.FindByIdAndStudentId(article_id, student_id)
        } catch (error) {
            return null
        }
        if (!article) {
            return null
        }

        const magazine = article.magazine
        magazine.is_closure = DateUtil.IsPassedDate(magazine.closure_date)
        magazine.is_final_closure = DateUtil.IsPassedDate(magazine.final_closure_date)
        article.days_left_to_comment = DateUtil.NumberOfDaysRemaining(article.createdAt.toString(), 14)
        return article
    },
    GetStudentContributeListOfMagazine(req, magazine_id) {
        const student_id = req.user.id
        return ArticleRepository.GetStudentArticleOfMagazine(student_id, magazine_id)
    },
    async Create(req) {
        const {magazine_id} = req.body

        const magazine = await MagazineRepository.FindById(magazine_id)
        const current_date = new Date()
        const final_closure_date = new Date(magazine.final_closure_date)
        if (final_closure_date < current_date) {
            return MagazineStatus.IS_FINAL_CLOSURE_DATE
        }

        const closure_date = new Date(magazine.closure_date)
        if (closure_date < current_date) {
            return MagazineStatus.IS_CLOSURE_DATE
        }
        const files = []
        const thumbnail = req.files.filter(file => {
            if ([MimeType.DOCX, MimeType.DOC].includes(file.mimetype)) {
                files.push({filename: file.filename, size: file.size})
            }
            return [MimeType.JPG, MimeType.JPEG, MimeType.PNG].includes(file.mimetype)
        })

        const {title, description} = req.body
        const student_contribution_id = req.user.id
        const article = {
            student: student_contribution_id,
            magazine: magazine_id,
            title,
            description,
            files,
            thumbnail: thumbnail[0].filename
        }

        try {
            return await ArticleRepository.Create(article)
        } catch (error) {
            console.log(error)
            return null
        }
    },
    async UpdateBasicInfoArticle(req) {
        const student_id = req.user.id

        const {article_id, title, description} = req.body

        const update_article = {
            title,
            description
        }

        if (req.file) {
            update_article.thumbnail = req.file.filename
        }

        try {
            const article = await ArticleRepository.FindOneAndUpdateArticle(student_id, article_id, update_article)
            if (req.file) {
                FileUtil.DeleteFile(StoragePath.ARTICLE_STORAGE_PATH, article.thumbnail)
            }
            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = ArticleService