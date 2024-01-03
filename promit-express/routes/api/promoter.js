const express =  require('express');
const router = express.Router();



// Promoter Model
const Promoter =  require('../../models/Promoter');


router.get('/', (req, res) => {
   res.send('<h1>Promoter</h1>')
    
})

router.get('/login', (req, res) => {
    const query = req.query;
    Promoter.findOne(query,{}).then(promoter => res.json(promoter));
    
})

router.get('/:id', (req, res) => {
    Promoter.findById(req.params.id)
    .then(promoter=>res.json(promoter))
    .catch(err=>console.log(`Not found`));
})

//Create
router.post('/', (req, res) => {
    const newPromoter = new Promoter({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    
    newPromoter.save().then(()=>res.json({"error":false})).catch(()=>res.json({"error":true}));
    // res.json({"body": req.body})

})

router.put('/:id', (req, res) => {

    // console.log("req.params.id",req.params.id)

    Promoter.findByIdAndUpdate(req.params.id, req.body,(err,result) => {
        if(err){
            res.send("Error occured")
        }
        else{
            res.json(result);
        }    
    })

    console.log("HELLO FROM PUT PROMOTER",req.body)
    
})

router.delete('/:id', (req, res) => {
    Promoter.findById(req.params.id)
    .then(promoter=>promoter.remove().then(()=>res.json(`Promoter removed ${promoter}`)))
    .catch(err=>res.status(404).send("Promoter not found"))
});

module.exports = router;
