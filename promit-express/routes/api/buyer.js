const express = require('express');
const router = express.Router();

const mongodb = require('mongodb');
// const upload = require('../../config/storage_engine').upload;



// Buyer Model
const Buyer = require('../../models/Buyer');
const Product = require('../../models/Product');
const Promoter = require('../../models/Promoter');
const Seller = require('../../models/Seller');
// Product Model
// const Product =  require('../../models/Product');

router.get('/', (req, res) => {
    res.send('<h1>Buyer</h1>')

})

router.get('/login', (req, res) => {
    const query = req.query;
    Buyer.findOne(query, {}).then(buyer => res.json(buyer));

})

router.get('/:id', (req, res) => {
    Buyer.findById(req.params.id)
        .then(buyer => res.json(buyer))
        .catch(err => console.log(`Not found`));
})

//Create
router.post('/', (req, res) => {
    const newBuyer = new Buyer({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    newBuyer.save().then(() => res.json({ "error": false })).catch(() => res.json({ "error": true }));
    // res.json({"body": req.body})

})

//Upload Image  
// router.post('/upload_product',upload.array('files',4),(req, res) => {
//     // res.json({ file: files});
//     // res.json({"body": req})
//     // console.log(req.body)

//     // console.log(req.file) // image url

//     // if(req.files){

//     // }




//     console.log(req.files) // files
//     var clone = Object.assign({}, JSON.parse(req.body.state));
//     console.log(clone.title) // states




//     // const newProduct = new Product({
//     //     name: req.body.name,
//     //     email: req.body.email,
//     //     password: req.body.password
//     // });

//     // newSeller.save().then(()=>res.json({"error":false})).catch(()=>res.json({"error":true}));





//   })

router.put('/:id', (req, res) => {

    Buyer.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
        if (err) {
            res.send("Error occured")
        }
        else {
            res.json(result);
        }
    })

    console.log("HELLO FROM PUT Buyer", req.body)

})


router.put('/update_products/:id', (req, res) => {


    console.log("req.params.id", req.params.id)
    console.log("req.body", req.body)

    console.log(req.body.result._id)

    Buyer.findByIdAndUpdate(req.params.id, { $push: { products: req.body.result } }, (err, result) => {
        if (err) {
            res.send("Error occured")
        }
        else {
            res.json(result);
        }
    })


})



router.put('/cart/:id', (req, res) => {

    const pd = req.body;

    const newObjectId = mongodb.ObjectID();



    // console.log(purchase_data, "purchase_data");

    // res.json({message:purchase_data})

    Buyer.findByIdAndUpdate(req.params.id, { $push: { products_bought: [[newObjectId, pd.product_id, pd.promoter_id, pd.seller_id, pd.price, pd.quantity, false, 0]] } }, (err, result) => {
        if (err) {
            res.send("Error occured")
        }
        else {
            res.json({ newId: newObjectId });
        }
    })

    // console.log("HELLO FROM PUT Buyer",req.body)

})

router.put('/cart/rate/:id', (req, res) => {

    const obj = req.body;

    console.log('getting obj', obj)

    Buyer.findById(req.params.id, (err, result) => {
        if (err) {
            res.send("Error occured")
        }
        else {

            for (let i = 0; i < result.products_bought.length; i++) {
                const element = result.products_bought[i];

                // console.log("ELEMENT",element);

                if (element[0] == obj.new_id.toString()) {
                    element[7] = (element[7] || element[7] == 0) ? (element[7] + obj.rating) : (obj.rating);

                    console.log("elment found", element);

                    Buyer.findByIdAndUpdate(req.params.id, { products_bought: result.products_bought }, (err, result2) => {
                        if (err) {
                            res.send("Error occured")
                        }
                        else {

                            Product.findById(obj.product_id, (err, result) => {

                                let oc = 0;
                                p_exch = result.exchanges;
                                for (var property in p_exch) {
                                    if (p_exch.hasOwnProperty(property)) {

                                        let elem = p_exch[property];
                                        if (elem[3] == obj.new_id.toString()) {
                                            console.log("found specific product!!!", elem)
                                            elem[7] = obj.rating;
                                            break;
                                        }

                                    }


                                }

                    Product.findByIdAndUpdate(obj.product_id, { exchanges: result.exchanges,   $inc: { "frequency": 1}  }, (err, result7) => {
                        if (err) {
                            res.send("Error occured")
                        }
                        else {
                        res.json({ message: 'success' });
                        }
                    })



                                // for (let i = 0; i < result.exchanges.length; i++) {
                                //     const elementt = result.exchanges_bought[i];

                                //     if (elementt[3] == obj.new_id.toString()) {
                                //         console.log("found specific product!!!", elementt)
                                //     }

                                // }


                            })



                            // Product.findByIdAndUpdate(obj.product_id, { $inc: { "frequency": 1, "ratings": obj.rating } }, (err, result2) => {
                            //     if (err) {
                            //         res.send("Error occured")
                            //     }
                            //     else {

                            //         res.json({ message: 'success' });

                            //     }


                            // });
                        }
                    });
                }
            }

        }


    });
});



router.put('/cart/bought/:id', (req, res) => {

    const obj = req.body;

    const d = new Date()
    const cd = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`

    // const newObjectId = mongodb.ObjectID();

    //    console.log("req.body", req.body)
    //    console.log("req.params.id", req.params.id)

    // console.log(purchase_data, "purchase_data");

    // res.json({message:purchase_data})

    Buyer.findById(req.params.id, (err, result) => {
        if (err) {
            res.send("Error occured")
        }
        else {




            for (let i = 0; i < result.products_bought.length; i++) {
                const element = result.products_bought[i];

                // console.log("ELEMENT",element);

                if (element[0] == obj.id.toString()) {
                    console.log(element);
                    element[6] = true;

                    Buyer.findByIdAndUpdate(req.params.id, { products_bought: result.products_bought, $inc: { "money_spent": (element[4] * element[5]) } }, (err, result2) => {
                        if (err) {
                            res.send("Error occured")
                        }
                        else {


                            Seller.findByIdAndUpdate(element[3], { $push: { products_sold: [[mongodb.ObjectID(), element[1], element[2], req.params.id, element[4], element[5], cd, element[0]]] }, $inc: { "money_earned": (element[4] * element[5]) } }, (err, result3) => {
                                if (err) {
                                    res.send("Error occured")
                                }
                                else {



                                    Promoter.findByIdAndUpdate(element[2], { $push: { promoting_products_sold: [[mongodb.ObjectID(), element[1], element[3], req.params.id, element[4], element[5], cd,element[0]]] }, $inc: { "commission_earned": Math.floor((element[4] * element[5])/10) } }, (err, result4) => {
                                        if (err) {
                                            res.send("Error occured")
                                        }
                                        else {



                                            Product.findByIdAndUpdate(element[1], { $push: { exchanges: [[mongodb.ObjectID(), req.params.id, element[2], element[0], element[4], element[5], cd]] } }, (err, result5) => {
                                                if (err) {
                                                    res.send("Error occured")
                                                }
                                                else {

                                                    console.log("FOUND")
                                                    res.json({ message: 'success' });
                                                }
                                            })







                                        }
                                    })







                                }
                            })


                            // res.json(result2);


                        }
                    })


                }



            }


        }
    })

    // console.log("HELLO FROM PUT Buyer",req.body)

})





// router.get('/get_products_bought/:id', (req, res) => {



// })


// router.post('/cart',(req,res)=>{
//     const purchase_data = req.body;

//     console.log(purchase_data, "purchase_data");
// })



router.delete('/:id', (req, res) => {
    Buyer.findById(req.params.id)
        .then(seller => seller.remove().then(() => res.json(`Buyer removed ${seller}`)))
        .catch(err => res.status(404).send("Buyer not found"))
});

module.exports = router;
