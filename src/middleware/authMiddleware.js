const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/dotenvConfig");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }

    req.user = decoded;

    next();
  });
};

const adminCheckMiddleware = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Permissão insuficiente" });
  }
  next();
};

module.exports = { authMiddleware, adminCheckMiddleware };
