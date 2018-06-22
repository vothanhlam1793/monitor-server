var log = require('./log').log;
var os = require('os');

var objSystem = {};
var funcRunning = [];
module.exports.root = {
    processRoot: function(s){
        var oCheck = {
            data: objSystem,    
            status: "400",
            package: 0,
            sn: "",
            token: ""
        }
        s.write(JSON.stringify(oCheck));
    },
    regisInforSystem: function(name, object){
        objSystem[name] = object;
    },
    regisInforRun: function(name, objData, cb){
        console.log('heer');
        funcRunning.push(cb);
        objSystem[name] = objData;
    }    
}

setInterval(function(){
    for(var i = 0; i < funcRunning.length; i ++){
        funcRunning[i]();
    }
}, 1000);