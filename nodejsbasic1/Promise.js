const connect = true
const url1="kong.dev/file1.json"
const url2="kong.dev/file2.json"
const url3="kong.dev/file3.json"
function dowloading(url){
    return new Promise(function(resolve,reject){
        console.log(`กำลังโหลดไฟล์ ${url}`)
        setTimeout(()=>{
            if(connect){
        resolve (`โหลด ${url} เรียบร้อย`)
        }else{
            reject(`เกิดข้อผิดพลาด`)
        }

    },3000)
})
}
       

// dowloading(url1).then(result=>{
//     console.log(result)
//     dowloading(url2).then(function(result){
//         console.log(result)
//         dowloading(url3).then(function(result){
//             console.log(result)
//         })
//     })
// })
  //
// dowloading(url1).
// then(function(result){
//     console.log(result)
//     return dowloading(url2)
// }).then(function(result){
//     console.log(result)
//     return dowloading(url3)
// }).then(function(result){
//     console.log(result)
// }).catch(err=>{
//     console.log(err)
// }).finally(()=>{
//     console.log("จบการทำงาน")
// })

//async
async function start(){
    console.log( await dowloading(url1))
    console.log( await dowloading(url2))
    console.log( await dowloading(url3))
}

start()