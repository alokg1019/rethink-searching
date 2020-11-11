var express = require('express');
var router = express.Router();

const Company = require("../models/company");
const mongoose = require('mongoose');
const connectDB = require('./../database/dbConnection');

/* GET companies data */
router.get('/', async function(req, res, next) {
  
  //pagination page number - starts at 0
  var page = parseInt(req.query.page);

  //search text
  var search = req.query.search;

  if(search == undefined || search == null)
  {
      search = '';
  }
  if(isNaN(page))
  {
      page = 1;
  }

  //records per page
  var limit = 10;

  //page starts at 0
  var start = page * limit;

  //query
 var regexp = new RegExp("^" + search, "i");
 var query = {
    $or: [
        {"name" : {$regex: regexp}},
        {"description" : {$regex: regexp}},
        {"category_code" : {$regex: regexp}},
        {"email_address" : {$regex: regexp}}
    ]
};

  //find total records
  var totalRecords = await Company.find(query).countDocuments().exec();

  Company.find(query, 'name description category_code email_address').limit(limit).skip(start).then((companies) => {
  var result = {};
  
  result.total = totalRecords;
  result.data = companies;
  result.page = page;

      if(companies)
      {
          return res.status(200).send(result);
      }
      else
      {
        return res.status(500).send("Something went wrong");
      }
  });

});

module.exports = router;