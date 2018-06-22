module.exports.env = {
    mysql: {
        PORT: 3306,
        HOST: "172.18.0.2",
        USER: "root",
        PASS: "yoursolution",
        DB  : "MONITOR"
    },
    server:{
        PORT_SERVER: 6012,
        SERIES_NUMBER: "aaaaaaaaaabc",
        TOKEN: "",
    },
    client:{
        CHECK_ALIVE: 60000,
    }
} 