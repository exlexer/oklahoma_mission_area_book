var ss = require('./ss.js');
var dbUtils = require('../db/utils.js');
var fs = require('fs');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var sheets = google.sheets('v4');


// Creates new sheet, accepts a title for the sheet and a callback taking params of err and response
var createSheet = function (title, cb, authCb) {


	ss.auth(function (auth) {
			sheets.spreadsheets.create({
			resource: {
				properties: {
					title: title
				}
			},
			auth: auth
			}, cb);
  	}, authCb);
};

function storeToken (code, cb) {
	ss.recieveToken(code, cb);
}


function exportRc(stakeId, cb) {
	dbUtils.getStakeRcs(stakeId, function (error, response) {
		if (!response[0].sheetId) {
			createSheet(response[0].stakeName, function(err,res) {
				dbUtils.updateSheetId(stakeId, res.spreadsheetId)
				updateSheet(res.spreadsheetId, 'A1', createValMatrix(response), function (err, res) {}, cb);
				cb(res.spreadsheetUrl);
			}, cb)
		} else {
			updateSheet(response[0].sheetId, 'A1', createValMatrix(response), function (err, res) {}, cb);
  		cb('https://docs.google.com/spreadsheets/d/' + response[0].sheetId + '/edit');
		}
	})
};

function updateSheet (id, range, vals, cb, authCb) {
	ss.auth(function(auth) {
		sheets.spreadsheets.values.append({
			spreadsheetId:id,
			range: range,
			valueInputOption: 'RAW',
			resource: {
				values: vals
			},
			auth: auth
		}, cb, authCb);
	})
};


function createValMatrix (rcs) {
	var matrix = [['Current Unit', 'Name','Bishop/Branch President','Age','Gender','Date Confirmed','Status','Attended Church this month','Responsibility/Calling','Home Teacher','Visiting Teachers','Temple']];

	for (var i = 0; i < rcs.length; i++) {
		var rc = rcs[i];
		matrix.push([rc.unit, rc.name,, rc.age, rc.gender, rc.bd,,, rc.hters, rc.vters,]);
	};
	return matrix;
};

module.exports = {
	exportRc: exportRc,
	storeToken: storeToken
};

