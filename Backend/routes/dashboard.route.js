import express from "express";
import { adminDashboard, employeeDashboard } from "../controllers/dashboard.controller.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/admin", isAuthenticated, authorizeRoles("admin"), adminDashboard);

router.get("/employee", isAuthenticated, authorizeRoles("employee"), employeeDashboard);

export default router;