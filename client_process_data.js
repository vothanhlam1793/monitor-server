/*
    Client control:
        - RESTART
        - ON/OFF
*/
var log         = require('./log').log;
var cManage     = require('./client_manage').client_manage;
var cRoot       = require('./client_root_manager').root;

var oStatus = {
    total: 0,           //data recieve process
    alive_100: 0,
    root_400: 0,
    ctrl_700: 0,
    bag_000: 0
}
cRoot.regisInforSystem('data',oStatus);
var data = {
    process_data: function(s){
        oStatus.total ++;
        switch(s.d.status) {
            case "100":{
                /* CHECK ALIVE SYSTEMS */
                /* Process in here => client_manage */
                oStatus.alive_100++;
                cManage.rspAlive(s);
            }
            break;
            case "700":{
                /* Process device */
                oStatus.ctrl_700 ++;
                cManage.processDevice(s);
            }
            break;
            case "400":{
                /* SYSTEM MANAGER FROM ROOT ANOTHER COUNTRY */
                oStatus.root_400 ++;
                cRoot.processRoot(s);
            }
            break;
            default:{
                oStatus.bag_000 ++;
                log.err(s.d.status + ': ' + 'Status not found', 1003);
            }
        }
    },
    getStatus: function(){
        return oStatus;
    }
}

module.exports.data = data;