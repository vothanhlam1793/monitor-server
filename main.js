var PORT_SERVER=6012
var log = require('./log').log;
var net = require('net');
var client = require('./client_process_data').data;

var server = net.createServer(function(socket) {
    socket.name = socket.remoteAddress + ":" + socket.remotePort;
    log.log('New socket connect', socket.name);
    //When data from client
    socket.on('data', function(data){
        try {
            var d = JSON.parse(data);
        } catch (e) {
            log.p(e, 'data-socket');
            return;
        }
        log.p(JSON.stringify(d.data));
        if(client.check_data(d.data) != 0) {

        } else {
            log.debug('Process:'+ d.data, socket.name);
        }
        //STARTUP CONNECTION - when startup device


    });

    //When error connection from client
    socket.on('error', function(err){

    })

    //When Client leave system
    socket.on('end', function(){
        log.log('End connection', socket.name);
    });
});

server.listen(PORT_SERVER, function() {
    log.debug('LISTEN IN ' + PORT_SERVER);
});