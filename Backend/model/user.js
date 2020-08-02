var db = require('./databaseConfig.js');
var userDB={

    //NEW API
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


    // Q1
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
