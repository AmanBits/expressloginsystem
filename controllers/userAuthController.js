const User = require("../models/userModel");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

module.exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.signup = async (req, res) => {
  try {
    const { username, email, password } = { ...req.body };
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ ...req.body, password: hashPassword });

    newUser
      .save()
      .then(() => {
        res.json({ message: "signup success", status: 200 });
      })
      .catch((error) => {
        console.log(error);
        res.json({ message: "signup error", status: 500 });
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = { ...req.body };

    const user = await User.findOne({ email: email });

    if (!user) {
      res.json("User not found");
      return;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.json({ message: "Password not correct", status: false });
      return;
    }

    // create token
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    // store token
    res.cookie("jwt", token, { httpOnly: true, maxAge: 360000 });

    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
};
