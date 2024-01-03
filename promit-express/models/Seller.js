const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Seller Schema
const SellerSchema = new Schema({
  name: {
    type: String, 
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  category_of_interest :{
    type: Array
  },
  products :{
    type: Array
  },
  address: {
    type: String,
    default: ''
  },
  money_earned: {
    type: Number,
    default: 0
  },
  // profile_picture:{
  //   type: Date,
  // },
  city:{
    type: String, 
    default: 'Karachi'
  },
  country:{
    type: String, 
    default: 'Pakistan'
  },

  products_sold :{
    type: Array
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Seller =  mongoose.model('seller', SellerSchema);

