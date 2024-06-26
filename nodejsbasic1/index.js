// const url1="kong.dev/file1.json"
// const url2="kong.dev/file2.json"
// const url3="kong.dev/file3.json"

// function dowloading(url,callback){
//     console.log(`กำลังโหลดไฟล์จาก ${url}`)
//     setTimeout(()=>{
//         callback()
//     },3000)   
// }
// dowloading(url1,function(result){
//     console.log(`ดาวน์โหลด ${result}เสร็จ`)
//     dowloading(url2,function(result){
//         console.log(`ดาวน์โหลด ${result}เสร็จ`)
//         dowloading(url3,function(result){
//             console.log(`ดาวน์โหลด ${result}เสร็จ`)
//         })
//     })
// })

//promise

// const connect = true
// const url1="kong.dev/file1.json"
// function dowloading(url){
//     return new Promise(function(resolve,reject){
//         if(connect){
//             resolve(`โหลด ${url} เรียบร้อย`)
//             //console.log(`โหลด ${url} เรียบร้อย`)
//         }else{
//             reject(`เกิดข้อผิดพลาด`)
//             //console.log(`เกิดข้อผิดพลาด`)
//         }
//     })
// }

// dowloading(url1)
// blocking
// const fs = require('fs')

// const data = fs.readFileSync('myfile/input.txt','utf-8')
// console.log(data)

//เขียน

// const outputText = `Hello Node.js\n${data}\nไฟล์ถูกเขียนเมื่อ ${new Date()}`
// fs.writeFileSync("myfile/output.txt",outputText)
// console.log("เขียนเสร็จ")
// console.log("จบการทำงาน")

//non-blocking
const fs=require('fs')

fs.readFile("myfile/input.txt",'utf-8',(err,data)=>{
    if(err) return console.log("ผิดพลาด" , err)
        const outputText = `Hello node.js\n${data}\nไฟฃ์ถูกเขียนเมื่อ${new Date()}`
    fs.writeFile("myfile/output.txt",outputText,err=>{
        if(err) return console.log("ผิดพลาด" , err)
            console.log("เขียนเสร็จ")
    })

})
