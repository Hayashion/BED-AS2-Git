var db = require('./databaseConfig.js');
var itineraryDB = {

    // Q9
    getItinerary: function (id,callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                var sql = 'SELECT * FROM itinerary WHERE travelid = ?';
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

    //10
    insertItinerary: function (id,day,activity,callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                var sql = 'INSERT INTO itinerary(travelid,day,activity) values(?,?,?)';
                conn.query(sql, [id,day,activity], function (err, result) {
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

}

module.exports = itineraryDB; //Exported as itineraryDB