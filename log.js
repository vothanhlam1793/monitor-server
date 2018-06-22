/*
    LOGGER: Server control logger with mysql storage
*/
var DEBUG = 1;
var env     = require('./env').env;
var mysql   = require('mysql');
var sTime   = new Date();
sTime       = sTime.getTime();
/* connecto server */
var connection = mysql.createConnection({
  host     : env.mysql.HOST,
  user     : env.mysql.USER,
  password : env.mysql.PASS,
  database : env.mysql.DBLOGGER
});
connection.connect(function(err){
    if(err){
        log.err(err.code + ' - Cannot connect to MySQL', 1003);
        process.exit('Check all program');
    }
});
/* ERROR HANDLING WITH MYSQL */

connection.query('use ' + env.mysql.DB, function(e,r,f){
    if(e){
        log.err(e.code + ' - Cannot use database', 1004);
    } else {
        log.debug('RES: ' + r);
    }
});
var log = {
    /* FUNCTION LOG TO DATABASE SAVE */
    log: function(content, host){
        var d = new Date();
        connection.query('insert into logger(tlog, content) value('+d.getTime()+',"'+host +':'+content+'")');
    },
    debug: function(content){
        var d = new Date();
        if(DEBUG != 0){
            console.log((d.getTime() - sTime)+ ' : ' + content);
        }
    },
    p: function(content, host){
        var d = new Date();
        if(host){
            console.log((d.getTime() - sTime) + ' - ' + host+" : " + content)
        }else{
            console.log((d.getTime() - sTime)+ ' - ' + 'UNKNOW : ' + content);
        }
    },
    err: function(content, code){
        var d = new Date();
        var c = (d.getTime() - sTime) + ' - ' + 'ERROR: ' + code + ' - ' + content;
        console.log(c);
    }
}
module.exports.log = log;