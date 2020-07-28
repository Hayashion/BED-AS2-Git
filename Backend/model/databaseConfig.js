var mysql=require('mysql');

var dbConnect={
    getConnection:function(){
        var conn=mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"password",
            database:"sptravel"
        }
        );
        return conn;
    }
}
module.exports=dbConnect;