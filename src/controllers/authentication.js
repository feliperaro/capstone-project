const { createUser, getUserByEmail } = require("../models/user");
const { authentication, random } = require("../helpers");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send(400).json({ error: "Email and password are required" });
    }

    const user = getUserByEmail(email);
    if (!user) {
      return res.send(400).json({ error: "User not found" });
    }

    const expectedPassword = authentication(user.authentication.salt, password);
    if (user.authentication.password !== expectedPassword) {
      return res.send(403).json({ error: "Incorrect password" });
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();
    res.cookie("EPILEF-AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    return res.send(400).json({ error: "Something went wrong" });
  }
};

const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !email) {
      return res
        .send(400)
        .json({ error: "Email, password and username are required" });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.send(400).json({ error: "User already exists" });
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.send(400).json({ error: error.message });
  }
};

module.exports = {
  login,
  register,
};
