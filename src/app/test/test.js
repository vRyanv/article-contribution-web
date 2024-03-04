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
//
// let a = '03-10-2024'
// let b =  '02-20-2024'
//
// console.log(a > b)
// console.log(DateUtil.ConvertDate(b, 'MM-dd-yyyy'))
const {DateUtil} = require('../utils')

const passed = DateUtil.IsPassedDateAfterDay('3-4-2024', 4)

console.log(passed)

