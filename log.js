/*
    LOGGER: Server control logger with mysql storage
*/
var DEBUG = 1;

var env     = require('./env').env;
var mysql   = require('mysql');

/* connecto server */
var connection = mysql.createConnection({
  host     : env.mysql.HOST,
  user     : env.mysql.USER,
  password : env.mysql.PASS,
  database : env.mysql.DBLOGGER
});
connection.connect();
connection.query('use ' + env.mysql.DB, function(e,r,f){
    if(e){
        console.log(e);
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
            console.log(d.getTime()+ ' : ' + content);
        }
    },
    p: function(content, host){
        var d = new Date();
        if(host){
            console.log(d.getTime() + ' - ' + host+" : " + content)
        }else{
            console.log(d.getTime() + ' - ' + 'UNKNOW : ' + content);
        }
    }
}
module.exports.log = log;