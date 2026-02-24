import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, deadline, assignedTo } = req.body;

    if (!title || !description || !deadline || !assignedTo) {
      return res.status(400).json({
        message: "All required fields must be provided",
        success: false,
      });
    }

    if (new Date(deadline) < new Date()) {
      return res.status(400).json({
        message: "Deadline must be a future date",
        success: false,
      });
    }

    const user = await User.findById(assignedTo);

    if (!user || user.role !== "employee") {
      return res.status(400).json({
        message: "Assigned user must be a valid employee",
        success: false,
      });
    }

    const task = await Task.create({
      title,
      description,
      priority: priority || "Medium",
      deadline,
      status: "Pending",
      assignedTo,
      createdBy: req.id,
    });

    return res.status(201).json({
      message: "Task created successfully",
      success: true,
      task,
    });

  } catch (error) {
    console.log("Create Task Error:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};


export const getMyTasks = async (req, res) => {
  try {
    const userId = req.id; 

    const tasks = await Task.find({ assignedTo: userId }).populate(
      "assignedTo",
      "name email role"
    );

    return res.status(200).json({
      success: true,
      tasks,
    });
    
  } catch (error) {
    console.log("Get My Tasks Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};


export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate("assignedTo", "name email role");

        return res.status(200).json({
          success: true,
          tasks,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};


export const updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.assignedTo.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to update this task" });
        }

        const allowedStatus = ["pending", "in-progress", "completed"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        task.status = status;
        await task.save();

        return res.status(200).json(task);

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};


export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await task.deleteOne();

        res.status(200).json({ message: "Task deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};