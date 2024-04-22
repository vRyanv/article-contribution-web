const {MagazineRepository, ArticleRepository} = require('../repository')
const {MagazineStatus, MimeType, StoragePath, StatusCode} = require('../constant')
const {FileUtil, DateUtil} = require('../utils')
const FacultyService = require('./FacultyService')
const MagazineService = require('./MagazineService')

const ArticleService = {
    async GetAllContributors(magazine_id){
        const faculty_list = await FacultyService.GetFacultyList()
        const article_list = await ArticleRepository.GetAllArticle()

        faculty_list.map(faculty => {
            faculty.contributors = []
        })

        if(magazine_id == 'all'){
            article_list.map(article =>{
                faculty_list.map(faculty => {
                    if(faculty._id == article.student.faculty._id.toString()){
                        faculty.contributors.push(article.student._id.toString())
                    }
                })
            })
        } else {
            article_list.map(article =>{
                faculty_list.map(faculty => {
                    if(faculty._id == article.student.faculty._id.toString() && magazine_id == article.magazine.toString()){
                        faculty.contributors.push(article.student._id.toString())
                    }
                })
            })
        }



        faculty_list.map(faculty => {
            faculty.contributors = [...new Set(faculty.contributors)]
            faculty.contributors = faculty.contributors.length
        })
        console.log(faculty_list);
        return faculty_list;
    },
    async StatisticalForContributeOfYearOfGuest(faculty_id){
        const magazine_list = await MagazineService.GetMagazineListForAdmin()
        let article_list = await ArticleRepository.GetAllArticleForAdmin()
        article_list = article_list.filter(article => {
            return article.student.faculty.toString() === faculty_id
        })
        const statistical_Contribute_year_data = []
        magazine_list.map(magazine => {
            const article_belong_magazine = article_list.filter(article => {
                return article.magazine._id.toString() === magazine._id.toString()
            })
            const academic_year = magazine.start_academic_year + ' - ' + magazine.end_academic_year
            statistical_Contribute_year_data.push({
                academic_year,
                article_quantity: article_belong_magazine.length
            })
        })

        return statistical_Contribute_year_data
    },
    async StatisticalForContributeOfFacultyOfGuest(faculty_id){
            try {
                let  article_list = await ArticleRepository.GetAllArticle()
                article_list = article_list.filter(article => {
                    return article.student.faculty.toString() === faculty_id
                })
                return article_list.length
            } catch (error) {
                console.log(error)
                return false
            }
    },
    GetAllArticleAccepted(){
        return ArticleRepository.GetAllAcceptedArticle()
    },
    CountArticleQuantity(){
      return ArticleRepository.GetArticleQuantity()
    },
    async StatisticalForContributeOfYear(req) {
        const {faculty_id} = req.params
        const magazine_list = await MagazineService.GetMagazineListForAdmin()
        let article_list = await ArticleRepository.GetAllArticleForAdmin()
        if(faculty_id !== 'all'){
            article_list = article_list.filter(article => {
                return article.student.faculty.toString() === faculty_id
            })
        }

        const statistical_Contribute_year_data = []
        magazine_list.map(magazine => {
            const article_belong_magazine = article_list.filter(article => {
                return article.magazine._id.toString() === magazine._id.toString()
            })
            const academic_year = magazine.start_academic_year + ' - ' + magazine.end_academic_year
            statistical_Contribute_year_data.push({
                academic_year,
                article_quantity: article_belong_magazine.length
            })
        })

        return statistical_Contribute_year_data
    },
    async StatisticalForContributeOfFaculty(req) {
        const {magazine_id} = req.params

        const faculty_list = await FacultyService.GetFacultyList();
        let article_list

        if (magazine_id === 'all') {
            article_list = await ArticleRepository.GetAllArticle()
        } else {
            try {
                article_list = await ArticleRepository.GetAllArticleMagazine(magazine_id)
            } catch (error) {
                return StatusCode.BAD_REQUEST
            }
        }

        const statistical_contribute_faculty_data = []

        faculty_list.map(faculty => {
            const article_belong_faculty = article_list.filter(article => {
                return article.student.faculty.toString() === faculty._id.toString()
            })
            statistical_contribute_faculty_data.push({faculty_name: faculty.name, article_quantity: article_belong_faculty.length})
        })
        return statistical_contribute_faculty_data
    },
    async GetAllContributeForMarketingManager() {
        try {
            const article_list = await ArticleRepository.GetAllAcceptedArticle()
            article_list.map(article => {
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
            })

            return article_list
        } catch (error) {
            return null
        }
    },
    async GetContributeForMarketingManager(req) {
        const {magazine_id} = req.params
        try {
            const article_list = await ArticleRepository.GetAllAcceptedArticleMagazine(magazine_id)
            article_list.map(article => {
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
            })

            return article_list
        } catch (error) {
            return null
        }
    },
    async GetContributeListForCoordinator(req) {
        const coordinator_faculty_id = req.user.faculty._id
        let article_list = await ArticleRepository.GetAllArticle()
        article_list = article_list.filter((article) => {
            if (coordinator_faculty_id === article.student.faculty._id.toString()) {
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
    },
    GetArticleListForStudent(req) {
        const student_id = req.user.id
        return ArticleRepository.GetAllArticleListOfStudent(student_id)
    },
    async GetArticleListForCoordinator(req) {
        const faculty_id = req.user.faculty._id
        const {magazine_id} = req.params

        try {
            let article_list = await ArticleRepository.GetAllArticleMagazine(magazine_id)
            console.log(article_list);
            article_list = article_list.filter(article => {
                if (article.student.faculty._id.toString() === faculty_id) {
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

            console.log(article_list);

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