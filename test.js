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
	try{
		var d = JSON.parse(data);
		if(d.status = "100"){
			d.package = d.package+1;
		}
		client.write(JSON.stringify(d));
		console.log('CHECKED');
	} catch(e){
		console.log(e);
		return;
	}

	

});

client.on('close', function() {
	console.log('Connection closed');
});
