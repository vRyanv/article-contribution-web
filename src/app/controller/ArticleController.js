const ArticleController = {
    ArticleStudent(req, res){
        const data = {
            page_title: 'Article'
        }
        return res.render(
            'student/article/article-list',
            {
                layout: 'layout/portal/portal',
                data
            }
        )
    }
}

module.exports = ArticleController