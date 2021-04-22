const bcrypt = require("bcrypt");
const Account = require("../models/account");

exports.getLoginPage = (req, res) => {
	res.render("login");
};

exports.getSignupPage = (req, res) => {
	res.render("sign-up");
};

exports.signup = async (req, res) => {
	if (req.body.password != req.body.confirmPassword) {
		return res.send("Passwords do not match");
	}
	const hashedPassword = bcrypt.hashSync(req.body.password, 10);
	req.password = hashedPassword;
	try {
		let user = await Account.create({
			username: req.body.username,
			password: hashedPassword,
		});
		res.redirect("/accounts/login");
	} catch (err) {
		res.send(err);
	}
};

exports.login = async (req, res) => {
	let user = await Account.findOne({
		where: { username: req.body.username },
	});
	if (!user) {
		res.send("User not found");
	} else {
		console.log(user);
		const match = bcrypt.compareSync(
			req.body.password,
			user.password
		);
		if (!match) {
			res.send("Incorrect password");
		} else {
			req.session.userId = user.id;
			res.redirect("/tasks");
		}
	}
};

exports.logout = (req, res) => {
	req.session.destroy((err) => {
		if (err) throw err;
		else res.redirect("/accounts/login");
	});
};
