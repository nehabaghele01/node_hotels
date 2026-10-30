// let prompt = require('prompt-sync')();
// console.log("hii heeloo");
// console.log("hii heeloo");
// let name = prompt("enter your name : ");

// const express = require('express');
// console.log("i am neha");

//functions with different way of writing the same function
// function add(a, b){
//     return a + b;
// }

// var add = function(a, b){
//     return a + b;
// }

//arrow function
// var add = (a, b) => {
//     return a + b;
// }

// var add = (a, b) => a + b;

// console.log(add(3, 4));

//fn runs immeditely
// (function(){
//     console.log("turant call hoga ye fn");
// })();

//callback fun -> passed as an argument in another fn 1.main fn call  2. callback fn call

//callback fn 3
// function callback(){
//     console.log("i am callback back fn , called after main fn ends");
// }

// //main fn 2
// function add(a, b, callback){
//     console.log(a + b);
//     callback();
// }
// //call 1
// add(8, 9, callback);

//shoter way
// const add = function(a, b, neha){
//   let result = a + b;
//   console.log(result);//main fn work ends here!
//   neha();

// }

//call
// add(5, 5, function(){
//     console.log("i am neha");
// })

// //very short
// add(3, 4, ()=>{
//     console.log("i am neha");
// });

//CORE MODULE OF JS (fs, os)
// const os = require('node:os');
// const fs =  require('node:fs');

// var user = os.userInfo();
// console.log(user);
// console.log(user.username);
// console.log(os);

// //create a file , write a greeting msg and sent to this username
// fs.appendFile('greeting.txt', 'hi ' + user.username + '!\n', () => {
//     console.log("file is created");
// });
// console.log(fs);

// //IMPORT & EXPORT
// const code = require("./code.js");
// console.log("hi i am server.js");

// //exported elements : code.js, age var, addNumber fn
// let age = code.age; //20
// console.log("current age :", age); //20

// let result = code.addNumber(age + 10, 7); //(30 , 7) => 37
// console.log("new age :", result); //37

// let cgpa = code.getpercentage(8.5);
// console.log(cgpa);

//LIBRARY/PCK: lodash has imp functions
// let _ = require('lodash');

//ex:
// let data = ["neha", "neha", 1 , 2, 3, 4, 6, 6, 'a', 'a' , 'n'];
// let filter = _.uniq(data);
// console.log(filter);

// console.log(_.isString("neha"));//1
// console.log(_.isString(true));//0
// console.log(_.isString(1));//0

//5/20 (express.js)
//json data format

// Object → String
// JSON.stringify(object);

// String → Object
// JSON.parse(string);

//json string to object (.parse)
// const jsonString = '{"name" : "neha","age" : 20, "cgpa" : 8.53 }';
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject);
// console.log(jsonObject.name);

//object to json string (.stringify)   / Object → String
// const jsonObject  = {name : "neha", age : 20, cgpa : 8.53, isadult : true};
// const jsonString = JSON.stringify(jsonObject);
// console.log(jsonString);
// console.log(jsonString.name);





///////////////////////////////////////////////////////////////////////////



//CREATE SERVER in Node.js
// const express = require("express");
// const app = express();
// const db = require("./db");
// const Person = require("./models/Person");
// const MenuItem = require("./models/MenuItem");

// //middleware
// const bodyParser = require("body-parser");
// app.use(bodyParser.json()); //req.body

// //menu cards (apis)-> things that a server(waiter) can give to clients
// //GET REQ
// app.get("/", function (req, res) {
//   res.send("welcome to the hotel! how can i help you?");
// });

// app.get('/chicken' ,function (req , res){
//     res.send("i would love to serve chicken to youu");
// });

// app.get('/idli' ,function (req , res){
//     res.send("i would love to serve idli to youu");
// });

// app.post('/person', function(req, res){
//     console.log("data received at backend through postman");
// })

// app.get('/idli' ,function (req , res){

//     let customized_idli = {
//         name : "rava idli",
//         size : "10 cm radius",
//         is_sambhar : true
//     };
// res.send(customized_idli);
//     //res converted to json string from object
//     let ans = JSON.stringify(customized_idli);
//     res.send(ans);
// });

//post api
//post route to add new person
// app.post('/person' , (req, res)=>{

//     const data = req.body; //assuming the request body conatains the person data

//     //create a new person document using the mongoose model
//     const newPerson = new Person(data);

//     //save the new person data to the database
//     newPerson.save((error , savedPerson) =>{
//         if(error) {
//             console.log('Error saving person:', error);
//             res.status(500).json({error : 'Internal server error'})
//         }else{
//             console.log('data saved successfully');
//             res.status(200).json(savedPerson);
//         }
//     })
// })

//post api
// //post route to add new person (USING ASYNC AWAIT)
// app.post("/person", async (req, res) => {
//   try {
//     const data = req.body; //assuming the request body conatains the person data

//     //create a new person document using the mongoose model
//     const newPerson = new Person(data);

//     //save the new person data to the database
//     const response = await newPerson.save();
//     console.log("data saves");
//     res.status(200).json(response);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "internal server error" });
//   }
// });

// //ask for data from server (database)
// app.get("/person", async (req, res) => {
//   try {
//     const data = await Person.find();
//     console.log("data is fetched");
//     res.status(200).json(data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "internal server error" });
//   }
// });

// app.listen(3000, () => {
//   //severs port no (room no)
//   console.log("server is listening on PORT 3000");
// });
















////////////////////////////////////////////////////////////////////////////

///TO CLEAR ALL THE THINGS CLEARY , REVISIT / REWRITE ONLY REQUIRED CODE
//CREATE SERVER in Node.js
const express = require("express");
const app = express();
const db = require("./db");
const Person = require("./models/Person");
const MenuItem = require("./models/MenuItem");

//middleware(Take data from client and convert/parse into backend understandable format and store it into database)
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body

//GET api
app.get("/", (req, res) => {
  res.send("welcome to our hotel");
});

//import person router file 
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

//use the routers
app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);

app.listen(3000, () => {
  //severs port no (room no)
  console.log("server is listening on PORT 3000");
});
