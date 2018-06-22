var PORT_SERVER=6012
var log = require('./log').log;
var net = require('net');
var client  = require('./client_process_data').data;
var cManage = require('./client_manage').client_manage;
var env = require('./env').env;
var system = require('./system');
setInterval(system.sys_running, 1000);
var server = net.createServer(function(socket) {
    socket.name = socket.remoteAddress + ":" + socket.remotePort;
    log.log('New socket connect', socket.name);
    //ADDING CLIENT TO MANAGER
    cManage.addClient(socket);
    socket.check_live = 1;
    setInterval(cManage.checkClient, env.client.CHECK_ALIVE);
    //When data from client
    socket.on('data', function(data){
        /* Process data raw checking .....*/
        try{
            var d = JSON.parse(data);
        } catch(e){
            log.p('ERROR: 1001 - Cannot parse JSON draw data', 'socket-recieve');
            log.debug('Error: ' + e);
            return;
        }
        if((d.status != undefined)&&(d.sn != undefined)&&(d.token != undefined)&&(d.data != undefined)){
        //if (d.status) {
            socket.d = d;
            client.process_data(socket);
        } else {
            log.p('ERROR: 1002 - Syntax error', 'socket-process');
        }
        /**********************************/
        //STARTUP CONNECTION - when startup device


    });

    //When error connection from client
    socket.on('error', function(err){
        log.p(err, 'main-socket-err');
    })

    //When Client leave system
    socket.on('end', function(){
        log.log('End connection', socket.name);
    });
});

server.listen(PORT_SERVER, function() {
    log.debug('LISTEN IN ' + PORT_SERVER);
});