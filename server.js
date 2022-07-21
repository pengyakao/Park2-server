const nodemailer = require("nodemailer");
let express = require("express");
// let bcrypt = require('bcryptjs');
let app = express();
app.listen(3001);
const db = require('./db');
const jwt = require('jsonwebtoken');

let cors = require("cors");
app.use(cors());

const userMiddleware = require('./middleware/user')

// const loginRoute = require("./routes/login/login");

app.use(express.json());
app.use(express.urlencoded({ extended: true }))



// 前台 API-------------------------------------------------------------------

const frontHome = require('./routes/front/home')
app.use('/home', frontHome)

const frontActivity = require('./routes/front/activity')
app.use('/activity', frontActivity)

const frontStore = require('./routes/front/store')
app.use('/store', frontStore)

const frontStationed = require('./routes/front/apply')
app.use('/apply', frontStationed)



// 後台 API-----------------------------------------------------------------------------------------

const backHome = require('./routes/back/home')
app.use('/admin/home', backHome)

const backActivity = require('./routes/back/activity')
app.use('/admin/activity', backActivity)

const backStore = require('./routes/back/store')
app.use('/admin/store', backStore)

const backSelfStore = require('./routes/back/selfStore')
app.use('/self/store', backSelfStore)

const backStationed= require('./routes/back/apply')
app.use('/admin/apply', backStationed)

const backUser = require('./routes/back/user')
app.use('/user', backUser)

// 登入 API ----------------------------------------------------------------------------

app.post('/admin/login/user', (req, res, next) => {
    db.query(
        'select * from user where user_account = ? and user_password = ?',
        [req.body.account, req.body.password],
        (err, result) => {
            if(err) {
                // throw err;
                return res.status(400).send({
                    message: err
                })
            }
            if(!result.length) {
                return res.status(400).send({
                    message: 'Account or password incorrect!'
                })
            }else{
                const token = jwt.sign(
                    {
                        username: result[0].user_name,
                        userlevel: result[0].user_level
                    },
                    'SECRETKEY',
                    {expiresIn: '1h'}
                );
                res.cookie('token', token);
                return res.status(200).send({
                    message: 'Logged in',
                    token,
                    user: JSON.stringify(result[0])
                })
            }
            // return res.status(400).send({
            //     message: 'Account or password incorrect!'
            // })

            // bcrypt.compare(
            //     req.query.password,
            //     result[0]['user_password'],
            //     (bErr, bResult) => {
            //         console.log(req.query.password)
            //         console.log(result[0]['user_password'])
            //         console.log(bErr, bResult)
            //         if(bErr) {
            //             console.log('bErr')
            //             throw bErr;
            //             return res.status(400).send({
            //                 message: 'Account or password incorrect!'
            //             });
            //         }
            //         if(bResult) {
            //             console.log('bResult')
            //             const token = jwt.sign(
            //                 {
            //                     username: result[0].user_name,
            //                     userlevel: result[0].user_level
            //                 },
            //                 'SECRETKEY',
            //                 {expiresIn: '1h'}
            //             );
            //             return res.status(200).send({
            //                 message: 'Logged in',
            //                 token,
            //                 user: result[0]
            //             })
            //         }
            //         return res.status(400).send({
            //             message: 'Account or password incorrect!!!'
            //         })
            //     }
            // )
        }
    )
})

app.get('/check/islogin', userMiddleware.isLoggedIn, (req, res, next) => {
    console.log('req.userData')
    res.send('this is secret content!');
})
// app.get('/check/islogin', (req, res, next) => {
//     console.log(req.headers.authorization)
//     console.log('req.userData')
//     res.send('this is secret content!');
// })
// app.post('/login', loginRoute);
// app.post('/add', cookieJwtAuth,loginRoute);


// const upload = require('./routes/upload/upload')
// app.use('/test', upload)


// 檔案上傳相關設定
const fs = require('fs'); 
const multer = require('multer');
app.use('/file/', express.static('./public/'))

const fileStoragePdf = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/pdf');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);
    }
})

const fileStorageActivity = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/activity');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);
    }
})

const fileStorageStore = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/store');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);
    }
})

const fileStorageNews = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/news');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);
    }
})

const uploadEnginePdf = multer({storage: fileStoragePdf});
const uploadEngineActivity = multer({storage: fileStorageActivity});
const uploadEngineStore = multer({storage: fileStorageStore});
const uploadEngineNews = multer({storage: fileStorageNews});

const fileName = 'file'
const updateBaseUrl = 'http://localhost:3001'


const pdfPath = '/file/pdf/'
const activityPath = '/file/images/activity/'
const storePath = '/file/images/store/'
const newsPath = '/file/images/news/'

function uploadPdf(req,res) {
    return new Promise((resolve, reject) => {
        uploadEnginePdf.single(fileName)(req, res, function(err){
            if(err) {
                reject(err)
            }else{
                resolve(updateBaseUrl + pdfPath + req.file.filename)
            }
        })
    })
}
function uploadActivity(req,res) {
    return new Promise((resolve, reject) => {
        uploadEngineActivity.single(fileName)(req, res, function(err){
            if(err) {
                reject(err)
            }else{
                resolve(updateBaseUrl + activityPath + req.file.filename)
            }
        })
    })
}
function uploadStore(req,res) {
    return new Promise((resolve, reject) => {
        uploadEngineStore.single(fileName)(req, res, function(err){
            if(err) {
                reject(err)
            }else{
                resolve(updateBaseUrl + storePath + req.file.filename)
            }
        })
    })
}

function uploadNews(req,res) {
    return new Promise((resolve, reject) => {
        uploadEngineNews.single(fileName)(req, res, function(err){
            if(err) {
                reject(err)
            }else{
                resolve(updateBaseUrl + newsPath + req.file.filename)
            }
        })
    })
}

// 前台進駐申請表單 ------------------------------------------------------------------------------------------------------------------------------------------------------------------

// 新增市集進駐申請
app.post('/apply/market/form/post', (req, res) => {
    uploadPdf(req, res).then(fileSrc => {
        db.query(
            'insert into market_apply (mar_apply_brand, market_id, mar_apply_class, mar_apply_url, mar_apply_name, mar_apply_tel, mar_apply_mail, mar_apply_count, mar_apply_bill, mar_apply_file, mar_apply_sta, mar_apply_feeinfo) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [req.body.brand, req.body.relation, req.body.type, req.body.url, req.body.person, req.body.tel, req.body.mail, req.body.count, req.body.bill, fileSrc, req.body.state, req.body.fee],
            // [req.body, 'test', 'test', 'test', 'test', 'test', 'test', 2, true, imgsrc, '1', 'test'],
            function (error, data) {
                if(error){
                    res.send(JSON.stringify(error));
                }else{
                    res.send(JSON.stringify(fileSrc));
                }
            }
        )
    })
})


// 重新上傳市集企劃書
app.put('/apply/market/form/proposal/edit', (req, res) => {
    uploadPdf(req, res).then(fileSrc => {
        const deleteTarget = req.body.delete.replace('http://localhost:3001/file/', './public/')
        fs.unlinkSync(deleteTarget)
        db.query(
            'update market_apply set mar_apply_file = ?, mar_apply_sta = ? where mar_apply_id = ?',
            [fileSrc, req.body.state, req.body.id],
            // [req.body, 'test', 'test', 'test', 'test', 'test', 'test', 2, true, imgsrc, '1', 'test'],
            function (error, data) {
                if(error){
                    res.send(JSON.stringify(error));
                }else{
                    res.send(JSON.stringify(fileSrc));
                }
            }
        )
    })
})

// 新增店家進駐申請
app.post('/apply/store/form/post', (req, res) => {
    console.log(req)
    uploadPdf(req, res).then(fileSrc => {
        db.query(
            'insert into store_apply (sto_apply_brand, sto_apply_location, sto_apply_class, sto_apply_name, sto_apply_tel, sto_apply_mail, sto_apply_date, sto_apply_file, sto_apply_sta) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [req.body.brand, req.body.location, req.body.type, req.body.person, req.body.tel, req.body.mail, req.body.time, fileSrc, req.body.state],
            // [req.body, 'test', 'test', 'test', 'test', 'test', 'test', 2, true, imgsrc, '1', 'test'],
            function (error, data) {
                if(error){
                    res.send(JSON.stringify(error));
                }else{
                    res.send(JSON.stringify(fileSrc));
                }
            }
        )
    })
})


// 後台活動新增------------------------------------------------------------------------------------------------------------------------------------------------------------------

// 首頁公告新增
app.post('/admin/home/proclamation/post', function(req, res){
    uploadNews(req, res).then(fileSrc => {
        db.query(
            'insert into home_news (home_news_title, home_news_sta, home_news_img, home_news_Sdate, home_news_Edate, home_news_info) values (?, ?, ?, ?, ?, ?)',
            [req.body.title, req.body.isShow, fileSrc, req.body.startDate, req.body.endDate, req.body.info],
            function (error, data) {
                if(error){
                    res.send(JSON.stringify(error));
                }else{
                    res.send(JSON.stringify(data));
                }
            }
        )
    })
})

// app.put('/test', function(req, res){
//     uploadStore(req, res).then(fileSrc => {
//         db.query(
//             'update store set sto_first_img = ? where sto_id = ?',
//             [fileSrc, req.body.id],
//             function (error, data) {
//                 if(error){
//                     res.send(JSON.stringify(error));
//                 }else{
//                     res.send(JSON.stringify(data));
//                 }
//             }
//         )
//     })
// })

app.put('/admin/home/proclamation/edit/file', function(req, res){
    uploadNews(req, res).then(fileSrc => {
        db.query(
            'update home_news set home_news_title = ?, home_news_sta = ?, home_news_Sdate = ?, home_news_Edate = ?, home_news_info = ?, home_news_img = ? where home_news_id = ?',
            [req.body.title, req.body.isShow, req.body.startDate, req.body.endDate, req.body.info, fileSrc, req.body.id],
            function (error, data) {
                if(error){
                    res.send(JSON.stringify(error));
                }else{
                    res.send(JSON.stringify(data));
                }
            }
        )
    })
})


// 活動新增
app.post('/admin/activity/post', function(req, res){
    uploadActivity(req, res).then(fileSrc => {
        db.query(
            'insert into activity (act_title, act_Sdate, act_Edate, act_Stime, act_Etime, acr_org, acr_orgimg, act_location, act_class, act_guests, act_info, act_img, act_sta, act_is_slider ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [req.body.title, req.body.startDate, req.body.endDate, req.body.startTime, req.body.endTime, req.body.organizer, req.body.organizerImg, req.body.location, req.body.type, req.body.guests, req.body.info, fileSrc, req.body.isShow, req.body.isSlider],
            function (error, data) {
                if(error){
                    res.send(JSON.stringify(error));
                }else{
                    res.send(JSON.stringify(data));
                }
            }
        )
    })
})

// 活動編輯
app.put('/admin/activity/edit/file', function(req, res){
    uploadActivity(req, res).then(fileSrc => {
        const deleteTarget = req.body.delete.replace('http://localhost:3001/file/', './public/')
        fs.unlinkSync(deleteTarget)
        db.query(
            'update activity set act_title = ?, act_Sdate = ?, act_Edate = ?, act_Stime = ?, act_Etime = ?, acr_org = ?, acr_orgimg = ?, act_location = ?, act_class = ?, act_guests = ?, act_info = ?, act_img = ?, act_sta = ?, act_is_slider = ? where act_id = ?',
            [req.body.title, req.body.startDate, req.body.endDate, req.body.startTime, req.body.endTime, req.body.organizer, req.body.organizerImg, req.body.location, req.body.type, req.body.guests, req.body.info, fileSrc, req.body.isShow, req.body.isSlider, req.body.id],
            // [req.body, 'test', 'test', 'test', 'test', 'test', 'test', 2, true, imgsrc, '1', 'test'],
            function (error, data) {
                if(error){
                    res.send(JSON.stringify(error));
                }else{
                    res.send(JSON.stringify(fileSrc));
                }
            }
        )
    })
})

// 店家管理/店家/logo/編輯
app.put('/admin/store/logo/edit', function(req, res){
    uploadStore(req, res).then(fileSrc => {
        db.query(
            'update store set sto_img = ? where sto_id = ?',
            [fileSrc, req.body.id],
            function (error, data) {
                if(error){
                    res.send(JSON.stringify(error));
                }else{
                    res.send(JSON.stringify(data));
                }
            }
        )
    })
})

// 店家管理/店家/新增
app.post('/admin/store/post', function(req, res){
    uploadStore(req, res).then(fileSrc => {
        db.query(
            'insert into store (sto_apply_id, sto_name, sto_class, sto_img, sto_tel, sto_location, sto_pay1, sto_pay2, sto_pay3, sto_pay4, sto_pay5, sto_pay6, sto_pay7, sto_thu, sto_fri, sto_sat, sto_sun, sto_fb, sto_ins, sto_line, sto_info, sto_sta, sto_main, sto_first_img ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [req.body_applyId, req.body.name, req.body.type, req.body.logo, req.body.tel, req.body.location, req.body.pay1, req.body.pay2, req.body.pay3, req.body.pay4, req.body.pay5, req.body.pay6, req.body.pay7, req.body.thu, req.body.fri, req.body.sat, req.body.sun, req.body.fb, req.body.ig, req.body.line, req.body.info, req.body.state, req.body.isMain, fileSrc],
            function (error, data) {
                if(error){
                    res.send(JSON.stringify(error));
                }else{
                    res.send(JSON.stringify(data));
                }
            }
        )
    })
})

// 店家管理/店家/編輯
app.put('/admin/store/edit/file', function(req, res){
    uploadStore(req, res).then(fileSrc => {
        const deleteTarget = req.body.delete.replace('http://localhost:3001/file/', './public/')
        fs.unlinkSync(deleteTarget)
        db.query(
            'update store set sto_name = ?, sto_class = ?, sto_tel = ?, sto_location = ?, sto_pay1 = ?, sto_pay2 = ?, sto_pay3 = ?, sto_pay4 = ?, sto_pay5 = ?, sto_pay6 = ?, sto_pay7 = ?, sto_thu = ?, sto_fri = ?, sto_sat = ?, sto_sun = ?, sto_fb = ?, sto_ins = ?, sto_line = ?, sto_info = ?, sto_sta = ?, sto_main = ?, sto_first_img = ? where sto_id = ?',
            [req.body.name, req.body.type, req.body.tel, req.body.location, req.body.pay1, req.body.pay2, req.body.pay3, req.body.pay4, req.body.pay5, req.body.pay6, req.body.pay7, req.body.thu, req.body.fri, req.body.sat, req.body.sun, req.body.fb, req.body.ig, req.body.line, req.body.info, req.body.state, req.body.isMain, fileSrc, req.body.id],
            function (error, data) {
                if(error){
                    res.send(JSON.stringify(error));
                }else{
                    res.send(JSON.stringify(data));
                }
            }
        )
    })
})

// 店家管理/店家/編輯/不用刪檔案
app.put('/admin/store/edit/file/nodelete', function(req, res){
    uploadStore(req, res).then(fileSrc => {
        // const deleteTarget = req.body.delete.replace('http://localhost:3001/file/', './public/')
        // fs.unlinkSync(deleteTarget)
        db.query(
            'update store set sto_name = ?, sto_class = ?, sto_img = ?, sto_tel = ?, sto_location = ?, sto_pay1 = ?, sto_pay2 = ?, sto_pay3 = ?, sto_pay4 = ?, sto_pay5 = ?, sto_pay6 = ?, sto_pay7 = ?, sto_thu = ?, sto_fri = ?, sto_sat = ?, sto_sun = ?, sto_fb = ?, sto_ins = ?, sto_line = ?, sto_info = ?, sto_sta = ?, sto_main = ?, sto_first_img = ? where sto_id = ?',
            [req.body.name, req.body.type, req.body.logo, req.body.tel, req.body.location, req.body.pay1, req.body.pay2, req.body.pay3, req.body.pay4, req.body.pay5, req.body.pay6, req.body.pay7, req.body.thu, req.body.fri, req.body.sat, req.body.sun, req.body.fb, req.body.ig, req.body.line, req.body.info, req.body.state, req.body.isMain, fileSrc, req.body.id],
            function (error, data) {
                if(error){
                    res.send(JSON.stringify(error));
                }else{
                    res.send(JSON.stringify(data));
                }
            }
        )
    })
})




// 多張圖片Api -------------------------------------------------------------------

function uploadMuitiActivity(req,res) {
    return new Promise((resolve, reject) => {
        uploadEngineActivity.array('files')(req, res, function(err){
            if(err) {
                reject(err)
            }else{
                console.log('files', req.files)
                let concatUrl = []
                req.files.forEach(e=>{
                    concatUrl.push(updateBaseUrl + activityPath + e.filename)
                })
                resolve(concatUrl.join(','))
            }
        })
    })
}

function uploadMuitiStore(req,res) {
    return new Promise((resolve, reject) => {
        uploadEngineStore.array('files')(req, res, function(err){
            if(err) {
                reject(err)
            }else{
                console.log('files', req.files)
                let concatUrl = []
                req.files.forEach(e=>{
                    concatUrl.push(updateBaseUrl + storePath + e.filename)
                })
                resolve(concatUrl.join(','))
            }
        })
    })
}


// 活動多張圖片取得
app.get('/admin/activity/get/file/multiple', function(req, res){
    db.query(
        'select * from activity_img where act_id = ?',
        [req.query.id],
        function (error, data) {
            if(error){
                res.send(JSON.stringify(error));
            }else{
                res.send(JSON.stringify(data));
            }
        }
    )
})

// 活動多張圖片上傳
app.post('/admin/activity/post/file/multiple', function(req, res){
    uploadMuitiActivity(req, res).then(fileSrc => {
        db.query(
            'insert into activity_img (act_id, act_img_url) values (?, ?)',
            [req.body.id, fileSrc],
            function (error, data) {
                if(error){
                    res.send(JSON.stringify(error));
                }else{
                    res.send(JSON.stringify(data));
                }
            }
        )
    })
})



// 活動多張圖片編輯
app.put('/admin/activity/edit/file/multiple', function(req, res){
    uploadMuitiActivity(req, res).then(fileSrc => {
        let stayTarget = JSON.parse(req.body.stay)
        let finalUrl = ''
        if(stayTarget.length != 0){
            let concatStayUrl = []
            stayTarget.forEach(e=>{
                concatStayUrl.push(e)
            })
            let stayUrl = concatStayUrl.join(',')
            finalUrl = stayUrl + ',' + fileSrc
        }else{
            finalUrl = fileSrc
        }

        let deleteTarget = JSON.parse(req.body.delete).filter(e=>e != '')

        console.log('delete', deleteTarget)
        if(deleteTarget.length != 0){
            console.log('hello')
            deleteTarget.forEach(e=>{
                let deleteTarget = e.replace('http://localhost:3001/file/', './public/')
                fs.unlinkSync(deleteTarget)
            })
        }
        
        db.query(
            'update activity_img set act_img_url = ? where act_id = ?',
            [finalUrl, req.body.id],
            // [req.body, 'test', 'test', 'test', 'test', 'test', 'test', 2, true, imgsrc, '1', 'test'],
            function (error, data) {
                if(error){
                    res.send(JSON.stringify(error));
                }else{
                    res.send(JSON.stringify(fileSrc));
                }
            }
        )
    })
})


// 店家多張圖片取得
app.get('/admin/store/get/file/multiple', function(req, res){
    db.query(
        'select * from store_img where sto_id = ?',
        [req.query.id],
        function (error, data) {
            if(error){
                res.send(JSON.stringify(error));
            }else{
                res.send(JSON.stringify(data));
            }
        }
    )
})

// 店家多張圖片上傳
app.post('/admin/store/post/file/multiple', function(req, res){
    uploadMuitiStore(req, res).then(fileSrc => {
        db.query(
            'insert into store_img (sto_id, sto_img_url) values (?, ?)',
            [req.body.id, fileSrc],
            function (error, data) {
                if(error){
                    res.send(JSON.stringify(error));
                }else{
                    res.send(JSON.stringify(data));
                }
            }
        )
    })
})

// app.put('/test', function(req, res){
//     uploadMuitiStore(req, res).then(fileSrc => {
//         db.query(
//             'update store_img set sto_img_url = ? where sto_id = ?',
//             [fileSrc, req.body.id],
//             function (error, data) {
//                 if(error){
//                     res.send(JSON.stringify(error));
//                 }else{
//                     res.send(JSON.stringify(data));
//                 }
//             }
//         )
//     })
// })


// 店家多張圖片編輯
app.put('/admin/store/edit/file/multiple', function(req, res){
    uploadMuitiStore(req, res).then(fileSrc => {
        let stayTarget = JSON.parse(req.body.stay)
        let finalUrl = ''
        if(stayTarget.length != 0){
            let concatStayUrl = []
            stayTarget.forEach(e=>{
                concatStayUrl.push(e)
            })
            let stayUrl = concatStayUrl.join(',')
            finalUrl = stayUrl + ',' + fileSrc
        }else{
            finalUrl = fileSrc
        }
        // if(stayTarget.length != 0){
        //     let concatStayUrl = []
        //     stayTarget.forEach(e=>{
        //         concatStayUrl.push(e)
        //     })
        //     let stayUrl = concatStayUrl.join(',')
        //     finalUrl = stayUrl + ',' + fileSrc
        // }else{
        //     finalUrl = fileSrc
        // }

        let deleteTarget = JSON.parse(req.body.delete).filter(e=>e != '')

        console.log('delete', deleteTarget)
        if(deleteTarget.length != 0){
            deleteTarget.forEach(e=>{
                let deleteTarget = e.replace('http://localhost:3001/file/', './public/')
                fs.unlinkSync(deleteTarget)
            })
        }
        
        db.query(
            'update store_img set sto_img_url = ? where sto_id = ?',
            [finalUrl, req.body.id],
            // [req.body, 'test', 'test', 'test', 'test', 'test', 'test', 2, true, imgsrc, '1', 'test'],
            function (error, data) {
                if(error){
                    res.send(JSON.stringify(error));
                }else{
                    res.send(JSON.stringify(fileSrc));
                }
            }
        )
    })
})



let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "park2Taichung@gmail.com",  // 
        pass: "frqhxqfmhusclvjd" // 
    }
});




// 寄信功能/合約
app.post('/mail/contract/post', function(req, res){
    let mailOptions = {
        from: "park2Taichung@gmail.com",  // 發信者
        to: req.body.target, // 收信者
        subject: req.body.title,  // 郵件title
        text: req.body.content,
        attachments: [
            {
                filename: 'contract.pdf',
                path: './contract.pdf'
            }
        ]
        // text: '',  // 內文
        // html: "<h1>Heading</h1><a href='https://en.wikipedia.org/'>Wiki</a>"  // html版本內文
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log("訊息發送: " + info.response);
        }
    });
})

// 寄信功能/登入頁連結及帳號密碼
app.post('/mail/login/post', function(req, res){
    let mailOptions = {
        from: "park2Taichung@gmail.com",  // 發信者
        to: req.body.target, // 收信者
        subject: req.body.title,  // 郵件title
        text: req.body.content
        // text: '',  // 內文
        // html: "<h1>Heading</h1><a href='https://en.wikipedia.org/'>Wiki</a>"  // html版本內文
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log("訊息發送: " + info.response);
        }
    });
})


// 新增user帳號
app.post('/admin/account/post', function(req, res){
    db.query(
        'insert into user (sto_id, user_account, user_password, user_name, user_level) values (?, ?, ?, ?, ?)',
        [req.body.id, req.body.account, req.body.password, req.body.name, req.body.level],
        function (error, data) {
            if(error){
                res.send(JSON.stringify(error));
            }else{
                res.send(JSON.stringify(data));
            }
        }
    )
})