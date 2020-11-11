
const mongoose = require('mongoose');
require('dotenv').config();

// const URI2 = "mongodb://rethink:J4Y6RUZnqUmxkjVS@cluster0-shard-00-00.kmrz6.mongodb.net:27017,cluster0-shard-00-01.kmrz6.mongodb.net:27017,cluster0-shard-00-02.kmrz6.mongodb.net:27017/sample_training?ssl=true&replicaSet=atlas-n0cwc0-shard-0&authSource=admin&retryWrites=true&w=majority"
const URI = "mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@" + process.env.DB_HOST + "/" + process.env.DB_COLLECTION + "?ssl=true&replicaSet=atlas-n0cwc0-shard-0&authSource=admin&retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('** Mongo connected!!! **\n');
};

connectDB();
module.exports = mongoose.connection;