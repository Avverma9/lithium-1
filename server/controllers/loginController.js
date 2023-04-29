const user = require("../models/User")
const adminEmail = "admin@example.com";
const adminPassword = "admin";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide email and password" });
    }

    // Check if email and password match the admin's email and password
    if (email === adminEmail && password === adminPassword) {
      const users = await user.find({});
      return res.status(200).send({ status: true, data: users });
    }

    // If email and password do not match, send an error response
    return res
      .status(401)
      .send({ status: false, message: "Invalid email or password" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { login };
