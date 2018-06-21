var net = require('net');

var client = new net.Socket();
client.connect(6012, function() {
	console.log('Connected');
	var black = {
		data: {
			func: 1,
			dev: 0
		},
		status: "700",
		package: "9872",
		sn: "sjauwkcmsajh",
		token: "asdwCWQKGWsqsFl"
	}
	client.write(JSON.stringify(black));
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});
