const AdmZip = require('adm-zip')
const {StoragePath, MimeType} = require('../constant')
const {FileUtil} = require('../utils')
const {ArticleCoordinatorService, FacultyService} = require('../service')
const {ArticleRepository} = require("../repository");


const DownloadFileController = {
    OneFileDownload(req, res){
        const {file_name} = req.params
        const zip = new AdmZip();
        const full_path = FileUtil.GetFullPathOfFile(StoragePath.ARTICLE_STORAGE_PATH + file_name)
        try{
            zip.addLocalFile(full_path);
        } catch (error){
            res.redirect('/404')
        }

        const zip_file_contents = zip.toBuffer();
        const fileName = `${file_name}.zip`;
        const fileType = MimeType.ZIP
        res.writeHead(200, {
            'Content-Disposition': `attachment; filename="${fileName}"`,
            'Content-Type': fileType,
        })
        return res.end(zip_file_contents);
    },
    async AllFilesDownload(req, res){
        const article = await ArticleCoordinatorService.GetArticleById(req)

        const zip = new AdmZip();
        article.files.map( file => {
            const full_path = FileUtil.GetFullPathOfFile(StoragePath.ARTICLE_STORAGE_PATH + file.filename)
            try{
                zip.addLocalFile(full_path);
            } catch (error){
                res.redirect('/404')
            }
        })

        const zip_file_contents = zip.toBuffer();
        const fileName = `${article.student.email}-all-contribution.zip`;
        const fileType = MimeType.ZIP
        res.writeHead(200, {
            'Content-Disposition': `attachment; filename="${fileName}"`,
            'Content-Type': fileType,
        })
        return res.end(zip_file_contents);
    },
    async FacultyAllFilesDownload(req, res){
        const {magazine_id} = req.params
        const faculty = await FacultyService.GetFacultyById(req)
        if(!faculty){
            return res.redirect('/404')
        }
        let article_list = await ArticleRepository.GetAllArticleMagazine(magazine_id)

        article_list = article_list.filter(article => article.student.faculty.toString() === faculty._id.toString())

        const zip = new AdmZip();
        article_list.map(article => {
            article.files.map( file => {
                const full_path = FileUtil.GetFullPathOfFile(StoragePath.ARTICLE_STORAGE_PATH + file.filename)
                try{
                    zip.addLocalFile(full_path);
                } catch (error){
                    console.log(error)
                }
            })
        })

        const fileName = `all-contribution-${faculty.name}.zip`;
        const fileType = MimeType.ZIP
        res.writeHead(200, {
            'Content-Disposition': `attachment; filename="${fileName}"`,
            'Content-Type': fileType,
        })
        return res.end(zip.toBuffer());
    }
}

module.exports = DownloadFileController