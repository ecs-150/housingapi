'use-strict'

// Database
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('housing.db')


db.serialize(() => {
	let cmd = "SELECT name FROM sqlite_master WHERE type='table' AND name='housingTable' ";
	db.get(cmd, (err, val) => {
		if (err) throw err;

		if (val == undefined) {
			console.log("Creating Database ...");
			createHousingDB();
		} else {
			console.log("Database file found", val);
		}
	});
})

function createHousingDB() {
	const sql = (
		`CREATE TABLE housingTable (
			id INTEGER PRIMARY KEY UNIQUE,
			email TEXT,
			image TEXT,
			bed INTEGER,
			bath INTEGER,
			price INTEGER,
			moveIn TEXT,
			location TEXT,
			type TEXT,
			date TEXT,
			other TEXT
		)`
	);

	db.run(sql, function(err, val) {
		if (err) {
			console.log("Database creation failure", err.message);
		} else {
			console.log("Created database");
		}
	});
}

module.exports = db;