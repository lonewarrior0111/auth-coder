import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(500).send({
        success: false,
        message: `please provide all fields!`,
      });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(403).send({
        success: false,
        message: `user already existing!`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await user.save();

    user.password = undefined;
    return res.status(201).send({
      success: true,
      message: `sign up successfull!`,
      user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: `internal server error!`,
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: `user not found!`,
      });
    }

    const isPasswordMatching = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatching) {
      return res.status(404).send({
        success: false,
        message: `invalid credentials`,
      });
    }
    // console.log(existingUser);
    // TOKEN CREATION //
    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30s",
      }
    );

    res.cookie("token", token, {
      path: "/",
      expiresIn: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
      sameSite: "lax",
    });
    return res.status(200).send({
      success: true,
      message: `login successful!`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: `internal server error!`,
    });
  }
};

export const logoutUserController = async (req, res) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(404).json({ message: "No token found" });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(400).json({ message: "Invalid token" });
    }
    res.clearCookie(String(user.id));
    return res.status(200).json({ message: "Successfully logged out" });
  });
};
