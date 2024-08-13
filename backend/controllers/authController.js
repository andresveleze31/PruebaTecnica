import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Usuario o contraseña invalidos" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        profilePic: user.profilePic
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
        maxAge: 0
    })

    res.status(200).json({
        message: "Logout exitoso"
    })

  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: "Internal Server Error"})
  }
};

export const signup = async (req, res) => {
  try {
    const { name, username, password, confirmPassword, userType } = req.body;

    //CONTRASEÑAS IGUALES
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Las contraseñas no coinciden" });
    }

    //ENCONTRAR EL USUARIO
    const user = await User.findOne({ username });

    //VALIDAR SI YA EXISTE
    if (user) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    //HASHEO DE PASSWORD
    const salt = await bcryptjs.genSalt(10);
    const passwordHasheado = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      username,
      userType,
      password: passwordHasheado,
      profilePic: "https://avatar.iran.liara.run/username?username=" + username,
    });

    await newUser.save();

    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
