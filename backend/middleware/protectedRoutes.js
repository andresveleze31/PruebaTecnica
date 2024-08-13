import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "No Autorizado" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "No Autorizado" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error en ruta protegida", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectedRoute