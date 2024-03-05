const {ArticleService, CommentService} = require("../../service");
const {StatusCode, MagazineStatus} = require("../../constant");

const ArticleStudentController = {
    async DeleteArticle(req, res) {
        const delete_result = await ArticleService.DeleteArticle(req)
        if (delete_result) {
            return res.status(200).json({code: StatusCode.DELETED, message: 'deleted article successfully!'})
        }
        return res.status(200).json({code: StatusCode.BAD_REQUEST, message: 'deleting article failed!'})
    },
    async AddFileToArticle(req, res) {
        const add_file_result = ArticleService.AddFileToArticle(req)
        if (add_file_result) {
            return res.status(200).json({code: StatusCode.UPDATED, message: 'updated files successfully!'})
        }
        return res.status(200).json({code: StatusCode.BAD_REQUEST, message: 'updating files failed!'})
    },
    async DeleteArticleFile(req, res) {
        const delete_result = await ArticleService.DeleteArticleFile(req)
        if (delete_result) {
            return res.status(200).json({code: StatusCode.DELETED, message: 'deleted file successfully!'})
        }
        return res.status(200).json({code: StatusCode.BAD_REQUEST, message: 'deleting file failed!'})
    },
    async UpdateBasicInfoArticle(req, res) {
        const result_update = await ArticleService.UpdateBasicInfoArticle(req)
        if (result_update) {
            return res.status(200).json({code: StatusCode.UPDATED, message: 'updated article successfully!'})
        }
        return res.status(200).json({code: StatusCode.BAD_REQUEST, message: 'updating article failed!'})
    },
    async ArticleDetailPage(req, res) {
        const article = await ArticleService.GetArticleById(req)

        if (!article) {
            return res.render(
                'layout/not-found',
                {layout: false}
            )
        }
        const comment_list = await CommentService.CommentList(req)
        const role = req.user.role
        const data = {
            page_title: 'Article',
            article,
            comment_list,
            role
        }
        return res.render(
            'student/article/detail-article',
            {
                layout: 'layout/portal/portal',
                data
            }
        )
    },
    ArticleContributionPage(req, res) {

    },
    async Create(req, res) {
        const article = await ArticleService.Create(req)
        if (article === MagazineStatus.IS_FINAL_CLOSURE_DATE) {
            return res.status(200).json({code: StatusCode.BAD_REQUEST, message: 'this magazine has final closure'})
        } else if (article === MagazineStatus.IS_CLOSURE_DATE) {
            return res.status(200).json({code: StatusCode.BAD_REQUEST, message: 'this magazine has closure'})
        } else if (!article) {
            return res.status(200).json({code: StatusCode.BAD_REQUEST, message: 'creating article failed!'})
        }
        return res.status(200).json({code: StatusCode.CREATED, message: 'created article successfully!'})
    }
}

module.exports = ArticleStudentController