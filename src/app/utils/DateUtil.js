const DateUtil = {
    GetDate(format = 'MM-dd-yyyy'){
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
    },
    ConvertDate(date, format = 'MM-dd-yyyy'){
        date = new Date(date)
        const dd = String(date.getDate()).padStart(2, '0')
        const mm = String(date.getMonth() + 1).padStart(2, '0')
        const yyyy = date.getFullYear();
        if(format === 'dd-MM-yyyy'){
            return dd + '-' + mm + '-' + yyyy
        } else if(format === 'MM-dd-yyyy'){
            return mm + '-' + dd + '-' + yyyy
        } else if(format === 'yyyy-MM-dd'){
            return yyyy + '-' + mm + '-' + dd
        } else {
            throw new Error('Invalid date format')
        }
    },
    IsPassedDate(date_string){
        let current_date = new Date()
        let date = new Date(date_string)
        return date.getTime() < current_date.getTime();
    }
}

module.exports = DateUtil