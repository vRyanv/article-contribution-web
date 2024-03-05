const AdmZip = require('adm-zip')
const {StoragePath, MimeType} = require('../constant')
const {FileUtil} = require('../utils')
const {ArticleCoordinatorService} = require('../service')

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
    }
}

module.exports = DownloadFileController