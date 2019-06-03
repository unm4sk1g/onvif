const request = require("request");
const xmlToJSON = require("xml2js").parseString;
const emptyFn = function() {}

var Hikvision = function(options, callback) {
	callback = callback || emptyFn;
	this.hostname = options.hostname;
	this.username = options.username;
	this.password = options.password;
	this.port = options.port || 80;
    this.timeout = options.timeout || 120000;
    
    this.preserveAddress = options.preserveAddress || false;
};

Hikvision.prototype.getData = function(isapi, callback) {
    var options = {
        uri: `http://${this.hostname}/ISAPI/${isapi}`,
        auth: {
            user: this.username,
            password: this.password,
            sendImmediately: false
        }
    };
    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            xmlToJSON(body, function(err, result) {
                console.log(result);
            });
        }
    });
};


module.exports = {
	Hikvision: Hikvision
};