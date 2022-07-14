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


// 登入 API ----------------------------------------------------------------------------

app.post('/login', (req, res, next) => {
    db.query(
        'select * from user where user_account = ? and user_password = ?',
        [req.body.account, req.body.password],
        (err, result) => {
            if(err) {
                throw err;
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
                    user: result[0]
                })
            }

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

// app.post('/test', userMiddleware.isLoggedIn, (req, res, next) => {
//     console.log(req.userData)
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
        console.log(req.body.delete)
        console.log(req.body)
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



// 後台活動新增---------------------------------------------------------

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