const mongoose = require("mongoose");
require('dotenv').config(); 


//define the mongodb connection URL
// const mongoURL = "mongodb://127.0.0.1:27017/hotels"; //local //replace mydatabase with your db name
// const mongoURL = "mongodb+srv://helloworld:Qwerty12345@cluster0.syfdvuf.mongodb.net/";

//after adding dotenv configuration 
const mongoURL = process.env.MONGODB_URL_LOCAL;//LOCAL
// const mongoURL = process.env.MONGODB_URL;//online



//set up mongodb connection
// mongoose.connect(mongoURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology : true
// });
//set up mongodb connection
mongoose.connect(mongoURL);

//Get the default connection
//Mongoose maintains a default connection object that represent mongodb connection
const db = mongoose.connection;

//Define event listeners for database connection
db.on("connected", () => {
  console.log("connected to mongodb server");
});

db.on("error", (err) => {
  console.log("mongodb connection error", err);
});

db.on("disconnected", () => {
  console.log("mongodb disconnected");
});

//export database connection
module.exports = db;
