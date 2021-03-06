var db = require('./index')

module.exports = {
	getRcs: function (stakeId, cb) { 
		db.query(
			'SELECT rc.name name, u.name unit, rc.age age, rc.gender gender, rc.bd bd, rc.hters hters, s.id stakeId, s.name stakeName, s.sheetId sheetId, rc.vters vters FROM rc '+
			'LEFT JOIN units u ON rc.unitId = u.id '+
			'LEFT JOIN stakes s ON u.stakeId = s.id '+
			'WHERE u.stakeId = ?', [stakeId], cb
		)},
	updateSheetId: function (stakeId, sheetId, cb) {
		cb = cb || function() {}
		db.query('UPDATE stakes SET sheetId = ? WHERE id = ?', [sheetId, stakeId], cb)},
}