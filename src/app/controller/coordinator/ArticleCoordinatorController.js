const {ArticleCoordinatorService, CommentService, ArticleService, MagazineService} = require('../../service')
const {BAD_REQUEST, OK} = require("../../constant/StatusCode");

const ArticleCoordinatorController = {
    async ArticleContributionPage(req, res){
        const article_list = await ArticleService.GetContributeListForCoordinator(req)
        const magazine_list = await MagazineService.GetMagazineList()

        article_list.forEach(article => {
            const corresponding_magazine = magazine_list.find(
                magazine => magazine._id.toString() === article.magazine.toString()
            );
            if (corresponding_magazine) {
                if (!corresponding_magazine.articles) {
                    corresponding_magazine.articles = [];
                }
                corresponding_magazine.articles.push(article);
            }
        });


        const role = req.user.role
        const data = {
            page_title: 'Contribution',
            magazine_list,
            role
        }
        return res.render(
            'coordinator/article/management/article-management',
            {
                layout: 'layout/portal/portal',
                data
            }
        )
    },
    async AcceptArticle(req, res){
        const update_result =  await ArticleCoordinatorService.AcceptArticle(req)
        if(update_result){
            return res.status(200).json({code: OK, message: `updated article status successfully`})
        }
        return res.status(200).json({code: BAD_REQUEST, message: `updating article status failed`})
    },
    async ArticleDetailPage(req, res){
        const article = await ArticleCoordinatorService.GetArticleDetail(req)
        const comment_list = await CommentService.CommentList(req)
        const role = req.user.role
        const data = {
            page_title: 'Contribution',
            article,
            comment_list,
            role
        }
        return res.render(
            'coordinator/article/detail/article-detail',
            {
                layout: 'layout/portal/portal',
                data
            }
        )
    }
}

module.exports = ArticleCoordinatorController