const express = require('express')
const router = express.Router();
const userController = require("../controllers/userController")
const loginController = require("../controllers/loginController")

router.post("/submit",userController.storeUserDetails)
router.get("/get",loginController.login)

module.exports = router