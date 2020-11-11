const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let company = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  category_code: {
    type: String
  },
  email_address :{
  type: String
  }
});

let Company = mongoose.model("Company", company);
module.exports = Company;