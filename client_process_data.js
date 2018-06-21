var log = require('./log').log;
var data = {
    /* Function check syntax of data of objectData recieve from CLIENT */
    check_data: function(data){
        try {
            var f = data.func;
            var d = data.dev;
        } catch (e) {
            log.p(e, 'client_process');
            return 801;     //Cannot parse json
        }
        return 0;
    }
}

module.exports.data = data;