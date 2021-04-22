const express = require("express");
const router = express.Router();
const task = require('../controllers/taskController')

router.use((req, res, next) => {
	if (!req.session.userId) res.redirect("/accounts/login");
	else next();
});

router.get("/", task.index);

router.post("/create", task.create);

router.post("/:taskId/mark", task.complete);

router.post("/:taskId/edit", task.edit);

router.post("/:taskId/delete", task.deleteT);

module.exports = router;
