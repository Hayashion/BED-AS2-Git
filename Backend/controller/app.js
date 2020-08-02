var express=require('express');
var userDB = require('../model/user.js');
var travelDB = require('../model/travel.js');
var itineraryDB = require('../model/itinerary.js');
var reviewDB = require('../model/review.js');

const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config.js"); 


var app=express();
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});

app.use(bodyParser.json()); //parse appilcation/json data
app.use(urlencodedParser);

const cors = require("cors");
app.use(cors());

//  NEW API
app.get('/travel/:id', function (req, res) {

    var id = req.params.id;

    travelDB.getTravelsOne(id, function (err, result) {
         res.type('json');
         if (err) {
            
             res.status(500);
             res.send(`{"message":"Internal Server Error"}`);
         } else {
             res.status(200);
             res.send(result);
         }
     });
 });

 app.get('/search', function (req, res) {

    var country = req.query.country;
    var price = req.query.price;
    var period = req.query.period;

    travelDB.getTravelsSearch(country,price,period, function (err, result) {
         res.type('json');
         if (err) {           
             res.status(500);
             res.send(`{"message":"Internal Server Error"}`);
         } else {
             res.status(200);
             res.send(result);
         }
     });
 });

 app.post("/login/", (req, res) => {
    userDB.verify(
      req.body.email,
      req.body.password,
      (error, user) => {
        if (error) {
            console.log(error)
          next(error);
          return;
        }
        if (user === null) {
          res.status(401).send();
          return;
        }
        const payload = { user_id: user.userid };
        jwt.sign(payload, JWT_SECRET.key, { algorithm: "HS256" }, (error, token) => {
          if (error) {
            console.log(error);
            res.status(401).send();
            return;
          } 
          console.log({
            token: token,
            user_id: user.userid
          })
          res.status(200).send({
            token: token,
            user_id: user.userid,
            role: user.role
          });
        })
    });
  });
  



// Q1
app.get('/users', function (req, res) {

    userDB.getUsers(function (err, result) {
         res.type('json');
         if (err) {
             res.status(500);
             res.send(`{"message":"Internal Server Error"}`);
         } else {
             res.status(200);
             res.send(result);
         }
     });
 });

 // Q2
app.post('/users', function (req, res) {

    var username = req.body.username;
    var email = req.body.email;
    var picurl = req.body.profile_pic_url;

    userDB.insertUser(username, email, picurl, function (err, result) {
        res.type('json');
        if (err) {
            res.status(500);
            res.send(`{"message":"Internal Server Error"}`);
        } else {
            res.status(201);
            res.send(`{"userid:${result.insertId}"}`);
            console.log(result)
        }
    });
});

// Q3
app.get('/users/:id', function (req, res) {

    var id = req.params.id;

    userDB.getUserid(id,function(err, result) {
         res.type('json');
         if (err) {
             res.status(500);
             res.send(`{"message":"Internal Server Error"}`);
         } else {
             res.status(200);
             res.send(result);
         }
     });
 });

 // Q4
 app.put('/users/:id', function (req, res) {

    var username = req.body.username;
    var email = req.body.email;
    var picurl = req.body.profile_pic_url;
    var id = req.params.id;

    userDB.updateUser(id, username, email, picurl, function (err, result) {

        res.type('json');
        if (err) {
            if (err.errno==1062){
                res.status(422)
                res.send() 
            }
            else {
                
                res.status(500);
                res.send(`{"message":"Internal Server Error"}`);
            }
        } else {
            res.status(204);
            res.send();
        }
    });
});

// Q5
app.get('/travel', function (req, res) {

    travelDB.getTravels(function (err, result) {
         res.type('json');
         if (err) {
            
             res.status(500);
             res.send(`{"message":"Internal Server Error"}`);
         } else {
             res.status(200);
             res.send(result);
         }
     });
 });

 // Q6
 app.post('/travel', function (req, res) {

    var title = req.body.title;
    var desc = req.body.description;
    var price = req.body.price;
    var country = req.body.country;
    var period = req.body.travelPeriod;

    travelDB.insertTravel(title,desc,price,country,period, function (err, result) {
        res.type('json');
        if (err) {
            console.log(err);
            res.status(500);
            res.send(`{"message":"Internal Server Error"}`);
        } else {
            res.status(201);
            res.send(`{"travelid:${result.insertId}"}`);
        }
    });
});

//Q7
app.delete('/travel/:id', function (req, res) {

    var id = req.params.id;

    travelDB.deleteTravel(id, function (err, result) {

        res.type('json');

        if (err) {
            
            res.status(500);
            res.send(`{"message":"Internal Server Error"}`);
        } else {
            res.status(204);
            res.send();
        }
    });
});

 // Q8
 app.put('/travel/:id', function (req, res) {

    var id = req.params.id;
    var title = req.body.title;
    var desc = req.body.description;
    var price = req.body.price;
    var country = req.body.country;
    var period = req.body.travelPeriod;

    travelDB.updateTravel(id,title,desc,price,country,period, function (err, result) {

        res.type('json');
        if (err) {
            res.status(500);
            
            res.send(`{"message":"Internal Server Error"}`);
        } else {
            res.status(204);
            res.send();
        }
    });
});

//Q9
app.get('/travel/:id/itinerary', function (req, res) {

    var id = req.params.id

    itineraryDB.getItinerary(id, function (err, result) {
         res.type('json');
         if (err) {
            
             res.status(500);
             res.send(`{"message":"Internal Server Error"}`);
         } else {
             res.status(200);
             res.send(result);
         }
     });
 });

 //Q10
 app.post('/travel/:id/itinerary', function (req, res) {

    var day = req.body.day;
    var activity = req.body.activity;
    var id = req.params.id;

    itineraryDB.insertItinerary(id,day,activity, function (err, result) {
        res.type('json');
        if (err) {
            
            res.status(500);
            res.send(`{"message":"Internal Server Error"}`);
        } else {
            res.status(201);
            res.send(`{"itineraryid:${result.insertId}"}`);
        }
    });
});

 //Q11
 app.post('/user/:uid/travel/:tid/review', function (req, res) {

    var content = req.body.content;
    var rating = req.body.rating;
    var uid = req.params.uid;
    var tid = req.params.tid

    reviewDB.insertReview(uid,tid,content,rating, function (err, result) {
        res.type('json');
        if (err) {
            
            res.status(500);
            res.send(`{"message":"Internal Server Error"}`);
        } else {
            res.status(201);
            res.send(`{"reviewid:${result.insertId}"}`);
        }
    });
});

//Q12
app.get('/travel/:id/review', function (req, res) {

    var id = req.params.id

    reviewDB.getTravelReviews(id, function (err, result) {
         res.type('json');
         if (err) {
            
             res.status(500);
             res.send(`{"message":"Internal Server Error"}`);
         } else {
             res.status(200);
             res.send(result);
         }
     });
 });

module.exports=app;