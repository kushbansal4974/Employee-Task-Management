import express from "express";
import { register, login, getCurrentUser, logout, getAllUsers, getEmployees  } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getCurrentUser);
router.get("/logout", logout)
router.get("/all", isAuthenticated, authorizeRoles("admin"), getAllUsers);
router.get("/employees", isAuthenticated, authorizeRoles("admin"), getEmployees);

export default router