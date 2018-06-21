module.exports.env = {
    mysql: {
        PORT: 3306,
        HOST: "172.19.0.2",
        USER: "root",
        PASS: "yoursolution",
        DB  : "MONITOR"
    },
    server:{
        PORT_SERVER: 6012,
    },
    client:{
        CHECK_ALIVE: 10000,
    }
} 