import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }


    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "employee",
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Register Error:", error);
    return res.status(500).json({
      message: "Internal Server error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,   // ✅ correct
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.log("Login Error:", error);
    return res.status(500).json({
      message: "Internal Server error",
      success: false,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.id
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.log("GetMe Error:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const logout = async(req, res) => {
    try {
        
        return res.status(200).cookie("token", "", {
            maxAge: 0
        }).json({
            message: "Logout successfully",
            success: true
        })

    } catch (e) {
        console.log("Error in logout: ",e)
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

export const getAllUsers = async (req, res) => {
  try {
    const role = req.role
    
    if(role !== "admin"){
        return res.status(403).json({
            message: "Not access",
            success: false
        })
    }
    
    const users = await User.find({ role: "employee" }).select("-password");
    
    return res.status(200).json({
      success: true,
      users,
    });


  } catch (error) {
    console.log("GetUsers Error:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};


export const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).select("_id name email");
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};