const express =  require('express');
const router = express.Router();
// const upload = require('../../config/storage_engine').upload;



// Seller Model
const Seller =  require('../../models/Seller');




// Product Model
// const Product =  require('../../models/Product');

router.get('/', (req, res) => {
    res.send('<h1>Seller</h1>')
     
 })

router.get('/login', (req, res) => {
    const query = req.query;
    Seller.findOne(query,{}).then(seller => res.json(seller));
    
})

router.get('/:id', (req, res) => {
    Seller.findById(req.params.id)
    .then(seller=>res.json(seller))
    .catch(err=>console.log(`Not found`));
})

//Create
router.post('/', (req, res) => {
    const newSeller = new Seller({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    
    newSeller.save().then(()=>res.json({"error":false})).catch(()=>res.json({"error":true}));
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

    Seller.findByIdAndUpdate(req.params.id, req.body,(err,result) => {
        if(err){
            res.send("Error occured")
        }
        else{
            res.json(result);
        }    
    })

    console.log("HELLO FROM PUT SELLER",req.body)
    
})

router.put('/update_products/:id', (req, res) => {


    console.log("req.params.id",req.params.id)
    console.log("req.body",req.body)

    console.log(req.body.result._id)

    Seller.findByIdAndUpdate(req.params.id, { $push: { products: req.body.result } },(err,result) => {
        if(err){
            res.send("Error occured")
        }
        else{
            res.json(result);
        }    
    })

    
})

router.put('/update_products_sold/:id', (req, res) => {

    const pd = req.body; 

    const newObjectId = mongodb.ObjectID();


    console.log("req.params.id",req.params.id)
    console.log("req.body",req.body)

    // console.log(req.body.result._id)

    // Seller.findByIdAndUpdate(req.params.id, { $push: { products_sold: [[]] } },(err,result) => {
    //     if(err){
    //         res.send("Error occured")
    //     }
    //     else{
    //         res.json(result);
    //     }    
    // })

    
})



router.delete('/:id', (req, res) => {
    Seller.findById(req.params.id)
    .then(seller=>seller.remove().then(()=>res.json(`Seller removed ${seller}`)))
    .catch(err=>res.status(404).send("Seller not found"))
});

module.exports = router;
