const express = require("express");
const router = express.Router();

const account = require('../controllers/accountController')

router.get("/login", account.getLoginPage);

router.get("/sign-up", account.getSignupPage);

router.post("/login", account.login);

router.post("/sign-up", account.signup);

router.post("/log-out", account.logout);

module.exports = router;
