const express = require('express')
const router = express.Router();
const userController = require("../controllers/userController")
const loginController = require("../controllers/loginController")

router.post("/submit",userController.storeUserDetails) //contact
router.get("/get",loginController.login)//admin

module.exports = router