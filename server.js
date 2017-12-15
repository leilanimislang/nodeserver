'use strict';
var http = require('http');
var port = process.env.PORT || 8080;
var fs = require('fs');
var obj;

function handle_incoming_request(req, res) {
    console.log("INCOMING REQUEST: " + req.method + " " + req.url);
    load_sensor_data(function (err, readings) {
        if (err) {
            console.log("Couldn't read file");
        }
        obj = JSON.parse(readings);
        res.writeHead(200, { "Content-Type": "application/json" });
        var val = obj.temperature + "," + obj.humidity + "," + obj.wind_speed + "," + obj.time + "," + obj.location;
        res.end(val);
    });
}
function load_sensor_data(callback) {
    fs.readFile(
        "sensorlog.txt", 'utf8',
        function (err, readings) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, readings);
        }
    );
}

http.createServer(handle_incoming_request).listen(port);
