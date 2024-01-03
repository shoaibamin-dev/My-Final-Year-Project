const express = require('express');
const router = express.Router();
const upload = require('../../config/storage_engine').upload;
const gfs = require('../../server')

const Product = require('../../models/Product');


// Product Model
// Product Model
// const Product =  require('../../models/Product');

router.get('/', (req, res) => {
    // res.send('<h1>Product</h1>')

    Product.find().then(products => res.json(products));


})

router.get('/login', (req, res) => {
    const query = req.query;
    Product.findOne(query, {}).then(product => res.json(product));

})

router.get('/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => console.log(`Not found`));
})

//Create
router.post('/', (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    newProduct.save().then(() => res.json({ "error": false })).catch(() => res.json({ "error": true }));
    // res.json({"body": req.body})

})

//Upload Image  
router.post('/upload_product', upload.array('files', 4), (req, res) => {
    // res.json({ file: files});
    // res.json({"body": req})
    // console.log(req.body)

    // console.log(req.file) // image url

    // if(req.files){

    // }




    // console.log(req.files) // files
    var clone = Object.assign({}, JSON.parse(req.body.state));
    clone.pictures_id = []
    if (req.files || req.files.length != 0) {
        for (let f in req.files) {
            console.log(req.files[f].filename);
            clone.pictures_id.push(req.files[f].filename)
        }
    }


    console.log(clone) // states

    const newProduct = new Product(clone);

    newProduct.save().then((result) => res.json({ result })).catch(() => res.json({ "error": true }));





    // const newProduct = new Product({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });

    // newSeller.save().then(()=>res.json({"error":false})).catch(()=>res.json({"error":true}));



})



router.get('/purchase', (req, res) => {
    const query = req.query;

    console.log(query, "purchase product");
})

router.get('/rating/:id', (req, res) => {
    let ratingsarr = [];
    Product.findById({ _id: req.params.id }, { frequency: 1, exchanges: 1 }).then((result) => {
        console.log("found res", result)

        let sum = 0
        let res_exch = result.exchanges;
        let freq = result.frequency;

        if (freq == 0) {
            res.json({ rating: 0 })
        }
        else {
            for (let i = 0; i < result.exchanges.length; i++) {
                if (result.exchanges[i][7]) {
                    sum += result.exchanges[i][7]
                }
            }

            res.json({ rating: sum / freq });

        }



    })
})

router.get('/get_product/:id', (req, res) => {
    const seller_info = { _id: req.params.id };

    let products = [];
    let images = [];
    Seller.findOne(seller_info, {}).then((seller) => {

        products = seller.products;

        // res.json(products)


        Product.findOne({ "_id": products[0] }, {}).then((product) => {


            images = product.pictures_id;

            return res.json(images[0])

            // let c = 0;
            // while (c < products.length) {

            gfs.files.findOne({ filename: images[0] }, (err, file) => {

                if (err) {
                    return res.json({ err: "DOESNTWORK" })
                }

                return res.json(file)
                // const readstream = gfs.createReadStream(file.filename);
                // readstream.pipe(res);

            });

            // }

            //     c++;
        })

        // }
    });

    // gfs.files.findOne({ filename: req.params.filename }, (err, file) => {

    // const readstream = gfs.createReadStream(file.filename);
    // readstream.pipe(res);

});


router.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {

        if (err) {
            return res.json({ err: "DOESNTWORK" })
        }

        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);


    });
})

module.exports = router;

