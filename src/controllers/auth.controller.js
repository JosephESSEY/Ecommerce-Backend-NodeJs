const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createUser, findUserByEmail, getAllUsers, getUserProfile, updateUser, deleteUser, findUserById } = require("../models/user.model");

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

    const token = jwt.sign({ userId: user.id, userRole: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur Serveur" });
  }
};


const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error : error});
  }
};


const updateUserController = async (req, res) => {
  try {
    const existingUser = await findUserById(req.params.id);
    if(!existingUser) return res.status(404).json({ error: "User not found" });

    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updated = await updateUser(req.params.id, { email, password: hashedPassword });
    res.status(201).json({
      message: "User updated successfully",
      result: updated
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error : err });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const existingUser = await findUserById(req.params.id);
    if(!existingUser) return res.status(404).json({ error: "User not found"})

    await deleteUser(req.params.id);
    res.json({ message: "User delected successfuly" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error : err });
  }
};

const getProfileController = async (req, res) => {
  try {
    const user = await getUserProfile(req.user.userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error : err });
  }
};

module.exports = {
  register,
  login,
  getAllUsersController,
  getProfileController,
  updateUserController,
  deleteUserController
};
