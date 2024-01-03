const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Product Schema
const ProductSchema = new Schema({
  name: {
    type: String, 
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true
  },
  category_id :{
    type: Array
  },
  owner_id:{
    type: String,
    required: true
  },
  pictures_id: {
    type: Array,
    required: true
  },
  
  // profile_picture:{
  //   type: Date,
  // },
  promoters:{
    type: Array,
   
  },
  price:{
    type: Number, 
    required: true
  },


  exchanges :{
    type: Array
  },

  frequency:{
    type: Number,
    default: 0
  },


  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product =  mongoose.model('product', ProductSchema);

