var db = require('./databaseConfig.js');
var travelDB = {

    // FUNCTIONS IN USE

    // get one travel listing by ID
    getTravelsOne: function (id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                var sql = 'SELECT * FROM travel WHERE travelid = ?';
                conn.query(sql, [id], function (err, result) {
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

    // searches and sorts travel listings by search criteria
    getTravelsSearch: function (country,price,period,callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                var sql = 'SELECT * FROM travel WHERE country=? and travelPeriod=?';
                conn.query(sql, [country,period], function (err, result) {
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

    // Q5
    getTravels: function (callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                var sql = 'SELECT * FROM travel';
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

    // add new travel listing
    insertTravel: function (title, desc, price, country, period, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                var sql = 'INSERT INTO travel(title,description,price,country,travelPeriod) values(?,?,?,?,?)';
                conn.query(sql, [title, desc, price, country, period], function (err, result) {
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



    // FUNCTIONS NOT IN USE
    //Q7
    deleteTravel: function (id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                var sql = 'DELETE FROM travel WHERE travelid = ?';
                conn.query(sql, [id], function (err, result) {
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

    //Q8
    updateTravel: function (id,title, desc, price, country, period, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                var sql = 'UPDATE travel SET title=?,description=?,price=?,country=?,travelPeriod=? WHERE travelid = ?';
                conn.query(sql, [title, desc, price, country, period, id], function (err, result) {
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

module.exports = travelDB; //Exported as userDB