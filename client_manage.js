/*
    CLIENT MANAGE: using manage client connect to SERVER,
    Will check connection INTERVAL (10s);
    Using by main.js
*/

var log = require('./log').log;
var cRoot = require('./client_root_manager').root;
var client = {};
var oStatusCL = {
    total: 0,               //total device connect
    real: 0,                //device real any interval check
}
cRoot.regisInforSystem('device', oStatusCL);
var client_manage = {
    /* */
    addClient: function(socket){
        socket.code = Math.round(Math.random()*1000);
        client[socket.code] = socket;
        oStatusCL.total = oStatusCL.total + 1;
    },
    deleteClientGarbage: function(){
        oStatusCL.real = 0;
        for(i in client){ 
            if(client[i].check_live == 0){
                oStatusCL.total = oStatusCL.total - 1;
                client[i].end();
                delete client[i];
            }else{
                oStatusCL.real ++;
            }
        }
    },
    checkClient: function(){
        var oCheck = {
            data: {}, 
            status: "700",
            package: 0,
            sn: "",
            token: ""
        }
        for(i in client){
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
    /* Check-process alive */
    rspAlive: function(s){
        try{
            var check = s.d.package - s.pkg;
        } catch(e){
            //Log event -> database
            log.log(s.name, 'check-pkg-live');
            return;
        }
        if(check == 1){
            s.check_live = 1;
        }
    },

    /* Process device when status 700*/
    processDevice: function(s){

    }
}

module.exports.client_manage = client_manage;