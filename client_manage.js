/*
    CLIENT MANAGE: using manage client connect to SERVER,
    Will check connection INTERVAL (10s);
*/

var log = require('./log').log;
var oCheck = {
    data: {

    }, 
    status: "700",
    package: 0,
    sn: "",
    token: ""
}
var client = {};
var client_garbage = {};
var counter = 0;
var client_manage = {
    addClient: function(socket){
        socket.code = Math.round(Math.random()*1000);
        client[socket.code] = socket;
        counter = counter + 1;
    },
    deleteClientGarbage: function(){
        log.p('Running delete client');
        for(i in client){ 
            if(client[i].check_live == 0){
                log.p('Deleting ... client: ', client[i].name);
                client[i].end();
                delete client[i];
            }
        }
    },
    checkClient: function(){
        log.p('running checking');
        for(i in client){
            log.p('Checking ' + client[i].name,'manager');
            oCheck.package = Math.round(Math.random()*1000);
            oCheck.status  = "100";
            client[i].pkg = oCheck.package;
            client[i].write(JSON.stringify(oCheck));
            client[i].check_live = 0;
        }
        setTimeout(function(){
            client_manage.deleteClientGarbage();
        }, 5000);
    },
    getStatus: function(){
        var objInfor = {
            total: client.length,       //client connected -> check database
            counter: counter,           //client used service
            running: client.length      //client running
        }
    }
}

module.exports.client_manage = client_manage;