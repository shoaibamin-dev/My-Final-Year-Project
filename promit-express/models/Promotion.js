const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Promotion Schema
const PromotionSchema = new Schema({
    picture_id: {
        type: String,
        required: true
      },
 
      product_id:{
        type: String,
        required: true
      },

     seller_id:{
        type: String,
        required: true
      },
 
      promoter_id:{
        type: String,
        required: true
      },

  
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Promotion =  mongoose.model('promotion', PromotionSchema);

