const userController = require("../models/registration");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  const { username, password } = req?.body;

  if (!username || !password)
    return res.status(400).json({ Alert: `Username or password not provided` });

  const userValidity = await userController.findOne({ username: username });
  if (!userValidity) {
    return res.status(404).json({ Alert: `${username} Invalid Username` });
  } else {
    const passwordValidity = bcrypt.compareSync(
      password,
      userValidity.password
    );
    if (!passwordValidity) {
      return res.status(403).json({ Alert: `Incorrect password` });
    } else {
      const accessToken = jwt.sign(
        {
          username: userValidity.username,
          password: userValidity.password,
        },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "30s",
        }
      );

      const refreshToken = jwt.sign(
        {
          username: userValidity.username,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: "1d" }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        Alert: `${username} logged in and your access Token is ${accessToken}`,
      });
    }
  }
};

module.exports = { Login };