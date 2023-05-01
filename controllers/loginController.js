const user = require("../models/User")
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await user.find({});
    return res.status(200).send({ status: true, data: users });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { login };
