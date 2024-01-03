const express = require('express');
const router = express.Router();
const upload = require('../../config/storage_engine').upload;
const gfs = require('../../server') 

const Promotion = require('../../models/Promotion');


router.get('/', (req, res) => {
    // res.send('<h1>Promotion</h1>')

    Promotion.find().then(promotions => res.json(promotions));

})

router.get('/get_promotions', (req, res) => {
    console.log(req.query, "PROMOTIONS")
    const promotions_id = req.query.promotions.split(',');
    let promotions_list = [];

    for (let pid = promotions_id.length-1; pid >=0 ; pid--) {
        const spid = promotions_id[pid];
        
        Promotion.findById(spid)
        .then((snap_promotion) => {
            
            promotions_list.push(snap_promotion)
            if(pid==0){
                res.json({promotions_list})
            }
            // res.json(promotion)
        })
        .catch(err => console.log(`Not Found`));
        
    }

    // console.log("HELLO WORLD")
})

router.get('/:id', (req, res) => {

    // console.log(req.query.promotions)

    Promotion.findById(req.params.id)
        .then(promotion => res.json(promotion))
        .catch(err => console.log(`Not Found`));

    // Promotion.findOne({_id: req.params.id},{}).then((promotions)=>{
    //     res.json(promotions)
    // })

    // res.send('<h1>Promotion</h1>')

    // Product.find().then(products => res.json(products));


})











//Create
router.post('/', (req, res) => {
    // const newProduct = new Product({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });

    // newProduct.save().then(() => res.json({ "error": false })).catch(() => res.json({ "error": true }));
    // res.json({"body": req.body})

    console.log("POST API/PROMOTION", req.body)
    
    const newPromotion = new Promotion(req.body);

    newPromotion.save().then((result) => res.json({ result })).catch(() => res.json({ "error": true }));


})

//Upload Image  
router.post('/upload_promotion_picture', upload.single('files'), (req, res) => {
    // res.json({ file: files});
    // res.json({"body": req})
    // console.log(req.body)

    //  console.log(req.body.state, "REQBODYSTATE") // image url

    // if(req.files){

    // }



//----------------------

    // console.log(req.files) // files
    // var clone = Object.assign({}, JSON.parse(req.body.state));
    // clone.pictures_id = []
    // if (req.files || req.files.length != 0) {
    //     for (let f in req.files) {
    //         console.log(req.files[f].filename);
    //         clone.pictures_id.push(req.files[f].filename)
    //     }
    // }


    // console.log(clone) // states

    // console.log(req.file)

    var clone = Object.assign({}, JSON.parse(req.body.state));
    clone.picture_id = req.file.filename

    res.json(clone);  


//----------------------


    // const newProduct = new Product({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });

    // newSeller.save().then(()=>res.json({"error":false})).catch(()=>res.json({"error":true}));





})


module.exports = router;
