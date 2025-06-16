const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createUser, findUserByEmail } = require("../models/user.model");

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ error: "Email already in use" });

    const newUser = await createUser({ firstname, lastname, email, password, role });
    res.status(201).json({ 
        message : 'User SignIn With Success !',
        user: newUser
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) return res.status(400).json({ error: "Not Exist Email" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Incorrect password" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur Serveur" });
  }
};

module.exports = {
  register,
  login,
};
