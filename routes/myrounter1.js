const express = require('express')
const router = express.Router()
const Product = require('../models/products')
//อัพโหลดไฟล์
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./pubilc/images/products') // ตำแหน่งจัดเก็บไฟล์
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+".jpg")//เปลี่ยนชื่อไฟล์ ป้องกันชื่อซ้ำกัน
    }
})
//เริ่มต้น upload
const upload = multer({
    storage:storage
})
router.get('/',(req,res)=>{
    Product.find().exec((err,doc)=>{
        res.render('index',{products:doc})
    })
})
// const path = require('path')

router.get('/add-product',(req,res)=>{
    if(req.session.login){
        res.render('form') //บันทึกสินค้า
    }else{
        res.render('admin') //เข้าสู่ระบบ
    }
})

router.get('/manage',(req,res)=>{
    if(req.session.login){
        console.log("session",req.sessionID)
console.log("session = ",req.session)
        Product.find().exec((err,doc)=>{
            res.render('manage',{products:doc})
        })
    }else{
        res.render('admin') //เข้าสู่ระบบ
    }
})


router.post('/insert',upload.single("image"),(req,res)=>{
    let data = new Product({
        name:req.body.name,
        price:req.body.price,
        image:req.file.filename,
        description:req.body.description
    })
    Product.saveProduct(data,(err)=>{
        if(err) console.log(err)
        res.redirect('/')
    })
    return res.status(200)
})



router.get('/:id',(req,res)=>{
    const product_id = req.params.id
    console.log(product_id)
    Product.findOne({_id:product_id}).exec((err,doc)=>{
        console.log(doc)
            res.render('product',{product:doc})
    })
    
})

router.post('/edit',(req,res)=>{
    const edit_id = req.body.edit_id
    Product.findOne({_id:edit_id}).exec((err,doc)=>{
        //นำข้อมูลเดิมที่ต้องการแก้ไข ไปแสดงในแบบฟอร์ม
        res.render('edit',{product:doc})
        return res.status(200)
         // res.render('product',{product:doc})
    })
}) 

//ออกจากระบบ
router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        res.redirect('/manage')
    })
    // res.clearCookie('username')
    // res.clearCookie('password')
    // res.clearCookie('login')
    // res.redirect('/manage')
})
 
router.post('/update',(req,res)=>{
      //ข้อมูลใหม่ที่ถูกส่งมาจากฟอร์มแก้ไข 
      const update_id = req.body.update_id
      let data = {
          name:req.body.name,
          price:req.body.price,
          description:req.body.description
      }
      //อัพเดตข้อมูล
      Product.findByIdAndUpdate(update_id,data,{useFindAndModify:false}).exec(err=>{
          res.redirect('/manage')
      })
    return res.status(200)
        // console.log("ข้อมูลใหม่ =",data)
        // console.log("รหัสอัพเดต = ",update_id)

})

router.post('/login',(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const timeExpire = 30000 // 30 วินาที

    if(username === "admin" && password==="123"){
        //สร้าง session
        req.session.username = username
        req.session.password = password
        req.session.login = true
        req.session.cookie.maxAge=timeExpire
        res.redirect('/manage')
    }else{
        res.render('404')
    }
})

// res.cookie('username',username,{maxAge:timeExpire})
        // res.cookie('password',password,{maxAge:timeExpire})
        // res.cookie('login',true,{maxAge:timeExpire}) 
module.exports = router