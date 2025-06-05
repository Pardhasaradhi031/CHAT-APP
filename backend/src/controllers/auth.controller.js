import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).send("All fields are required");
  }
  try {
    if (password.length < 6) {
      return res.status(400).send("Password must be at least 6 characters long");
    }

    const user = await User.findOne({email});

    if (user) return res.status(400).send("Email already exists");
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).send("User creation failed");
    }

  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("Internal server error");
  }
};

export const login = (req, res) => {
  // Handle user login logic here
  res.send("User logged in successfully");
};

export const logout = (req, res) => {
  // Handle user logout logic here
  res.send("User logged out successfully");
};
