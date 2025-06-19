module.exports = (req, res, next) => {
  if (req.user.userRole !== "admin") {
    return res.status(403).json({ message: "Accès réservé aux administrateurs"});
  }
  next();
};
