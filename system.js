var os = require('os');
var cRoot = require('./client_root_manager').root;
var oInfo = {
    host_name: os.hostname(),
    cpus: os.cpus(),
    interface: os.networkInterfaces()
}

var oRunning = {
    uptime: 0,
    totalmem: 0,
    freemem: 0
}
var system = function(){
    oRunning.uptime    = os.uptime();
    oRunning.totalmem   = os.totalmem();
    oRunning.freemem    = os.freemem();
    //console.log(oRunning.uptime + ' - FREE: ' + Math.round((Math.round(oRunning.freemem/1024.))/102.4)/10 + ' Mb \t| P: ' + Math.round((1 - oRunning.freemem/oRunning.totalmem) * 10000)/100. + ' %');
    return oRunning;
}

cRoot.regisInforRun('system', oRunning,system);
module.exports.info = oInfo;
module.exports.sys_running = system;

