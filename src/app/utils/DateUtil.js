const DateUtil = {
    GetDate(format = 'dd-MM-yyyy'){
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, '0')
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const yyyy = today.getFullYear();
        if(format === 'dd-MM-yyyy'){
            return dd + '-' + mm + '-' + yyyy
        } else if(format === 'MM-dd-yyyy'){
            return mm + '-' + dd + '-' + yyyy
        } else if(format === 'yyyy-MM-dd'){
            return yyyy + '-' + mm + '-' + dd
        } else {
            throw new Error('Invalid date format')
        }
    }
}

module.exports = DateUtil