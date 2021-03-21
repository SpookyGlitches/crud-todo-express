const express = require("express");
const router = express.Router();
const connection = require("../db");

router.use((req, res, next) => {
	if (!req.session.userId) res.redirect("/accounts/login");
	else next();
});

router.get("/", (req, res) => {
	const userId = req.session.userId;
	if (!userId) res.redirect("/accounts/login");
	else {
		connection
			.promise()
			.query("SELECT * FROM tasks WHERE user_id = ?", userId)
			.then(([tasks]) => {
				res.render("home", {
					tasks: tasks,
					userId: userId,
				});
			})
			.catch((err) => res.send(err));
	}
});

router.post("/create", (req, res) => {
	const userId = req.session.userId;
	connection.query(
		"INSERT INTO tasks (user_id,title,is_completed) VALUES (?,?,?)",
		[userId, req.body.title, 0],
		(err, results) => {
			if (err) res.send(err);
			else if (results.insertId) res.redirect("back");
			else res.status(500).send();
		}
	);
});

router.post("/:taskId/mark", (req, res) => {
	const userId = req.session.userId;
	req.body.mark = req.body.mark ? true : false;
	connection.query(
		"UPDATE tasks SET is_completed = ? WHERE user_id = ? && task_id = ?",
		[req.body.mark, userId, req.params.taskId],
		(err, results) => {
			if (err) res.send(err);
			else if (results.affectedRows != 0)
				res.redirect("back");
			else res.send("Unable to update task");
		}
	);
});

router.post("/:taskId/edit", (req, res) => {
	const userId = req.session.userId;
	connection.query(
		"UPDATE tasks SET title = ? WHERE user_id = ? && task_id = ?",
		[req.body.title, userId, req.params.taskId],
		(err, results) => {
			if (err) res.send(err);
			else if (results.affectedRows != 0)
				res.redirect("back");
			else res.send("Unable to update task");
		}
	);
});

router.post("/:taskId/delete", (req, res) => {
	const userId = req.session.userId;
	connection.query(
		"DELETE FROM tasks WHERE user_id = ? && task_id = ?",
		[userId, req.params.taskId],
		(err, results) => {
			if (err) res.send(err);
			else if (results.affectedRows != 0)
				res.redirect("back");
			else res.send("Unable to update task");
		}
	);
});

module.exports = router;
