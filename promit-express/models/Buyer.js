const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Buyer Schema
const BuyerSchema = new Schema({
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
  products_bought :{
    type: Array
  },
  address: {
    type: String,
    default: ''
  },
  money_spent: {
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
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Buyer =  mongoose.model('buyer', BuyerSchema);

