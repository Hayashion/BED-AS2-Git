var db = require('./databaseConfig.js');
var jwt=require('jsonwebtoken');
var config=require('../config');

var userDB={

    //Functions in Use

    //login function    
    verify: function (email,password,callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const query = "SELECT * FROM user WHERE email=? and password=?";
                conn.query(query, [email,password], (error, results) => {
                    if (error) {
                        callback(error, null);
                        return;
                    }
                    if (results.length === 0) {
                        callback(null, null);
                        return;
                    }else{
                    const user = results[0];
                    callback(null, user);
                    }       
                });
            }
        });
    },
    //checks token for admin
    verifyToken: function(req,res,next){
        console.log(req.headers);
    
        var token=req.headers['authorization']; //retrieve authorization header’s content
        console.log(token);
    
        if(!token || !token.includes('Bearer')){ //process the token
    
            res.status(403);
            return res.send({auth:'false',message:'Not authorized!'});
        }else{
            token=token.split('Bearer ')[1]; //obtain the token’s value
            console.log(token);
            jwt.verify(token,config.key,function(err,decoded){//verify token
                if (err || decoded.role != "admin"){
                    res.status(403);
                    return res.end({auth:false,message:'Not authorized!'});
                }else{
                    req.userid=decoded.userid; //decode the userid and store in req for use
                    req.role=decoded.role; //decode the role and store in req for use
                    next();
                }
    
            });
        }
    
    },


    // vv Not in use vv
    getUsers: function (callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                var sql = 'SELECT * FROM user';
                conn.query(sql, function (err, result) {
                    conn.end();
                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },

    //Q2
    insertUser: function (username,email,picurl,callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                var sql = 'INSERT INTO user(username,email,profilepicURL) values(?,?,?)';
                conn.query(sql, [username, email, picurl], function (err, result) {
                    conn.end();
                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },

    //Q3
    getUserid: function (id,callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                var sql = 'SELECT * FROM user WHERE userid = ?';
                conn.query(sql,[id], function (err, result) {
                    conn.end();
                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },

    //Q4
    updateUser: function (id,username,email,picurl,callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                var sql = 'UPDATE user SET username=?,email=?,profilepicURL=? WHERE userid = ?';
                conn.query(sql, [username,email,picurl,id], function (err, result) {
                    conn.end();
                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    }

}

module.exports=userDB; //Exported as userDB
