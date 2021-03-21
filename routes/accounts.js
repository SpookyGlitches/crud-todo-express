const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const connection = require("../db");

router.get("/login", (req, res) => {
	res.render("login");
});

router.get("/sign-up", (req, res) => {
	res.render("sign-up");
});

router.post("/login", async (req, res) => {
	try {
		const [user] = await connection
			.promise()
			.query(
				"SELECT * FROM users WHERE username = ?",
				req.body.username
			);
		if (user && user.length != 0) {
			const match = bcrypt.compareSync(
				req.body.password,
				user[0].password
			);
			if (match) {
				req.session.userId = user[0].user_id;
				res.redirect("/tasks");
			} else res.send("Incorrect password");
		} else res.send("User not found");
	} catch (err) {
		res.send(err);
	}
});

router.post("/sign-up", (req, res) => {
	if (req.body.password != req.body.confirmPassword)
		res.send("Passwords do not match");
	else {
		const hashedPassword = bcrypt.hashSync(req.body.password, 10);
		connection
			.promise()
			.query(
				"INSERT INTO users (username,password) VALUES (?,?)",
				[req.body.username, hashedPassword]
			)
			.then(([results, fields]) => {
				if (results.insertId)
					res.redirect("/accounts/login");
				else res.status(500).send();
			})
			.catch((err) => {
				res.send(err);
			});
	}
});

router.post("/log-out", (req, res) => {
	req.session.destroy((err) => {
		if (err) throw err;
		else res.redirect("/accounts/login");
	});
});

module.exports = router;
