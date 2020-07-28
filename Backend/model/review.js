var db = require('./databaseConfig.js');
var reviewDB = {

    //Q11
    insertReview: function (uid,tid,content,rating,callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                var sql = 'INSERT INTO review(userid,travelid,content,rating) values(?,?,?,?)';
                conn.query(sql, [uid,tid,content,rating], function (err, result) {
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


    // Q12
    getTravelReviews: function (tid,callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                var sql = 'SELECT r.travelid,r.content,r.rating,u.username,r.createdDate FROM review r,user u WHERE r.travelid = ? AND r.userid = u.userid';
                conn.query(sql,[tid], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err)
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },

}

module.exports = reviewDB;