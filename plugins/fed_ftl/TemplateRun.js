/**
 * Connect to JAR
 *
 * @author :ijse
 */
var spawn = require('child_process').spawn;
var iconv = require("iconv-lite");

//
// args:
//	data - data model
//	settings - include `encoding` and `viewFolder`
//	fileName - template file name
exports.processTemplate = function(args) {
	var dataModel = JSON.stringify(args.data);
	var settings = JSON.stringify(args.settings);

	var cmd = spawn('java', ["-jar", __dirname + "/FMtoll.jar",
			settings,
			args.fileName,
			dataModel ]);


	if(args.callback) {
		cmd.stdout.on("data", function(data) {
			args.callback(null, iconv.decode(data, 'gbk'));
		});
		cmd.stderr.on("data", function(data) {
			args.callback(iconv.decode(data, 'gbk'));
		});
	}
};
