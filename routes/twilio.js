var	twilioRoute = require('../twilio/index.js')
var twilio = require('twilio')
var dbUtils = require('../db/utils')

module.exports = function(app) {

function resendText (text, from) {
var params = text.split('@ ')
  dbUtils.findArea(from, (error, results) => {
    var action = params.shift().toLowerCase()
    twilioRoute[action](params, results[0].id, (error, response) => {
      if (error) { console.error(error) }
			console.log(response)
    })
  })
}

// resendText('Church@ Shayla@ Lee', '+15802770808')



	app.route('/message')
		.post((req, res) => {
			var params = req.body.Body.split('@ ')
			dbUtils.findArea(req.body.From, (error, results) => {
				var action = params.shift().toLowerCase()
				twilioRoute[action](params, results[0].id, (error, response) => {
					if (error) { console.error(error) }
					if (response) {
						var twiml = new twilio.TwimlResponse()
				  	twiml.message(response)
				  	response = twiml.toString()
						res.send(response)
					} else {
						res.send()
					}
				})
			})
		})
}