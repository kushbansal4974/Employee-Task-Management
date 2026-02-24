import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { createTask, deleteTask, getAllTasks, getMyTasks, updateTaskStatus } from "../controllers/task.controller.js";

const router = express.Router();

router.post(
  "/create",
  isAuthenticated,
  authorizeRoles("admin"),
  createTask
);

router.get("/my", isAuthenticated, authorizeRoles("employee"), getMyTasks);
router.get("/all", isAuthenticated, authorizeRoles("admin"), getAllTasks);
router.patch(
    "/:id",
    isAuthenticated,
    authorizeRoles("employee"),
    updateTaskStatus
);
router.delete(
    "/:id",
    isAuthenticated,
    authorizeRoles("admin"),
    deleteTask
);

export default router;