// const date = [
//     '2024-04-01',
//     '2024-04-02',
//     '2025-04-03',
//     '2024-04-04',
//     '2025-04-05',
//     '2024-04-06',
// ]
//
// date.map(d => {
//     if(d > '2024-04-01' && d < '2024-04-05'){
//         console.log(d)
//     }
// })

// const DateUtil = require('../utils/DateUtil')
// let date = new Date()
// date = [String(date.getHours()).padStart(2, '0'), String(date.getMinutes()).padStart(2, '0')].join(':')
// console.log(date)
// console.log(String(11).padStart(2, '0'))
// console.log(DateUtil.IsPassDateAfterDay('3-1-2024', 3))
// console.log(DateUtil.NumberOfDaysRemaining('3-20-2024', 14))
//
// let a = '03-10-2024'
// let b =  '02-20-2024'
//
// console.log(a > b)
// console.log(DateUtil.ConvertDate(b, 'MM-dd-yyyy'))

const {SecurityUtil} = require('../utils')

console.log(SecurityUtil.Compare('asds', 'asdf'))