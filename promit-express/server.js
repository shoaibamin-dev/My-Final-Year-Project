const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const path = require('path');
const nodemailer = require('nodemailer')

const seller = require('./routes/api/seller');
const promoter = require('./routes/api/promoter');
const product = require('./routes/api/product');
const promotion = require('./routes/api/promotion');
const buyer = require('./routes/api/buyer');


const app = express();

app.use(bodyParser.json());

const db = require('./config/dbconn').mongoURI;
console.log(db)
// Init gfs
let gfs;
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Mongo connected');
}).catch((err) => console.log('not connected'));



const conn = mongoose.connection;

conn.once('open', function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});


// Create storage engine
// const storage = new GridFsStorage({
//   url: db,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });
// const upload = multer({ storage });


// //Upload Image  
// app.post('/upload_image',upload.array('files',4),(req, res) => {
//   // res.json({ file: files});
//   // res.json({"body": req})
//   // console.log(req.body)

//   // console.log(req.file) // image url

//   if(req.files){

//   }

//   console.log(req.files) // other things
// })


app.get('/api/image/:filename', (req, res) => {
  
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {

    if (err) {
      return res.json({ err: "DOESNTWORK" })
    }

    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);


  });
})


//NODEMAILER START

// app.post('/send_email', (req, res) => {
  

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp-pulse.com",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: 'shoaibsivany@gmail.com', // generated ethereal user
//       pass: 'rNZfpm644GBN'  // generated ethereal password
//     },
//     tls:{
//       rejectUnauthorized:false
//     }
//   });

//   // setup email data with unicode symbols
//   let mailOptions = {
//     from: '"Nodemailer Contact" <your@email.com>', // sender address
//     to: 'shoaibsivany@gmail.com', // list of receivers
//     subject: 'Node Contact Request', // Subject line
//     text: 'Hello world?' // plain text body
   
//   };
  

//   // send mail with defined transport object
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.log(error);
//     }
//     console.log('Message sent: %s', info.messageId);
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//    res.json({"a":true})
//   });
// });

//NODEMAILER END

app.use('/api/seller', seller)
app.use('/api/promoter', promoter)
app.use('/api/product', product)
app.use('/api/promotion', promotion)
app.use('/api/buyer', buyer)


const port = process.env.PORT || 5000;

app.listen(port, () => console.log('server started'));


module.exports = gfs;