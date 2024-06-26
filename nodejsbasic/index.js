// const util = require('./modules/mymodules.js')
// const now = require('./modules/mymodules.js').getCurrentTime
// const plus = require('./modules/mymodules.js'.add)
// const number = 5000000
// console.log(util.formatNumber(number));
// console.log(now())
// console.log(util.add(50,100))

const fs = require('fs')

const data = fs.readFileSync('./myfile/input.txt','utf-8')
console.log(data)